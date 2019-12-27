import React from 'react';
import { render } from '@testing-library/react';
import DoneTransaction from './DoneTransaction';
import TransactionModel from '../model/transaction-model';

test('that done transaction is displayed', () => {
    const { getByText } = render(<DoneTransaction transaction={new TransactionModel('a', 'b', 4)} />);
    const element = getByText(/Transfered 4 from a to b./i);
    expect(element).toBeInTheDocument();
});
