import { createContext, useEffect, useState } from 'react';

type CalculatorInputValue = any;
const CalculatorContext = createContext<CalculatorInputValue>(['']);

export const CalculatorProvider = ({ children }: any) => {
    /**
     * I'm using useContext to manage the state for the entire app since its the only state management tool I know so far. currentInput keeps track of whatever is currently being entered in to the calculator
     * @todo Add comma formatting to large numbers (x,xxx,xxx.xx)
     */
    const [currentInput, setCurrentInput] = useState<string>('');

    /**
     * handleOperator is called anytime the user types in a new operator. This will keep the currentInput field nicely formatted.
     * @todo Modify handleOperator to move the previous currentInput to above the input field, and allow the user to type the new input below it (like how the iOS calculator does it). Looks prettier this way.
     */
    const handleOperator = (operator: string) => {
        setCurrentInput((prevState) => {
            return prevState + ' ' + operator + ' ';
        });
    };

    /**
     * Anytime the user presses the decimal button we have to check to make sure the current number doesn't already have one.
     * @todo Probably gonna have to modify this whenever I get around to fixing handleOperator, since the state will look different
     */
    const handleDecimal = (): void => {
        const inputs: string[] = currentInput.split(' ');
        const lastInput: string = inputs[inputs.length - 1];
        console.log(lastInput);
        if (lastInput.match(/\.{1}/g)) {
            window.alert("You can't put two decimal places in one number!");
        } else {
            setCurrentInput((prevState) => {
                return prevState + '.';
            });
        }
    };

    /**
     * Update state when the user types in the input field
     */
    const handleChange = (e: any) => {
        setCurrentInput(e.target.value);
    };

    /**
     * handleKeyEvent is triggered on any keyboard input. Hitting enter will calculate the current answer, anything else will be checked to make sure its a legal input. Legal inputs are numbers 0-9, decimal point, the supported operators (+, -, *, / and ^), keyLeft, keyRight, backspace, and delete. Anything else will be ignored.
     * @todo Fix the bug where backspace/delete don't work directly after inputting an operator. It's messing up because of the additional spaces being added around the operator character.
     */
    const handleKeyEvent = (e: any) => {
        if (e.key === 'Enter') {
            calculateAnswer();
        } else if (e.key.match(/[/+\-*^]/g)) {
            // Regex is checking for operators
            e.preventDefault();
            setCurrentInput((prevState) => {
                return prevState + ' ' + e.key + ' ';
            });
        } else if (e.key === '.') {
            // Special case for decimals
            e.preventDefault();
            handleDecimal();
        } else if (
            !(
                (
                    e.key.match(/[0-9]/g) || // Any number 0-9
                    e.keyCode === 46 || // delete
                    e.keyCode === 37 || // leftArrow
                    e.keyCode === 39 || // rightArrow
                    e.keyCode === 8
                ) // backspace
            )
        ) {
            e.preventDefault();
        }
    };

    /**
     * An issue I ran in to with formatting: After typing in an operator I needed to add a whitespace to maintain proper formatting. useEffect does the trick but it seems a little inelegant
     * @todo Fix this bullshit whenever I do something better with the state management.
     */

    useEffect(() => {
        if (currentInput.slice(-1).match(/[/+\-*^]/g)) {
            setCurrentInput((prevState) => {
                return prevState + ' ';
            });
        }
    }, [handleKeyEvent]);

    /**
     * In its current form, calculateAnswer splits the currentInput state on whitespace, iterates over the resulting list and performs the calculations in order. This is both inefficient and stupid, but its the best I could come up with. It also fails to perform correct order of operations.
     * @todo Fix this heaping pile of strong political opinions in to something vaguely resembling respectable code
     */

    const calculateAnswer = (): void => {
        const inputs: string[] = currentInput.split(' ');
        let answer: number = Number(inputs[0]);
        for (let i: number = 1; i < inputs.length; i += 2) {
            if (inputs[i] === '*') {
                answer = answer * Number(inputs[i + 1]);
            } else if (inputs[i] === '/') {
                answer = answer / Number(inputs[i + 1]);
            } else if (inputs[i] === '+') {
                answer = answer + Number(inputs[i + 1]);
            } else if (inputs[i] === '-') {
                answer = answer - Number(inputs[i + 1]);
            } else if (inputs[i] === '^') {
                answer = answer ** Number(inputs[i + 1]);
            }
        }
        setCurrentInput(String(answer));
    };

    /**
     * Click handler for every button on the calculator. Uses a humble switch tree to decide what to do
     */

    const handleClick = (e: any) => {
        switch (e.target.value) {
            case 'delete':
                setCurrentInput((prevState) =>
                    prevState.length > 1 ? prevState.slice(0, -1) : ''
                );
                break;
            case 'reset':
                setCurrentInput('');
                break;
            case 'equals':
                calculateAnswer();
                break;
            // All operators are handled as a fallthrough
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
                handleOperator(e.target.value);
                break;
            // Decimal button is special since we need to check if the current number already has one.
            case '.':
                handleDecimal();
                break;
            // Default will handle all number inputs.
            default:
                setCurrentInput(
                    (prevState): string => prevState + e.target.value
                );
        }
    };

    return (
        <CalculatorContext.Provider
            value={{ handleClick, currentInput, handleChange, handleKeyEvent }}
        >
            {children}
        </CalculatorContext.Provider>
    );
};

export default CalculatorContext;
