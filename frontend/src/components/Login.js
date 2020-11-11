import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props)

        this.onIdChange = this.onIdChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            userId: '',
            password: ''

        }
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

        //console.log(userCred);
        axios.post("http://localhost:4000/auth", userCred)
            .then(res => {

                if (res.data.valid) {
                    let state = {
                        Username: "kiranpoojary48",
                        Email: "k@nokia.com",
                        City: "Udupi",
                        Phone: 7975858891
                    }
                    console.log(state);
                    //this.props.history.push('/user/posts/' + this.state.userId)
                    this.props.history.push({
                        pathname: '/user/posts/' + this.state.userId,
                        //search: '?id=101',
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
            <div className="container">
                <div id="formContent" className="p-4">
                    <form onSubmit={this.onSubmit}>
                        <div className="p-2">
                            <input type="text" onChange={this.onIdChange} value={this.state.userId} className="form-control col-md-4 " placeholder="UserID" />

                        </div>
                        <div className="p-2">
                            <input type="password" onChange={this.onPasswordChange} value={this.state.password} className="form-control col-md-4 " placeholder="password" />

                        </div>
                        <div className="p-2">
                            <input type="submit" className="btn btn-primary" value="Log In" />
                        </div>
                    </form>
                    <div className="p-2">
                        <a className="link" href="google.com">Forgot Password?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
