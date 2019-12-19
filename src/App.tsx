import React from 'react';
import './App.css';
import Miner from './Miner';
import TransactionForm from './TransactionForm';
import Blockchain from './Blockchain';
import BlockchainModel from './model/blockchain-model';
import MinerModel from './model/miner-model';

const App: React.FC = () => {
    
    const blockchain: BlockchainModel = new BlockchainModel();
    const miner: MinerModel = new MinerModel(blockchain);    
    
    return (
        <div className="App">
            <div>
                <TransactionForm blockchain={blockchain} />
            </div>
            <div>
                <Miner miner={miner} />
            </div>
            <div>
                <Blockchain blockchain={blockchain} />
            </div>
        </div>
    );
}

export default App;
