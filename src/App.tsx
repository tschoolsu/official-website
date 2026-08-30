import { useState } from 'react'
import HomePage from './components/HomePage'
import IntroOverlay from './components/IntroOverlay'
import './index.css'

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <HomePage />
      {!introDone && <IntroOverlay onComplete={() => setIntroDone(true)} />}
    </>
  )
}

export default App
