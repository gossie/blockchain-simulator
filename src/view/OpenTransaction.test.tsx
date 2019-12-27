import React from 'react';
import { render } from '@testing-library/react';
import OpenTransaction from './OpenTransaction';
import TransactionModel from '../model/transaction-model';

test('that open transaction is displayed', () => {
    const { getByText } = render(<OpenTransaction transaction={new TransactionModel('a', 'b', 4)} />);
    const element = getByText(/Transfer 4 from a to b./i);
    expect(element).toBeInTheDocument();
});
