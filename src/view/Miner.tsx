import React, { useEffect, useState } from 'react';
import { Subscription } from 'rxjs';
import MinerModel from '../model/miner-model';
import './Miner.css';
import { MinerEvent, EventType } from '../model/miner-event';

interface MinerProps {
    index: number;
    miner: MinerModel;
}

const Miner: React.FC<MinerProps> = (props: MinerProps) => {
    const [message, setMessage] = useState('I am waiting!');
    const [proofOfWork, setProofOfWork] = useState('');
    const [mining, setMining] = useState(false);
    const [minedBlocks, setMinedBlocks] = useState(props.miner.minedBlocks);
    const [rejectedBlocks, setRejectedBlocks] = useState(props.miner.rejectedBlocks);
    const [cssClass, setCssClass] = useState('has-text-black');
    useEffect(() => {
        const subscription: Subscription = props.miner.observeProofOfWorkSearch().subscribe((current: MinerEvent) => {
            switch (current.eventType) {
                case EventType.CheckingBlock:
                    setProofOfWork(`Currently checking ${current.payload}`);
                    setCssClass('has-text-black');
                    break;
                case EventType.BlockCreated:
                    setProofOfWork(`Wohoo! It worked. I am creating a new block.`);
                    setCssClass('has-text-success');
                    setMinedBlocks((old: number) => old + 1);
                    break;
                case EventType.BlockRejected:
                    setProofOfWork(`Block was not added. Proof of work does not fullfill constraint.`);
                    setCssClass('has-text-danger');
                    setRejectedBlocks((old: number) => old + 1);
                    break;
            }
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
            <h2 className="title">Miner {props.index}</h2>
            <div>
                {message}
            </div>
            <div className={cssClass}>
                {proofOfWork}
            </div>
            <div className="mined">
                Successfully mined {minedBlocks} blocks.
            </div>
            <div className="rejected">
                {rejectedBlocks} blocks were rejected.
            </div>
            <div>
                <button className={"button is-link " + (mining ? 'is-loading' : '')} onClick={startMining}>Start</button>
                <button className="button is-link" onClick={pauseMining}>Pause</button>
            </div>
        </div>
    );
};

export default Miner;
