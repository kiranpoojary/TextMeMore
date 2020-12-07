import React, { Component } from 'react'

class RecentPosts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uName: ''
        }

    }
    componentDidMount() {
        this.setState({
            uName: document.getElementById("posts").name
        })
    }

    render() {
        return (
            <div>
                <h1>Recent Posts of : {this.state.uName}</h1>
            </div>
        )
    }
}

export default RecentPosts
