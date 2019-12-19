import React, { useState, ChangeEvent } from 'react';
import './App.css';

const App: React.FC = () => {
    const [numberOfMiners, setNumberOfMiners] = useState(3);
    const onNumberOfMinersChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(event.target.value);
        if (value) {
            setNumberOfMiners(value);
        } else {
            setNumberOfMiners(1);
        }
    }

    return (
        <div className="App">
            <div>
                <label>Anzahl der Miner</label>
                <input data-testid="numberOfMiners" value={numberOfMiners} onChange={onNumberOfMinersChange} />
            </div>
        </div>
    );
}

export default App;
