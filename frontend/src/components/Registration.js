import React, { Component } from 'react'
import axios from 'axios'
import logo from '../images/TextMeMore_Logo.png'

class Registration extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fn: '',
            uid: '',
            pass: '',
            conPass: '',
            email: '',
            mobile: ''

        }
        this.changeUserID = this.changeUserID.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeConfirm = this.changeConfirm.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeMobile = this.changeMobile.bind(this)
        this.submitData = this.submitData.bind(this)
    }

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
            inputMobile: this.state.mobile
        }
        axios.post(`${global.URL}/register`, regInfo)
            .then(response => {
                if (response.data.registered) {
                    this.props.history.push({
                        path: "http://192.168.1.10:3000/"
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
            <div className="card col-md-5">
                <a className="navbar-brand" href="https://www.google.com/search?sxsrf=ALeKk038rcSbyjRvEF5eDDfQ3F5xupu91w%3A1604666588529&source=hp&ei=3ESlX7aTHpWW4-EPlOmA0AU&q=react&oq=react&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzIICAAQyQMQkQIyBQgAEJECMgQIABBDMgcIABCxAxBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnOg0ILhDHARCjAhDqAhAnOgIILjoFCC4QsQM6AggAOggIABCxAxCDAToECC4QQzoHCAAQyQMQQ1DOWVizZWC5aWgBcAB4AIAB3gKIAd0IkgEHMC4yLjIuMZgBAKABAaoBB2d3cy13aXqwAQo&sclient=psy-ab&ved=0ahUKEwi28fXv-O3sAhUVyzgGHZQ0AFoQ4dUDCAc&uact=5" target="_blank" rel="noopener noreferrer">
                    <img src={logo} width="30" height="30" alt="Img not found" /></a>
                <h2 style={{ color: 'hotpink' }}>TextMeMore</h2>
                <div className="cd-inline-flex p-2col-md-4">
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
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registration
