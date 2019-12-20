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
        <div className="tile is-ancestor">
            <div className="tile is-vertical">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <TransactionForm blockchain={blockchain} />
                    </div>
                    <div className="tile is-child box">
                        <Miner miner={miner} />
                    </div>
                </div>
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        
                    </div>
                    <div className="tile is-child box">
                        <Blockchain blockchain={blockchain} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
