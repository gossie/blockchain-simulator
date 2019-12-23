import React, { useEffect } from 'react';
import './App.css';
import Miner from './Miner';
import TransactionForm from './TransactionForm';
import Blockchain from './Blockchain';
import BlockchainModel from './model/blockchain-model';
import MinerModel from './model/miner-model';

const App: React.FC = () => {
    
    const blockchain: BlockchainModel = new BlockchainModel();
    const miner: MinerModel = new MinerModel(blockchain);

    useEffect(() => {
        return () => miner.tearDown();
    });
    
    return (
        <div className="tile is-ancestor">
            <div className="tile is-vertical">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <p>
                            After reading Daniel van Flymen's article on <a href="https://hackernoon.com/learn-blockchains-by-building-one-117428612f46" target="_blank" rel="noopener noreferrer">learning blockchains by building one</a>, I wrote this blockchain simulator. It consists of only one miner that tries to find find blocks. The miner is trying to find a prrof of work that fulfills this constraint:<br />
                            <code>hash(proofOfWorkToCheck + lastProofOfWork + lastHash).startsWith('00')</code>
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
