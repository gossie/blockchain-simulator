import React, { useEffect, useState } from 'react';
import Block from './Block';
import BlockchainModel from './model/blockchain-model';
import BlockModel from './model/block-model';
import { Subscription } from 'rxjs';

interface BlockchainProps {
    blockchain: BlockchainModel;
}

const Blockchain: React.FC<BlockchainProps> = (props: BlockchainProps) => {

    const [blocks, setBlocks] = useState(props.blockchain.blocks.map((block: BlockModel, index: number) => <Block key={index} block={block} />));
    useEffect(() => {
        const subscription: Subscription = props.blockchain.observeNewBlock().subscribe(() => {
            setBlocks(props.blockchain.blocks.map((block: BlockModel, index: number) => <Block key={index} block={block} />));
        });
        return () => subscription.unsubscribe();
    }, [props.blockchain]);

    
    return (
        <div>
            {blocks}
        </div>
    );
};

export default Blockchain;