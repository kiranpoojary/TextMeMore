import React, { Component } from 'react'
import axios from 'axios'
let ali = "col-md-8 offset-md-2"


export class RandomChat extends Component {
    constructor(props) {
        super(props)
        this.msgInput = React.createRef();
        this.onSubmit = this.onSubmit.bind(this)
        this.recentChats = this.recentChats.bind(this)
        this.inputText = this.inputText.bind(this)

        this.state = {
            msg: '',
            sender: '',
            chats: []
        }

    }


    componentDidMount() {
        axios.get("http://192.168.1.10:4000/random")
            .then(response => {
                this.setState({
                    sender: document.getElementById("chats").name,
                    chats: response.data

                })
            })
            .catch((err) => {
                console.log(err);
            })
        console.log("mount");

    }


    componentDidUpdate() {
        axios.get("http://192.168.1.10:4000/random")
            .then(response => {

                this.setState({
                    chats: response.data
                })

                this.msgInput.current.focus()

            })
            .catch((err) => {
                console.log(err);
            })


    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log("unmount");
    }



    recentChats() {
        return this.state.chats.map((currentChat, i) => {
            if (currentChat.sender === "ki") {
                ali = "col-md-8 offset-md-6"
                return (
                    <div className={ali}>
                        <h5 style={{ color: currentChat.color }} key={i}>{currentChat.msg}</h5>
                    </div>
                )
            } else {
                ali = "col-md-8 offset-md-2"
                return (
                    <div className={ali}>
                        <h5 style={{ color: currentChat.color }} key={i}>{currentChat.msg}</h5>
                    </div>
                )
            }


        })
    }

    inputText(e) {
        this.setState({
            msg: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const userText = {
            msg: this.state.msg,
            sender: this.state.sender
        }


        axios.post("http://192.168.1.10:4000/random", userText)
            .then(res => {
                console.log(res.data);
                if (res.data.sent) {
                    // let state = {
                    //     userId: this.state.userId
                    // }
                    this.setState({
                        msg: ''
                    })

                    this.props.history.push({
                        pathname: `/random`,
                        // search: this.state.userId,
                        //search: '?uid=' + this.state.userId,
                        //state
                    })
                } else {
                    alert("Message sending failed!..")
                    this.props.history.push('/')
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    render() {
        return (
            <div className="col">
                <div className="col-md-6 offset-md-2" style={{ background: "gray" }}>

                    {
                        this.recentChats()
                    }


                    <br />
                    {/* {Object.keys(this.state.chats).map(i => document.writeln((this.state.chats[i])))} */}
                    <form onSubmit={this.onSubmit}>
                        <div className="col-md-8 offset-md-3">
                            <input type="text" value={this.state.msg} ref={this.msgInput} placeholder="Type Message" required autoComplete="off" name="ipMsg" onChange={this.inputText} />
                            <input type="submit" value="Send" />
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default RandomChat
