import React from 'react';
import './Block.css';
import BlockModel from './model/block-model';
import TransactionModel from './model/transaction-model';


interface BlockProps {
    block: BlockModel;
}

const Block: React.FC<BlockProps> = (props: BlockProps) => {
    const transactions = props.block.transactions
        .map((transaction: TransactionModel) => `Transfered ${transaction.amount} from ${transaction.from} to ${transaction.to}`)
        .join(', ');
    return (
        <div className="block box">
            <b>Transactions:</b> {transactions}<br />
            <b>Previous hash:</b> {props.block.previousHash}<br />
            <b>Hash:</b> {props.block.hash}<br />
            <b>Proof of work:</b> {props.block.proofOfWork}
        </div>
    );
};

export default Block;