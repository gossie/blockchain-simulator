import React from 'react';
import TransactionModel from '../model/transaction-model';

interface TransactionProps {
    transaction: TransactionModel;
}

const OpenTransaction: React.FC<TransactionProps> = (props: TransactionProps) => {
    return(
        <div>
            Transfer {props.transaction.amount} from {props.transaction.from} to {props.transaction.to}.
        </div>
    );
}

export default OpenTransaction;
