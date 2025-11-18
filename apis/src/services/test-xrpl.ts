// test-xrpl.ts
// Place this file in: apis/src/services/ (same folder as xrplNew.ts)

import {
  getClient,
  createXRPLAccount,
  loginWithSeed,
  createTrustline,
  issueFungibleToken,
  createBuyOffer,
  createSellOffer
} from './xrplNew';

// Color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message: string, color: string = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message: string) {
  log(`✓ ${message}`, colors.green);
}

function logError(message: string) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message: string) {
  log(`ℹ ${message}`, colors.blue);
}

// Add delay between tests to avoid rate limits
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ---------------------------------------------
// TEST 1: Create Account
// ---------------------------------------------
async function testCreateAccount() {
  logInfo('\n=== Test 1: Create Account ===');
  try {
    const account = await createXRPLAccount();
    
    if (!account.address || !account.seed) {
      throw new Error('Account missing address or seed');
    }
    
    if (!account.address.startsWith('r')) {
      throw new Error('Invalid address format');
    }
    
    if (!account.seed.startsWith('s')) {
      throw new Error('Invalid seed format');
    }
    
    logSuccess('Account created successfully');
    logInfo(`Address: ${account.address}`);
    logInfo(`Seed: ${account.seed}`);
    
    return account;
  } catch (error) {
    logError(`Create account failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// TEST 2: Login with Seed
// ---------------------------------------------
async function testLoginWithSeed(seed: string) {
  logInfo('\n=== Test 2: Login with Seed ===');
  try {
    const wallet = loginWithSeed(seed);
    
    if (!wallet.address) {
      throw new Error('Login failed - no address returned');
    }
    
    logSuccess('Login successful');
    logInfo(`Logged in as: ${wallet.address}`);
    
    return wallet;
  } catch (error) {
    logError(`Login failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// TEST 3: Get Account Balances
// ---------------------------------------------
async function testGetBalances(address: string) {
  logInfo('\n=== Test 3: Get Account Balances ===');
  try {
    const client = await getClient();
    
    const [accountInfo, accountLines] = await Promise.all([
      client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated'
      }),
      client.request({
        command: 'account_lines',
        account: address,
        ledger_index: 'validated'
      })
    ]);

    const balances = {
      xrpBalance: accountInfo.result.account_data.Balance,
      tokens: accountLines.result.lines
    };
    
    logSuccess('Balances retrieved successfully');
    logInfo(`XRP Balance: ${parseInt(balances.xrpBalance) / 1000000} XRP`);
    logInfo(`Token Count: ${balances.tokens?.length || 0}`);
    
    if (balances.tokens && balances.tokens.length > 0) {
      balances.tokens.forEach((token: any) => {
        logInfo(`  - ${token.balance} ${token.currency} (Issuer: ${token.account})`);
      });
    }
    
    return balances;
  } catch (error) {
    logError(`Get balances failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// TEST 4: Issue Fungible Token
// ---------------------------------------------
async function testIssueFungibleToken(issuerSeed: string, holderSeed: string) {
  logInfo('\n=== Test 4: Issue Fungible Token ===');
  try {
    const currencyCode = 'TST'; // Test token
    const amount = '1000';
    
    logInfo(`Issuing ${amount} ${currencyCode} tokens...`);
    
    const issuerWallet = loginWithSeed(issuerSeed);
    const holderWallet = loginWithSeed(holderSeed);
    
    // First create trustline
    logInfo('Creating trustline...');
    await createTrustline(holderWallet, issuerWallet.address, currencyCode, amount);
    
    // Then issue tokens
    logInfo('Issuing tokens...');
    const result = await issueFungibleToken(
      issuerWallet,
      holderWallet.address,
      currencyCode,
      amount
    );
    
    logSuccess('Token issued successfully');
    logInfo(`Currency: ${currencyCode}`);
    logInfo(`Issuer: ${issuerWallet.address}`);
    logInfo(`Holder: ${holderWallet.address}`);
    logInfo(`Amount: ${amount}`);
    
    return {
      result,
      token: {
        currency: currencyCode,
        issuer: issuerWallet.address,
        holder: holderWallet.address,
        amount
      }
    };
  } catch (error) {
    logError(`Issue token failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// TEST 5: Create Buy Offer
// ---------------------------------------------
async function testCreateBuyOffer(
  buyerSeed: string,
  tokenCurrency: string,
  tokenIssuer: string
) {
  logInfo('\n=== Test 5: Create Buy Offer ===');
  try {
    const tokenAmount = '100';
    const xrpAmount = '10';
    
    logInfo(`Creating buy offer: ${tokenAmount} ${tokenCurrency} for ${xrpAmount} XRP...`);
    
    const buyerWallet = loginWithSeed(buyerSeed);
    
    // First create trustline
    logInfo('Creating trustline for buyer...');
    await createTrustline(buyerWallet, tokenIssuer, tokenCurrency, tokenAmount);
    
    // Then create buy offer
    const result = await createBuyOffer(
      buyerWallet,
      tokenCurrency,
      tokenIssuer,
      tokenAmount,
      xrpAmount
    );
    
    logSuccess('Buy offer created successfully');
    logInfo(`Buyer: ${buyerWallet.address}`);
    logInfo(`Wants: ${tokenAmount} ${tokenCurrency}`);
    logInfo(`Offering: ${xrpAmount} XRP`);
    
    return result;
  } catch (error) {
    logError(`Create buy offer failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// TEST 6: Create Sell Offer
// ---------------------------------------------
async function testCreateSellOffer(
  sellerSeed: string,
  tokenCurrency: string,
  tokenIssuer: string
) {
  logInfo('\n=== Test 6: Create Sell Offer ===');
  try {
    const tokenAmount = '50';
    const xrpAmount = '5';
    
    logInfo(`Creating sell offer: ${tokenAmount} ${tokenCurrency} for ${xrpAmount} XRP...`);
    
    const sellerWallet = loginWithSeed(sellerSeed);
    
    const result = await createSellOffer(
      sellerWallet,
      tokenCurrency,
      tokenIssuer,
      tokenAmount,
      xrpAmount
    );
    
    logSuccess('Sell offer created successfully');
    logInfo(`Seller: ${sellerWallet.address}`);
    logInfo(`Selling: ${tokenAmount} ${tokenCurrency}`);
    logInfo(`For: ${xrpAmount} XRP`);
    
    return result;
  } catch (error) {
    logError(`Create sell offer failed: ${error}`);
    throw error;
  }
}

// ---------------------------------------------
// QUICK TEST (Just account creation and login)
// ---------------------------------------------
async function runQuickTest() {
  logInfo('⚡ Running Quick Test...\n');
  
  try {
    const account = await testCreateAccount();
    await delay(1000);
    
    await testLoginWithSeed(account.seed!);
    await delay(1000);
    
    await testGetBalances(account.address);
    
    logSuccess('\n✅ Quick test passed!');
  } catch (error) {
    logError(`\n❌ Quick test failed: ${error}`);
    process.exit(1);
  }
}

// ---------------------------------------------
// FULL TEST (All operations)
// ---------------------------------------------
async function runFullTest() {
  logInfo('🚀 Starting Full XRPL Test Suite...\n');
  
  let issuerAccount: any;
  let holderAccount: any;
  let buyerAccount: any;
  let tokenResult: any;
  
  try {
    // Test 1: Create issuer account
    issuerAccount = await testCreateAccount();
    await delay(2000);
    
    // Test 2: Login with seed
    await testLoginWithSeed(issuerAccount.seed);
    await delay(2000);
    
    // Test 3: Get balances
    await testGetBalances(issuerAccount.address);
    await delay(2000);
    
    // Create additional accounts
    logInfo('\n=== Creating additional test accounts ===');
    holderAccount = await createXRPLAccount();
    logSuccess(`Holder account: ${holderAccount.address}`);
    await delay(2000);
    
    buyerAccount = await createXRPLAccount();
    logSuccess(`Buyer account: ${buyerAccount.address}`);
    await delay(2000);
    
    // Test 4: Issue token
    tokenResult = await testIssueFungibleToken(
      issuerAccount.seed,
      holderAccount.seed
    );
    await delay(2000);
    
    // Verify token balance
    logInfo('\n=== Verifying token issuance ===');
    await testGetBalances(holderAccount.address);
    await delay(2000);
    
    // Test 5: Create buy offer
    await testCreateBuyOffer(
      buyerAccount.seed,
      tokenResult.token.currency,
      tokenResult.token.issuer
    );
    await delay(2000);
    
    // Test 6: Create sell offer
    await testCreateSellOffer(
      holderAccount.seed,
      tokenResult.token.currency,
      tokenResult.token.issuer
    );
    await delay(2000);
    
    // Final balance checks
    logInfo('\n=== Final Balance Check ===');
    await testGetBalances(issuerAccount.address);
    await testGetBalances(holderAccount.address);
    await testGetBalances(buyerAccount.address);
    
    logSuccess('\n✅ All tests completed successfully!');
    
    // Summary
    logInfo('\n=== Test Summary ===');
    logInfo(`Issuer: ${issuerAccount.address}`);
    logInfo(`Holder: ${holderAccount.address}`);
    logInfo(`Buyer: ${buyerAccount.address}`);
    logInfo(`Token: ${tokenResult.token.currency}`);
    
  } catch (error) {
    logError(`\n❌ Test suite failed: ${error}`);
    process.exit(1);
  }
}

// ---------------------------------------------
// MAIN
// ---------------------------------------------
const testMode = process.argv[2] || 'quick';

if (testMode === 'full') {
  runFullTest().catch(console.error);
} else {
  runQuickTest().catch(console.error);
}

export {
  testCreateAccount,
  testLoginWithSeed,
  testGetBalances,
  testIssueFungibleToken,
  testCreateBuyOffer,
  testCreateSellOffer,
  runQuickTest,
  runFullTest
};