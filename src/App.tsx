import React, { useState } from 'react'
// import Count from './components/Count';
// import Suspense from './components/Suspense';
// import StartTransition from './components/StartTransition';
// import UseDeferredValue from './components/UseDeferredValue';
import UseTransition from './components/UseTransition';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Count /> */}
      {/* <Suspense /> */}
      {/* <StartTransition /> */}
      {/* <UseDeferredValue /> */}
      <UseTransition />
    </div>
  )
}

export default App
