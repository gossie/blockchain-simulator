import React from 'react';
import BlockchainModel from './model/blockchain';

interface BlockchainProps {
    blockchain: BlockchainModel;
}

const Blockchain: React.FC<BlockchainProps> = (blockchain: BlockchainProps) => {
    return (
        <div>
            Blockchain
        </div>
    );
};

export default Blockchain;