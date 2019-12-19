import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import TransactionModel from './model/transaction-model';

test('that transactions are added', (done) => {
    const addCallback = (from: string, to: string, amount: number) => {
        expect(from).toEqual('a');
        expect(to).toEqual('b');
        expect(amount).toEqual(3);
        done();
    }

    const { getByTestId } = render(<TransactionForm transactions={[]} addTransactionCallback={addCallback} />);

    const amount: HTMLInputElement = (getByTestId('amount') as HTMLInputElement);
    fireEvent.change(amount, { target: { value: '3' } });

    const from: HTMLInputElement = (getByTestId('from') as HTMLInputElement);
    fireEvent.change(from, { target: { value: 'a' } });

    const to: HTMLInputElement = (getByTestId('to') as HTMLInputElement);
    fireEvent.change(to, { target: { value: 'b' } });
    
    const add: HTMLButtonElement = (getByTestId('add') as HTMLButtonElement);
    fireEvent.click(add);
});

test('that transactions are listed', () => {
    const transactions: Array<TransactionModel> = [
        new TransactionModel('a', 'b', 3),
        new TransactionModel('c', 'b', 5)
    ];

    const {} = render(<TransactionForm transactions={transactions} addTransactionCallback={() => {}} />);
});

