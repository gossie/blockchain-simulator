import React, { useEffect, useState } from 'react';
import MinerModel from './model/miner-model';
import { Subscription } from 'rxjs';

interface MinerProps {
    miner: MinerModel;
}

const Miner: React.FC<MinerProps> = (props: MinerProps) => {
    const [message, setMessage] = useState('I am waiting!');
    const [proofOfWork, setProofOfWork] = useState('');
    useEffect(() => {
        const subscription: Subscription = props.miner.observeProofOfWorkSearch().subscribe((current: string) => setProofOfWork(current));
        return () => subscription.unsubscribe();
    });

    const startMining = () => {
        setMessage('I am mining!');
        props.miner.startMining();
    };

    const pauseMining = () => {
        setMessage('I am waiting!');
        props.miner.pauseMining();
    };

    return (
        <div>
            <h2 className="title">Miner</h2>
            <div>
                {message} {proofOfWork}
            </div>
            <div>
                <button className="button is-link" onClick={startMining}>Start</button>
                <button className="button is-link" onClick={pauseMining}>Pause</button>
            </div>
        </div>
    );
};

export default Miner;
