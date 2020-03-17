import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Container from './container'

function App() {
    const [date, setDate] = useState(new Date().toLocaleString('ja-jp'));
    setInterval( () => {
        setDate(new Date().toLocaleString('ja-jp'));
    }, 1000)

	return (
      <main className="todo-list-template">
        <div className="titleAnimation">
            TO DO
            <p className="currentTime">{date}</p>
        </div>
		<Container />
      </main>
	)
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
