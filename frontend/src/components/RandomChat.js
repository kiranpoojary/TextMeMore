import React, { Component } from 'react'
import axios from 'axios'
let ali = "col-md-8 offset-md-2"


export class RandomChat extends Component {
    constructor(props) {
        super(props)
        this.msgInput = React.createRef()
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
                    userId: document.getElementById("chats").name,
                    chats: response.data

                })

            })
            .catch((err) => {
                console.log(err);
            })

    }


    componentDidUpdate() {
        axios.get("http://192.168.1.10:4000/random")
            .then(response => {

                this.setState({
                    chats: response.data
                })


            })
            .catch((err) => {
                console.log(err);
            })


    }

    componentWillUnmount() {

        this.setState = (state, callback) => {
            return;
        };
    }



    recentChats() {
        return this.state.chats.map((currentChat, i) => {
            if (currentChat.sender === this.state.userId) {
                ali = "col-md-8 offset-md-6 float-right"
                return (
                    <div className={ali} key={i} style={{ paddingRight: '0%' }}>
                        <h5 style={{ color: currentChat.color, padding: '2%', background: "darkblue", borderRadius: '10px', width: '95%', paddingLeft: '8px' }} key={i}>{currentChat.msg}<label className="float-right" style={{ fontSize: '40%', paddingRight: '4%' }}>
                            {currentChat.textTiming}
                        </label></h5>

                    </div>
                )
            } else {
                ali = "col-md-8 offset-md-2 float-left"
                return (
                    <div className={ali} key={i} style={{ paddingLeft: '0%' }}>
                        <h5 style={{ color: currentChat.color, padding: '2%', background: "#010101", borderRadius: '10px', width: '75%', paddingLeft: '8px' }} key={i}>{currentChat.msg}<label className="float-right" style={{ fontSize: '40%' }}>
                            {currentChat.textTiming}
                        </label></h5>

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
            sender: this.state.userId
        }


        axios.post("http://192.168.1.10:4000/random", userText)
            .then(res => {
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
        this.msgInput.current.focus()
    }


    render() {
        return (
            <div className="col">
                <div className="col-md-6 offset-md-2" style={{ background: "gray" }}>
                    <br />

                    {
                        this.recentChats()
                    }


                    <br />
                    {/* {Object.keys(this.state.chats).map(i => document.writeln((this.state.chats[i])))} */}
                    <form onSubmit={this.onSubmit}>
                        <div className="col-md-8 offset-md-3">
                            <input type="text" value={this.state.msg} onChange={this.inputText} ref={this.msgInput} placeholder="Type Message" required autoComplete="off" name="ipMsg" />
                            <input type="submit" value="Send" />
                            {/* onChange={() => this.inputText} */}
                        </div>
                        <br />
                    </form>
                </div>

            </div >

        );
    }
}

export default RandomChat
