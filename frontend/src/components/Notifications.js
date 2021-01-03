import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'


class Notifications extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uName: null
        }
    }


    componentDidMount() {
        this.setState({
            uName: document.getElementById("notif").name
        })


    }


    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">

                <a className="navbar-brand" href="google.com">Navbar</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="google.com">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="google.com">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="google.com">Link</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Notifications



