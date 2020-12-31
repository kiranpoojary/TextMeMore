import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Find from './NavAdder'
import Login from './Login'


export class Index extends Component {
            render() {
                        return (
                                    <Router >
                                                <Route path="/" exact component={Login} />
                                                <Route path="/find" component={Find} />
                                    </Router>
                        )
            }
}

export default Index
