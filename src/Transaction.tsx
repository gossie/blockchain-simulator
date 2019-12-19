import React from 'react';
import TransactionModel from './model/transaction-model';

interface TransactionProps {
    transaction: TransactionModel;
}

const Transaction: React.FC<TransactionProps> = (props: TransactionProps) => {
    return(
        <div>
            Transfered {props.transaction.amount} from {props.transaction.from} to {props.transaction.to}.
        </div>
    );
}

export default Transaction;
