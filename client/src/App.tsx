import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routes'

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">{routes}</div>
        </BrowserRouter>
    )
}

export default App
