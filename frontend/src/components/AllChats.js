import React, { Component } from 'react'


class AllChats extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uName: null
        }
    }

    componentDidMount() {
        this.setState({
            uName: document.getElementById("chats").name
        })


    }




    render() {
        return (
            <div>
                {/* <Nav UId={"ki"} In={"posts"} /> */}
                <h3>All Chats : {this.state.uName}</h3>
            </div>
        )
    }
}

export default AllChats
