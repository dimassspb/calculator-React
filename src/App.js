import { useState } from 'react';
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

function App() {
  const [result, setResult] = useState('');

  const operators = ['/', '*', '+', '-', '.'];

  const updateResult = (value) => {
    if (
      (operators.includes(value) && result === '') ||
      (operators.includes(value) && operators.includes(result.slice(-1)))
    ) {
      return;
    }
    setResult(result + value);
  };

  const createDigits = (a, b) => {
    const digits = [];
    for (let i = a; i <= b; i++) {
      digits.push(
        <div onClick={() => updateResult(i.toString())} key={i}>
          {i}
        </div>,
      );
    }
    return digits;
  };

  const calculate = () => {
    setResult(math.evaluate(result).toString());
  };

  const reset = () => {
    setResult('');
  };

  return (
    <div className="calculator">
      <div className="input">{result ? result : '0'}</div>
      <div className="buttons">
        <div className="operators">
          <div onClick={() => updateResult('+')}>+</div>
          <div onClick={() => updateResult('-')}>-</div>
          <div onClick={() => updateResult('*')}>*</div>
          <div onClick={() => updateResult('/')}>/</div>
        </div>
        <div className="leftPanel">
          <div className="numbers">{createDigits(7, 9)}</div>
          <div className="numbers">{createDigits(4, 6)}</div>
          <div className="numbers">{createDigits(1, 3)}</div>
          <div className="numbers">
            <div onClick={() => updateResult('0')}>0</div>
            <div onClick={() => updateResult('.')}>.</div>
            <div onClick={reset}>AC</div>
          </div>
        </div>
        <div className="equal" onClick={calculate}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
