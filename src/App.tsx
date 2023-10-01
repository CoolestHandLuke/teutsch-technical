import './App.css';
import { CalculatorProvider } from './context/CalculatorContext';
import CalculatorInput from './components/CalculatorInput';
import NumberAndOperationsButtons from './components/NumberAndOperationsButtons';
import CalculateButtons from './components/CalculateButtons';

function App() {
    return (
        <CalculatorProvider>
            <div className="main">
                <section className="calculator-body">
                    <CalculatorInput />
                    <div className="buttons-container">
                        <NumberAndOperationsButtons />
                        <CalculateButtons />
                    </div>
                </section>
            </div>
        </CalculatorProvider>
    );
}

export default App;
