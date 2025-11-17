import express from "express";
import bodyParser from "body-parser";

import { onboardCompany, mintToken } from "./controllers/companyController";
import { createPool, buyTokens, sellTokens, getPools } from "./controllers/poolController";
import { getUserBalances, createOffer } from "./controllers/userController";
import { connectXRPL, disconnectXRPL } from "./services/xrplService";

const app = express();
app.use(bodyParser.json());

// ----------------------
// Company routes
// ----------------------
app.post("/company/onboard", onboardCompany);
app.post("/company/mintToken", mintToken);

// ----------------------
// Pool routes
// ----------------------
app.post("/pool/create", createPool);
app.get("/pool/list", getPools);
app.post("/pool/buy", buyTokens);
app.post("/pool/sell", sellTokens);

// ----------------------
// User routes
// ----------------------
app.get("/user/:address/balances", getUserBalances);
app.post("/user/create-offer", createOffer);

const PORT = 4000;

// Connect to XRPL before starting server
connectXRPL()
  .then(() => {
    console.log("Connected to XRPL");
    app.listen(PORT, () => console.log(`XRPL backend running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to XRPL:", error);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectXRPL();
  process.exit(0);
});
