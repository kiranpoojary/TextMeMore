import React, { Component } from 'react'
import axios from 'axios'

class AllChats extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uName: null,
            chatLists: []
        }

        this.showList = this.showList.bind(this)
        this.openChat = this.openChat.bind(this)
    }


    componentDidMount() {
        this.setState({
            uName: document.getElementById("chats").name
        })
        axios.get("http://192.168.1.10:4000/chatList")
            .then(response => {
                this.setState({
                    userId: document.getElementById("chats").name,
                    chatLists: response.data

                })

            })
            .catch((err) => {
                console.log(err);
            })
    }

    showList() {
        let lastMsg
        let sender
        return this.state.chatLists.map((currentChat, i) => {
            let len
            len = Object.keys(currentChat.chats).length
            len = len - 1
            lastMsg = currentChat.chats[len].message.substring(0, 24);
            if (currentChat.chats[len].message.length > 24) {
                lastMsg += "..."
            }
            sender = currentChat.chats[len].sender

            return (
                <div key={currentChat.chats[len]._id}>
                    <hr />
                    <label style={{ fontSize: '130%', color: 'aqua' }}>{(currentChat.chatMember1 === this.state.userId ? currentChat.chatMember2 : currentChat.chatMember1)}</label>
                    <br />
                    <label >{(sender === this.state.userId) ? "You:" : sender + ":"}</label><label >{lastMsg}</label><label style={{ paddingLeft: '3%', fontSize: '50%' }}>{currentChat.chats[len].textTime}</label>
                    <hr />
                </div >

            )
            //})
        })
    }

    openChat() {

    }

    render() {
        return (
            <div className="col">
                <div className="col-md-6 offset-md-2" style={{ background: "gray" }}>
                    <br />
                    {
                        this.showList()
                    }
                    <br />
                </div>

            </div >
        )
    }
}

export default AllChats
