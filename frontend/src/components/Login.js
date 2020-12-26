import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

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
                <div >
                    <h2 style={{ color: 'hotpink' }}>Login</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group ">
                            <input type="text" className=" form-control " ref={this.userIdRef} onChange={this.onIdChange} value={this.state.userId} placeholder="UserID" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control " onChange={this.onPasswordChange} value={this.state.password} placeholder="password" />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="form-control btn btn-primary" value="Log In" />
                        </div>
                    </form>

                </div>





            </Router>

        )
    }
}

export default Login
