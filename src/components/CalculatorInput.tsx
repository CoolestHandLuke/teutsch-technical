import { useContext } from 'react';
import CalculatorContext from '../context/CalculatorContext';

const CalculatorInput = () => {
    const { currentInput, handleChange, handleKeyEvent } =
        useContext(CalculatorContext);
    return (
        <input
            className="calculator-input-container"
            type="text"
            placeholder="0"
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyEvent}
            value={currentInput}
            id="calculator-input"
        />
    );
};
export default CalculatorInput;
