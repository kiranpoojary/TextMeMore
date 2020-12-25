import React, { Component } from 'react'


export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uName: null
        }
    }


    componentDidMount() {
        this.setState({
            uName: document.getElementById("profile").name
        })


    }




    render() {
        return (

            <h3>User Profile : {this.state.uName}</h3>



        )
    }
}

export default Profile
