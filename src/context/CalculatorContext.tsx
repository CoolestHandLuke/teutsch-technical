import { createContext, useState } from 'react';

type CalculatorInputValue = any;
const CalculatorContext = createContext<CalculatorInputValue>(['0']);

export const CalculatorProvider = ({ children }: any) => {
    // currentInput is the state of the value currently being typed in by the user, while
    // calculatorState keeps track off ALL the inputs for the current calculation. We do this to ensure
    // a chain of inputs will put out the correct order of operations.
    const [currentInput, setCurrentInput] = useState<string>('0');
    const [calculatorState, setCalculatorState] = useState<string[]>([]);

    const handleOperator: any = (operator: string) => {
        setCalculatorState((prevState) => {
            prevState.push(currentInput);
            prevState.push(operator);
            return prevState;
        });
        setCurrentInput((prevState) => {
            return prevState + ' ' + operator + ' ';
        });
    };

    const handleChange = (e: any) => {
        console.log(e.target.value);
        setCurrentInput(e.target.value);
    };

    const updateCalculatorState = async () => {
        setCalculatorState((prevState) => {
            prevState.push(currentInput);
            return prevState;
        });
    };
    const calculateAnswer = async () => {
        await updateCalculatorState();
        console.log(calculatorState);
        let answer: number = Number(calculatorState[0]);
        for (let i: number = 1; i < calculatorState.length; i += 2) {
            if (calculatorState[i] === 'x') {
                answer = answer * Number(calculatorState[i + 1]);
            } else if (calculatorState[i] === '/') {
                answer = answer / Number(calculatorState[i + 1]);
            } else if (calculatorState[i] === '+') {
                answer = answer + Number(calculatorState[i + 1]);
            } else if (calculatorState[i] === '-') {
                answer = answer - Number(calculatorState[i + 1]);
            }
            console.log(answer);
        }
        setCurrentInput(String(answer));
    };

    const handleClick = (e: any) => {
        // Based off the button pushed we do a bunch of different things.
        // delete will just pop the last value inputted
        // reset will set ALL state back to their defaults
        // equals will calculate the current string of inputs
        // The operations buttons (+, -, x, and /) will cause the app to append the currentInput value in calculatorState
        // and then append the operation button pressed.
        // The +/- button will change the parity of currentInput.
        switch (e.target.value) {
            case 'delete':
                setCurrentInput((prevState) =>
                    // NEED TO MODIFY THIS TO HANDLE NEGATIVE NUMBERS
                    prevState.length > 1 ? prevState.slice(0, -1) : '0'
                );
                break;
            case 'reset':
                setCurrentInput('0');
                setCalculatorState([]);
                break;
            case 'equals':
                calculateAnswer();

                // TODO
                break;
            case '+/-':
                // TODO
                break;
            case '+':
            case '-':
            case 'x':
            case '/':
                handleOperator(e.target.value);
                break;
            default:
                setCurrentInput((prevState): any =>
                    prevState === '0'
                        ? e.target.value
                        : prevState + e.target.value
                );
        }
    };

    return (
        <CalculatorContext.Provider
            value={{ handleClick, currentInput, handleChange }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorContext;
