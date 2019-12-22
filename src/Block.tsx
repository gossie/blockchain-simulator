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
        .map((s: string) => <li>{s}</li>);
    return (
        <div className="block box">
            { transactions.length > 0 && <div><b>Transactions:</b> <ul>{transactions}</ul></div> }
            { props.block.previousHash.length > 0 && <div><b>Previous hash:</b> {props.block.previousHash}</div> }
            <b>Hash:</b> {props.block.hash}<br />
            <b>Proof of work:</b> {props.block.proofOfWork}
        </div>
    );
};

export default Block;