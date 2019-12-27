import React, { useState, ChangeEvent, useEffect } from 'react';
import OpenTransaction from './OpenTransaction';
import BlockchainModel from '../model/blockchain-model';
import TransactionModel from '../model/transaction-model';
import { Subscription } from 'rxjs';

import './TransactionForm.css'

const participants = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

interface TransactionFormProps {
    blockchain: BlockchainModel
}

const TransactionForm: React.FC<TransactionFormProps> = (props: TransactionFormProps) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(1);
    const [openTransactions, setOpenTransactions] = useState([...props.blockchain.openTransactions]);

    const randomTransactions = () => {
        for (let i=0; i<15; i++) {
            const from = participants[Math.round(Math.random() * 25)];
            const to = participants[Math.round(Math.random() * 25)];
            const newTransaction = new TransactionModel(from, to, Math.round(Math.random() * 12) + 1);
            props.blockchain.addOpenTransaction(newTransaction);
            setOpenTransactions(t => [...t, newTransaction]);
        }
    }

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
        const subscription: Subscription = props.blockchain.observeNewBlock().subscribe(() => setOpenTransactions([...props.blockchain.openTransactions]));
        return () => subscription.unsubscribe();
    }, [props.blockchain]);

    const transactions = openTransactions
        .map((transaction: TransactionModel, index: number) => <OpenTransaction key={index} transaction={transaction} />);

    return (
        <div>
            <div>
                <h2 className="title">Open transactions</h2>
                <div className="row">
                    <button className="button is-link" onClick={randomTransactions}>Create 15 random transactions</button>
                </div>
                <div className="transaction-form row">
                    Transfer <input data-testid="amount" className="input" type="text" value={amount} onChange={onAmountChange} /> 
                    from <input data-testid="from" className="input" type="text" value={from} onChange={event => setFrom(event.target.value)} /> 
                    to <input data-testid="to" className="input" type="text" value={to} onChange={event => setTo(event.target.value)} />
                    <button data-testid="add" className="button is-link" onClick={addTransaction}>Add</button>
                </div>
            </div>
            <div className="row">
                Currently there are {transactions.length} open transactions.
            </div>
            <div className="row">
                {transactions}
            </div>
        </div>
    );
};

export default TransactionForm