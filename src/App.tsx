import React, { useState, useEffect } from 'react';
import './App.css';
import Miner from './Miner';
import TransactionForm from './TransactionForm';
import Blockchain from './Blockchain';
import BlockchainModel from './model/blockchain-model';
import MinerModel from './model/miner-model';

const App: React.FC = () => {
    
    const [blockchain, setBlockchain] = useState(new BlockchainModel());
    const [miner, setMiner] = useState(new MinerModel(blockchain));

    useEffect(() => {
        return () => miner.tearDown();
    });
    
    return (
        <div className="tile is-ancestor">
            <div className="tile is-vertical">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <p>
                            This is a simple blockchain simulator. It consists only of one miner that tries to find find blocks.
                        </p>
                    </div>
                </div>
                <div className="tile">
                    <div className="tile is-parent">
                        <div className="tile is-child box">
                            <TransactionForm blockchain={blockchain} />
                        </div>
                    </div>
                    <div className="tile is-parent is-vertical">
                        <div className="tile is-child box">
                            <Miner miner={miner} />
                        </div>
                        <div className="tile is-child box">
                            <Blockchain blockchain={blockchain} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
