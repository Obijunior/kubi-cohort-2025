"use client";

import React from 'react';

interface WalletConnectorProps {
    onClick: () => void;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="px-5 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:opacity-90 transition shadow-sm">
            Connect Wallet
        </button>
    );
};

export default WalletConnector;