import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Reg from './Registration'
import Forgot from './ForgotPassword'
import axios from 'axios'
require("../pages/confidentialDataStore")

class Login extends Component {
    constructor(props) {
        super(props)
        this.userIdRef = React.createRef()
        this.onIdChange = this.onIdChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            userId: '',
            password: ''

        }
    }


    componentDidMount() {
        this.userIdRef.current.focus()
    }


    onIdChange(e) {
        this.setState({
            userId: e.target.value
        })
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const userCred = {
            userId: this.state.userId,
            password: this.state.password

        }

        console.log(userCred);
        axios.post(`${global.URL}/auth`, userCred)
            .then(res => {

                if (res.data.valid) {
                    let state = {
                        userId: this.state.userId
                    }

                    //this.props.history.push('/user/posts/' + this.state.userId)
                    this.props.history.push({
                        pathname: `/find`,
                        // search: this.state.userId,
                        //search: '?uid=' + this.state.userId,
                        state
                    })

                } else {
                    alert('Invalid UserId/Password')
                    this.props.history.push('/')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <Router>
                <div className="container">
                    <div id="formContent" className="p-4">
                        <form onSubmit={this.onSubmit}>
                            <div className="p-2">
                                <input type="text" ref={this.userIdRef} onChange={this.onIdChange} value={this.state.userId} className="form-control col-md-4 " placeholder="UserID" />
                            </div>
                            <div className="p-2">
                                <input type="password" onChange={this.onPasswordChange} value={this.state.password} className="form-control col-md-4 " placeholder="password" />
                            </div>
                            <div className="p-2">
                                <input type="submit" className="btn btn-primary" value="Log In" />
                            </div>
                        </form>
                        <div className="p-2">
                            <Link to="/register" id="chats" >Register Now</Link>
                            <Link to="/forgot" id="chats" >Forgot Password</Link>
                        </div>
                    </div>
                </div>

                <Route path="/register" exact component={Reg}></Route>
                <Route path="/forgot" exact component={Forgot}></Route>
            </Router>

        )
    }
}

export default Login
