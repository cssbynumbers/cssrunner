import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Challenge from './components/Challenge/Challenge'
import Solution from './components/Solution/Solution'
import * as htmlToImage from 'html-to-image';
import Comparison from './components/Comparison/Comparison'

function App() {
  const [isValidating, setIsValidating] = useState(false)
  const [cache, setCache] = useState(1);

  const challengeRef = useRef(null);
  const solutionRef = useRef(null);

  const handleValidate = () => {setIsValidating(true); setCache(prev => prev + 1)}

  const handleReset = () => {setIsValidating(false); console.clear();}

  return (
    <>
      <h1>CSS Runner</h1>
      <div className="card">
        <Challenge ref={challengeRef} />
        <Solution ref={solutionRef} />
        <button onClick={handleValidate}>
          Verify Solution {cache}
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
        {isValidating && <Comparison key={cache} challengeRef={challengeRef} solutionRef={solutionRef} />}
      </div>
    </>
  )
}

export default App
