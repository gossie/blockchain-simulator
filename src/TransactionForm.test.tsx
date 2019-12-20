import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import TransactionModel from './model/transaction-model';
import BlockchainModel from './model/blockchain-model';

test('that transactions are added', () => {
    const blockchain = new BlockchainModel();

    const { getByTestId } = render(<TransactionForm blockchain={blockchain} />);

    const amount: HTMLInputElement = (getByTestId('amount') as HTMLInputElement);
    fireEvent.change(amount, { target: { value: '3' } });

    const from: HTMLInputElement = (getByTestId('from') as HTMLInputElement);
    fireEvent.change(from, { target: { value: 'a' } });

    const to: HTMLInputElement = (getByTestId('to') as HTMLInputElement);
    fireEvent.change(to, { target: { value: 'b' } });
    
    const add: HTMLButtonElement = (getByTestId('add') as HTMLButtonElement);
    fireEvent.click(add);

    expect(blockchain.openTransactions).toEqual([
        new TransactionModel('a', 'b', 3)
    ]);
});

test('that amount is greater or equal to 1', () => {
    const blockchain = new BlockchainModel();

    const { getByTestId } = render(<TransactionForm blockchain={blockchain} />);
    const amount: HTMLInputElement = (getByTestId('amount') as HTMLInputElement);
    fireEvent.change(amount, { target: { value: '' } });

    expect(amount.value).toBe('1');
});

test('that transactions are listed', () => {
    const blockchain = new BlockchainModel();
    blockchain.addOpenTransaction(new TransactionModel('a', 'b', 3));
    blockchain.addOpenTransaction(new TransactionModel('c', 'b', 5));

    const {} = render(<TransactionForm blockchain={blockchain} />);
});

