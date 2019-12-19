import React, { useState } from 'react';
import TransactionModel from './model/transaction-model';
import OpenTransaction from './OpenTransaction';

interface TransactionFormProps {
    transactions: Array<TransactionModel>
    addTransactionCallback: (from: string, to: string, amount: number ) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = (props: TransactionFormProps) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);

    const addTransaction = () => {
        props.addTransactionCallback(from, to, amount);
    }

    const openTransactions = props.transactions
        .map((transaction: TransactionModel, index: number) => <OpenTransaction key={index} transaction={transaction} />);

    return (
        <div>
            <div>
                <h2>New transaction</h2>
                Transfer <input data-testid="amount" value={amount} onChange={event => setAmount(parseInt(event.target.value))} /> 
                from <input data-testid="from" value={from} onChange={event => setFrom(event.target.value)} /> 
                to <input data-testid="to" value={to} onChange={event => setTo(event.target.value)} />
                <button data-testid="add" onClick={addTransaction}>Add</button>
            </div>
            {openTransactions}
        </div>
    );
};

export default TransactionForm