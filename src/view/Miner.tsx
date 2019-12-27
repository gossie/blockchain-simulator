import React, { useEffect, useState } from 'react';
import MinerModel from '../model/miner-model';
import { Subscription } from 'rxjs';
import './Miner.css';

interface MinerProps {
    miner: MinerModel;
}

const Miner: React.FC<MinerProps> = (props: MinerProps) => {
    const [message, setMessage] = useState('I am waiting!');
    const [proofOfWork, setProofOfWork] = useState('');
    const [mining, setMining] = useState(false);
    const [amount, setAmount] = useState(props.miner.amount);
    useEffect(() => {
        const subscription: Subscription = props.miner.observeProofOfWorkSearch().subscribe((current: string) => {
            setProofOfWork(current);
            setAmount(props.miner.amount);
        });
        return () => subscription.unsubscribe();
    });

    const startMining = () => {
        setMining(true);
        setMessage('I am mining!');
        props.miner.startMining();
    };

    const pauseMining = () => {
        setMining(false);
        setMessage('I am waiting!');
        props.miner.pauseMining();
    };

    return (
        <div className="miner">
            <h2 className="title">Miner</h2>
            <div>
                {message} {proofOfWork}
            </div>
            <div>
                Mined {amount} blocks.
            </div>
            <div>
                <button className={"button is-link " + (mining ? 'is-loading' : '')} onClick={startMining}>Start</button>
                <button className="button is-link" onClick={pauseMining}>Pause</button>
            </div>
        </div>
    );
};

export default Miner;
