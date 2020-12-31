import React, { Component } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import Forgot from './ForgotPassword'
import axios from 'axios'
require("../pages/confidentialDataStore")

class Login extends Component {
    constructor(props) {
        super(props)
        this.userIdRef = React.createRef()
        this.onIdChange = this.onIdChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.openLogin = this.openLogin.bind(this)
        this.openReg = this.openReg.bind(this)
        this.openForgot = this.openForgot.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        //reg function
        this.changeUserID = this.changeUserID.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeConfirm = this.changeConfirm.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeMobile = this.changeMobile.bind(this)
        this.submitData = this.submitData.bind(this)

        this.state = {
            userId: '',
            password: '',

            //reg state data
            fn: '',
            uid: '',
            pass: '',
            conPass: '',
            email: '',
            mobile: ''

        }
    }


    componentDidMount() {
        this.userIdRef.current.focus()
    }

    //Lofin Function Definition

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

    openLogin() {
        document.getElementById("login").style.display = "block"
        document.getElementById("reg").style.display = "none"
        document.getElementById("forgot").style.display = "none"
    }


    openReg() {
        document.getElementById("login").style.display = "none"
        document.getElementById("reg").style.display = "block"
        document.getElementById("forgot").style.display = "none"
    }

    openForgot() {
        document.getElementById("login").style.display = "none"
        document.getElementById("reg").style.display = "none"
        document.getElementById("forgot").style.display = "block"
    }

    onClickForgot() {

    }

    onSubmit(e) {
        e.preventDefault()
        const userCred = {
            userId: this.state.userId,
            password: this.state.password

        }

        axios.post(`${global.URL}/auth`, userCred)
            .then(res => {
                if (res.data.valid) {
                    let state = {
                        userId: this.state.userId
                    }

                    this.props.history.push({
                        pathname: `/find`,
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


    //Reg function definitions
    changeUserID(e) {

        this.setState({
            uid: e.target.value
        })

    }

    changePassword(e) {
        this.setState({
            pass: e.target.value
        })
    }

    changeConfirm(e) {
        this.setState({
            conPass: e.target.value
        })
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    changeMobile(e) {
        this.setState({
            mobile: e.target.value
        })
    }

    submitData(e) {

        let regInfo = {
            inputName: document.getElementById('fn').value,
            inputUserId: this.state.uid,
            inputPassword: this.state.pass,
            inputEmail: this.state.email,
            inputMobile: this.state.mobile,
        }
        axios.post(`${global.URL}/register`, regInfo)
            .then(response => {
                if (response.data.registered) {
                    this.props.history.push({
                        pathname: `/`,

                    })
                } else {
                    e.preventDefault()
                    alert("Registration Failed!..Try Again")
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <Router>
                <div className="d-flex justify-content-center" style={{ display: 'none' }}>
                    <div className="card col-md-6 d-flex justify-content-center">
                        <div className="cd-inline-flex col-md-10 ">
                            <Link to="" onClick={this.openLogin} style={{ paddingLeft: '4%' }} >Login</Link>
                            <Link to="" onClick={this.openReg} style={{ paddingLeft: '4%' }} >Create New Account</Link>
                            <Link to="" onClick={this.openForgot} style={{ paddingLeft: '4%' }} >Forgot Password</Link>

                            <div id="login">
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
                            <div id="reg" style={{ display: 'none' }}>
                                <div>
                                    <h2 style={{ color: 'hotpink' }}>Registration</h2>
                                    <form onSubmit={this.submitData}>
                                        <div className="form-group">
                                            <input type="text" placeholder="Full Name" id="fn" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={this.changeUserID} className="form-control" placeholder="UserId(Only Letters andNumbers)" required />
                                            <label style={{ color: 'red', display: 'none' }}>UserID Not Available</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={this.changePassword} placeholder="Password" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={this.changeConfirm} placeholder="Re-type password" className="form-control"></input>
                                            <label style={{ color: 'red', display: 'none' }}>Password Mismatch</label>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={this.changeEmail} placeholder="Email ID" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" onChange={this.changeMobile} placeholder="Mobile" className="form-control"></input>
                                        </div>
                                        {/* pattern="[6789][0-9]{9}" */}
                                        <div className="form-group">
                                            <input type="file" placeholder="Picture" className="form-control"></input>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="form-control btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="forgot" style={{ display: 'none' }}>
                                <Forgot />
                            </div>
                        </div>

                    </div></div>

            </Router>

        )
    }
}

export default Login
