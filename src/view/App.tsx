import React, { useEffect } from 'react';
import './App.css';
import Miner from './Miner';
import TransactionForm from './TransactionForm';
import Blockchain from './Blockchain';
import BlockchainModel from '../model/blockchain-model';
import MinerModel from '../model/miner-model';

const App: React.FC = () => {
    
    const blockchain: BlockchainModel = new BlockchainModel();
    const miner1: MinerModel = new MinerModel(blockchain);
    const miner2: MinerModel = new MinerModel(blockchain);
    const miner3: MinerModel = new MinerModel(blockchain);

    useEffect(() => {
        return () => {
            miner1.tearDown();
            miner2.tearDown();
            miner3.tearDown();
        };
    });
    
    return (
        <div className="tile is-ancestor">
            <div className="tile is-vertical">
                <div className="tile is-parent">
                    <div className="tile is-child box">
                        <p>
                            After reading Daniel van Flymen's article on <a href="https://hackernoon.com/learn-blockchains-by-building-one-117428612f46" target="_blank" rel="noopener noreferrer">learning blockchains by building one</a>, I wrote this blockchain simulator. It currently consists of three miners that try to find blocks. Each miner is trying to find a prrof of work that fulfills this constraint:<br />
                            <code>hash(proofOfWorkToCheck + lastProofOfWork + lastHash).startsWith('00')</code>
                        </p>
                        <p>
                            Once a miner found a valid proof of work a block is created. It takes five seconds until the new block is replicated to all miners. This way sometimes blocks are mined, that are rejected by the blockchain.
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
                        <div className="tile is-parent box">
                            <div className="tile is-child">
                                <Miner miner={miner1} index={1} />
                            </div>
                            <div className="tile is-child">
                                <Miner miner={miner2} index={2} />
                            </div>
                            <div className="tile is-child">
                                <Miner miner={miner3} index={3} />
                            </div>
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
