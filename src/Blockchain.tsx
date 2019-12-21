import React, { useEffect, useState } from 'react';
import Block from './Block';
import BlockchainModel from './model/blockchain-model';
import BlockModel from './model/block-model';
import { Subscription } from 'rxjs';
import './Blockchain.css';

interface BlockchainProps {
    blockchain: BlockchainModel;
}

const Blockchain: React.FC<BlockchainProps> = (props: BlockchainProps) => {

    const mapBlocks = (b: Array<BlockModel>) => b.map((block: BlockModel, index: number) => <Block key={index} block={block} />).reverse();

    const [blocks, setBlocks] = useState(mapBlocks(props.blockchain.blocks));

    useEffect(() => {
        const subscription: Subscription = props.blockchain.observeNewBlock().subscribe(() => setBlocks(mapBlocks(props.blockchain.blocks)));
        return () => subscription.unsubscribe();
    }, [props.blockchain]);

    
    return (
        <div className="blockchain">
            {blocks}
        </div>
    );
};

export default Blockchain;