import { useContext } from 'react';
import CalculatorContext from '../context/CalculatorContext';
const CalculateButtons = () => {
    const { handleClick } = useContext(CalculatorContext);

    return (
        <div className="calculate-buttons">
            <div id="delete" onClick={handleClick} className="calculate-button">
                <button value={'delete'} className="calculator-button delete">
                    DEL
                </button>
            </div>
            <div id="reset" onClick={handleClick} className="calculate-button">
                <button value={'reset'} className="calculator-button reset">
                    RESET
                </button>
            </div>
            <div id="equals" onClick={handleClick} className="calculate-button">
                <button
                    value={'equals'}
                    className="
                calculator-button equals"
                >
                    =
                </button>
            </div>
        </div>
    );
};
export default CalculateButtons;
