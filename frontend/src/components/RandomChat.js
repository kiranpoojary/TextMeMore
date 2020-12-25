import React, { Component } from 'react'
import axios from 'axios'
import '../pages/confidentialDataStore'
import '../styles/chatWindowStyle.css'


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

        axios.get(`${global.URL}/random`)
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
        axios.get(`${global.URL}/random`)
            .then(response => {

                this.setState({
                    chats: response.data
                })


            })
            .catch((err) => {
                console.log(err);
            })
        this.msgInput.current.focus()
    }

    componentWillUnmount() {

        this.setState = (state, callback) => {
            return;
        };
    }

    recentChats() {
        return this.state.chats.map((currentChat, i) => {
            if (currentChat.sender === this.state.userId) {
                return (
                    <div key={i} className="d-flex justify-content-end mb-4">
                        <div className="img_cont_msg">
                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="no" />
                        </div>
                        <div className="msg_cotainer_send">
                            &nbsp;&nbsp;{currentChat.msg}&nbsp;&nbsp;&nbsp;
                            <span className="msg_time">{currentChat.textTiming}</span>
                        </div>
                    </div>


                )
            } else {
                return (
                    <div key={i} className="d-flex justify-content-start mb-4">
                        <div className="img_cont_msg">
                            <div className="click-to-top"><img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" alt="No" /><span> {currentChat.sender}</span></div>
                        </div>
                        <div className="msg_cotainer" >
                            {currentChat.msg}&nbsp;&nbsp;&nbsp;
                            <span className="msg_time">{currentChat.textTiming}</span>
                        </div>
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


        axios.post(`${global.URL}/random`, userText)
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
            <div className="container-fluid h-100">
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-xl-8 chat">
                        <div className="card">
                            <div className="card-header msg_head active">
                                <div className="d-flex bd-highlight">
                                    <div className="img_cont">
                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="no" />
                                        <span className="online_icon"></span>
                                    </div>
                                    <div className="user_info">
                                        <span>Random Chats</span>
                                        <p>Online</p>
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
                            <div className="card-body msg_card_body" >

                                {
                                    this.recentChats()
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
            </div >
        );
    }
}

export default RandomChat
