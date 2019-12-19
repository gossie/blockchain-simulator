import React, { useState, ChangeEvent } from 'react';
import './App.css';
import Miner from './Miner';
import MinerModel from './model/miner-model';

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

    const miners = [];
    for (let i=0; i<numberOfMiners; i++) {
        miners.push(<Miner key={i} miner={new MinerModel()} />);
    }

    return (
        <div className="App">
            <div>
                <label>Anzahl der Miner</label>
                <input data-testid="numberOfMiners" value={numberOfMiners} onChange={onNumberOfMinersChange} />
            </div>
            <div>
                {miners}
            </div>
        </div>
    );
}

export default App;
