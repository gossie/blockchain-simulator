import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

test('that 3 is the default value for the number of miners', () => {
    const { getByTestId } = render(<App />);
    const numberOfMiners: HTMLInputElement = (getByTestId('numberOfMiners') as HTMLInputElement);
    expect(numberOfMiners.value).toBe('3');
});

test('that empty is not valid for the number of miners', () => {
    const { getByTestId } = render(<App />);

    const numberOfMiners: HTMLInputElement = (getByTestId('numberOfMiners') as HTMLInputElement);
    fireEvent.change(numberOfMiners, { target: { value: '' } });

    expect(numberOfMiners.value).toBe('1');
});

test('that one is the minimal value for the number of miners', () => {
    const { getByTestId } = render(<App />);

    const numberOfMiners: HTMLInputElement = (getByTestId('numberOfMiners') as HTMLInputElement);
    fireEvent.change(numberOfMiners, { target: { value: '0' } });

    expect(numberOfMiners.value).toBe('1');
});

// test('renders learn react link', () => {
//     const { getByText } = render(<App />);
//     const linkElement = getByText(/learn react/i);
//     expect(linkElement).toBeInTheDocument();
// });
