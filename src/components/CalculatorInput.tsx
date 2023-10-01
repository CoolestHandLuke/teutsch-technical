import { useContext } from 'react';
import CalculatorContext from '../context/CalculatorContext';

const CalculatorInput = () => {
    const { currentInput, handleChange } = useContext(CalculatorContext);
    return (
        <input
            className="calculator-input-container"
            type="text"
            onChange={handleChange}
            value={currentInput}
            id="calculator-input"
        />
    );
};
export default CalculatorInput;
