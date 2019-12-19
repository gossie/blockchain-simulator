import React, { useEffect, useState } from 'react';
import MinerModel from './model/miner-model';
import { Subscription } from 'rxjs';

interface MinerProps {
    miner: MinerModel;
}

const Miner: React.FC<MinerProps> = (props: MinerProps) => {
    const [proofOfWork, setProofOfWork] = useState('');
    useEffect(() => {
        const subscription: Subscription = props.miner.observeProofOfWorkSearch().subscribe((current: string) => setProofOfWork(current));
        return () => subscription.unsubscribe();
    });

    return (
        <span>
            I am mining! {proofOfWork}
        </span>
    );
};

export default Miner;
