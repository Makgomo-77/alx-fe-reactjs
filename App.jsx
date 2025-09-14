import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WelcomeMessage from './WelcomeMessage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
  


        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <WelcomeMessage />

    </>
  )
}
import UserProfile from './UserProfile'
import Header from './header'
import MainContent from './MainContent'
import Footer from './Footer'
import Counter from './Counter'


function App() {
  return(
    <div>
      <Header />
      <MainContent />
      <UserProfile
       name="Alice"
       age="25"
        bio="Loves hiking and photography." />
      <Footer />
    </div>
  )
}
;
export default App;