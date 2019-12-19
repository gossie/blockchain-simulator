import React from 'react';
import MinerModel from './model/miner-model';

interface MinerProps {
    miner: MinerModel
}

const miner: React.FC<MinerProps> = (props: MinerProps) => {
    return (
        <span>
            Miner
        </span>
    );
};

export default miner;
