import React, { Component } from 'react'
import axios from 'axios'
import '../styles/chatWindowStyle.css'
import '../pages/confidentialDataStore'

class PrivateChat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: document.getElementById("chats").name,
            searchId: '',
            chatWith: '',
            chatLists: [],
            chatTexts: [],
            len: 0,
            msg: '',
            textCount: -7
        }
        this.msgInput = React.createRef()
        this.msgFocus = React.createRef()
        this.showList = this.showList.bind(this)
        this.showChats = this.showChats.bind(this)
        this.inputText = this.inputText.bind(this)
        this.userSearch = this.userSearch.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.loadText = this.loadText.bind(this)






    }





    componentDidMount() {

        let nm = this.state.userId
        let search = this.state.searchId
        axios.get(`${global.URL}/chatList`, { params: { logedUserId: nm, searchId: search, msgLimit: this.state.textCount } })
            .then(response => {
                this.setState({
                    userId: document.getElementById("chats").name,
                    chatLists: response.data,
                    chatTexts: response.data,
                    chatWith: (response.data[this.state.len].chatMember1 === document.getElementById("chats").name) ? response.data[this.state.len].chatMember2 : response.data[this.state.len].chatMember1
                })
            })
            .catch((err) => {
                console.log(err);
            })
        this.msgInput.current.focus()
    }

    componentDidUpdate() {

        let nm = this.state.userId
        let search = this.state.searchId
        axios.get(`${global.URL}/chatList`, { params: { logedUserId: nm, searchId: search, msgLimit: this.state.textCount } })
            .then(response => {
                this.setState({
                    //userId: document.getElementById("chats").name,
                    chatLists: response.data,
                    chatTexts: response.data,
                    chatWith: (response.data[this.state.len].chatMember1 === document.getElementById("chats").name) ? response.data[this.state.len].chatMember2 : response.data[this.state.len].chatMember1
                })

            })
            .catch((err) => {
                console.log(err);
            })
        //this.msgInput.current.focus()

    }


    componentWillUnmount() {

        this.setState = (state, callback) => {
            return;
        };
    }



    showList() {
        let lastMsg
        let sender
        return this.state.chatLists.map((currentChat, i) => {
            let len, time
            len = Object.keys(currentChat.chats).length
            len = len - 1
            lastMsg = currentChat.chats[len].message.substring(0, 18);
            if (currentChat.chats[len].message.length > 20) {
                lastMsg += "..."
            }
            sender = currentChat.chats[len].sender
            time = currentChat.chats[len].textTime

            return (
                <div className="active" key={currentChat.chats[len]._id} style={{ marginTop: '10px' }}>
                    <div className="d-flex bd-highlight" >
                        <div className="img_cont">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="No" className="rounded-circle user_img" />
                            <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                            <button style={{ outlineStyle: 'none', boxShadow: 'none' }} className="button-link" value={i} id={i} onClick={() => this.setState({ len: i })}>{(currentChat.chatMember1 === this.state.userId ? currentChat.chatMember2 : currentChat.chatMember1)}</button>
                            <br /><span style={{ color: 'white' }}>{(sender === this.state.userId) ? "you: " : sender + ": "}{lastMsg}</span>
                            <br /><label style={{ color: 'white', paddingRight: '4%', fontSize: '50%' }} >{time}</label>
                        </div>
                    </div>
                </div >
            )
        })
    }

    showChats() {
        return this.state.chatTexts.map((texts, i) => {

            if (i === this.state.len) {
                return texts.chats.map((tx, j) => {
                    if (tx.sender === this.state.userId) {
                        return (
                            <div key={j} className="d-flex justify-content-end mb-4">
                                <div className="img_cont_msg">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="no" />
                                </div>
                                <div className="msg_cotainer" >
                                    {tx.message}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="msg_time">{tx.textTime}</span>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={j} className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="no" />
                                </div>
                                <div className="msg_cotainer_send" >
                                    {tx.message}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="msg_time">{tx.textTime}</span>
                                </div>
                            </div>


                        )
                    }

                })
            } else {
                return null;
            }
        })
    }



    inputText(e) {
        this.setState({
            msg: e.target.value
        })

    }

    userSearch(e) {
        this.setState({
            searchId: e.target.value
        })
    }



    onSubmit(e) {

        e.preventDefault()
        const userText = {
            member1: this.state.userId,
            member2: this.state.chatWith,
            msg: this.state.msg,
            sender: this.state.userId
        }

        axios.post(`${global.URL}/chatList`, userText)
            .then(res => {
                if (res.data.sent) {
                    this.setState({
                        msg: '',
                        len: 0
                    })

                    this.props.history.push({
                        pathname: `/chats`,
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

    loadText() {
        this.setState({
            textCount: this.state.textCount - 7
        })
    }


    render() {

        return (
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-4 col-xl-3 chat">
                        <div className="card mb-sm-3 mb-md-0 contacts_card">
                            <div className="card-header">
                                <div className="input-group">

                                    <input type="text" placeholder="Search..." onChange={this.userSearch} name="" className="form-control search" />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body contacts_body">
                                {
                                    this.showList()
                                }
                            </div>
                            <div>
                            </div>
                            <div className="card-footer"></div>
                        </div></div>
                    <div className="col-md-8 col-xl-6 chat">
                        <div className="card ">
                            <div className="card-header msg_head active">
                                <div className="d-flex bd-highlight ">
                                    <div className="img_cont">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="no" />
                                        <span className="online_icon"></span>
                                    </div>
                                    <div className="user_info ">
                                        <span>{this.state.chatWith}</span>
                                        <p>last seen: 17:45</p>
                                    </div>
                                    <div className="video_cam">
                                        <span><i className="fas fa-video"></i></span>
                                        <span><i className="fas fa-phone"></i></span>
                                    </div>
                                </div>
                                <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                                <div className="action_menu">
                                    <ul>
                                        <li><i className="fas fa-user-circle"></i> View profile</li>
                                        <li><i className="fas fa-users"></i> Add to close friends</li>
                                        <li><i className="fas fa-plus"></i> Add to group</li>
                                        <li><i className="fas fa-ban"></i> Block</li>
                                    </ul>
                                </div>
                            </div>
                            <center> <button style={{ outlineStyle: 'none', boxShadow: 'none', fontSize: "70%", paddingTop: "0%" }} className="button-link" onClick={this.loadText}>Load More...</button></center>

                            <div className="card-body msg_card_body">
                                {
                                    this.showChats()
                                }

                            </div>
                            <form onSubmit={this.onSubmit}>
                                <div className="card-footer">
                                    <div className="input-group">
                                        <div className="input-group-append">
                                            <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                                        </div>
                                        <input type="text" value={this.state.msg} required onChange={this.inputText} ref={this.msgInput} className="form-control type_msg" placeholder="Type your message..."></input>
                                        <div className="input-group-append">
                                            <span className="input-group-text send_btn"><i className="fas fa-location-arrow"><input type="submit" value="Send" /></i></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrivateChat








