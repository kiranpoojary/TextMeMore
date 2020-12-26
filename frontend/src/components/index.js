import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Find from './NavAdder'
import Login from './Login'
import Reg from './Registration'
import Forgot from './ForgotPassword'

export class Index extends Component {

            render() {
                        return (
                                    <Router >
                                                <div className="d-flex justify-content-center" style={{ display: 'none' }}>
                                                            <div className="card col-md-5 d-flex justify-content-center">
                                                                        <div className="cd-inline-flex col-md-10 ">
                                                                                    <Link to="/" >Login</Link>
                                                                                    <Link to="/register" style={{ paddingLeft: '4%' }} >Create New Account</Link>
                                                                                    <Link to="/forgot" style={{ paddingLeft: '4%' }} >Forgot Password</Link>
                                                                                    <div style={{ paddingTop: "5%" }}>
                                                                                                <Route path="/" exact component={Login} />
                                                                                                <Route path="/register" exact component={Reg}></Route>
                                                                                                <Route path="/forgot" exact component={Forgot}></Route>
                                                                                    </div>
                                                                        </div>
                                                            </div>
                                                </div>
                                                <Route path="/find" exact component={Find} />
                                    </Router>
                        )
            }
}

export default Index
