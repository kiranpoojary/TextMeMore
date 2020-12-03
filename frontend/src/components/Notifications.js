import React, { Component } from 'react'

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
            <div>
                <h3>Notifications : {this.state.uName}</h3>
            </div>
        )
    }
}

export default Notifications
