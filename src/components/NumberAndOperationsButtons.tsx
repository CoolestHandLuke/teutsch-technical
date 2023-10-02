import { useContext } from 'react';
import CalculatorContext from '../context/CalculatorContext';

const NumberAndOperationsButtons = () => {
    const { handleClick } = useContext(CalculatorContext);
    return (
        <div className="numbers-button-container">
            <div className="buttons-row">
                <button
                    value={'7'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    7
                </button>
                <button
                    value={'8'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    8
                </button>
                <button
                    value={'9'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    9
                </button>
                <button
                    value={'+'}
                    onClick={handleClick}
                    className="calculator-button operator-button"
                >
                    +
                </button>
            </div>
            <div className="buttons-row">
                <button
                    value={'4'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    4
                </button>
                <button
                    value={'5'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    5
                </button>
                <button
                    value={'6'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    6
                </button>
                <button
                    value={'-'}
                    onClick={handleClick}
                    className="calculator-button operator-button"
                >
                    -
                </button>
            </div>
            <div className="buttons-row">
                <button
                    value={'1'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    1
                </button>
                <button
                    value={'2'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    2
                </button>
                <button
                    value={'3'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    3
                </button>
                <button
                    value={'*'}
                    onClick={handleClick}
                    className="calculator-button operator-button"
                >
                    *
                </button>
            </div>
            <div className="buttons-row">
                <button
                    value={'.'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    .
                </button>
                <button
                    value={'0'}
                    onClick={handleClick}
                    className="calculator-button"
                >
                    0
                </button>
                <button
                    value={'^'}
                    onClick={handleClick}
                    className="calculator-button operator-button"
                >
                    ^
                </button>
                <button
                    value={'/'}
                    onClick={handleClick}
                    className="calculator-button operator-button"
                >
                    /
                </button>
            </div>
        </div>
    );
};
export default NumberAndOperationsButtons;
