import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Find from './NavAdder'
import MainPage from './Index'




class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact component={MainPage} />
                    <Route path="/find" exact component={Find} />
                </div>
            </Router>

        )
    }
}

export default App
