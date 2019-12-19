import React, { useState, ChangeEvent, useEffect } from 'react';
import OpenTransaction from './OpenTransaction';
import BlockchainModel from './model/blockchain-model';
import TransactionModel from './model/transaction-model';
import { Subscription } from 'rxjs';

interface TransactionFormProps {
    blockchain: BlockchainModel
}

const TransactionForm: React.FC<TransactionFormProps> = (props: TransactionFormProps) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(1);
    const [openTransactions, setOpenTransactions] = useState([]);

    const onAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(event.target.value);
        if (value) {
            setAmount(value);
        } else {
            setAmount(1);
        }
    }

    const addTransaction = () => {
        const newTransaction = new TransactionModel(from, to, amount);
        props.blockchain.addOpenTransaction(newTransaction);
        setOpenTransactions(t => [...t, newTransaction]);
    };

    useEffect(() => {
        const subscription: Subscription = props.blockchain.observeNewBlock().subscribe(() => setOpenTransactions([]));
        return () => subscription.unsubscribe();
    }, [props.blockchain]);

    const transactions = openTransactions
        .map((transaction: TransactionModel, index: number) => <OpenTransaction key={index} transaction={transaction} />);

    return (
        <div>
            <div>
                <h2>New transaction</h2>
                Transfer <input data-testid="amount" value={amount} onChange={onAmountChange} /> 
                from <input data-testid="from" value={from} onChange={event => setFrom(event.target.value)} /> 
                to <input data-testid="to" value={to} onChange={event => setTo(event.target.value)} />
                <button data-testid="add" onClick={addTransaction}>Add</button>
            </div>
            {transactions}
        </div>
    );
};

export default TransactionForm