import React, { Component } from 'react'
import Nav from './Navbar'

class NavAdder extends Component {
    constructor(props) {
        super(props)
        if (typeof (this.props.location.state.userId) != "undefined") {
            this.state = {
                uid: this.props.location.state.userId
            }
        } else {

            this.state = {
                uid: ''
            }
        }
    }

    render() {
        return (
            <div>
                <Nav UId={this.state.uid} />
            </div>
        )
    }
}

export default NavAdder



