import React from 'react';
import './Block.css';
import BlockModel from './model/block-model';
import TransactionModel from './model/transaction-model';


interface BlockProps {
    block: BlockModel;
}

const Block: React.FC<BlockProps> = (props: BlockProps) => {
    const transactions = props.block.transactions
        .map((transaction: TransactionModel) => `${transaction.amount} from ${transaction.from} to ${transaction.to}`)
        .join(', ');
    return (
        <div className="block">
            Transactions: {transactions}<br />
            Previous hash: {props.block.previousHash}<br />
            Hash: {props.block.hash}<br />
            Proof of work: {props.block.proofOfWork}
        </div>
    );
};

export default Block;