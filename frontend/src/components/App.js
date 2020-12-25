import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Login from './Login'
import Posts from './NavAdder'




class App extends Component {


    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact component={Login} />
                    <Route path="/find" exact component={Posts} />

                </div>
            </Router>

        )
    }
}

export default App
