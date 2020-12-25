import React, { Component } from 'react'
import axios from 'axios'
import '../styles/chatWindowStyle.css'
require("../pages/confidentialDataStore")

class FindFriends extends Component {
    constructor(props) {
        super(props)

        this.showUsers = this.showUsers.bind(this)
        this.showMore = this.showMore.bind(this)
        this.searchChange = this.searchChange.bind(this)
        this.selectUser = this.selectUser.bind(this)
        this.showMoreVisiblity = this.showMoreVisiblity.bind(this)
        this.sayHi = this.sayHi.bind(this)

        this.state = {
            userId: '',
            userLimit: 2,
            searchQ: '',
            users: []
        }

    }
    componentDidMount() {
        let query = this.state.searchQ
        let lim = this.state.userLimit
        let logedUserId = this.state.userId
        console.log(query);

        axios.get(`${global.URL}/searchUser`, { params: { searchQry: query, searchLimit: lim, user: logedUserId } })
            .then(response => {
                this.setState({
                    userId: document.getElementById("chats").name,
                    users: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        let query = this.state.searchQ
        let lim = this.state.userLimit
        let logedUserId = this.state.userId
        axios.get(`${global.URL}/searchUser`, { params: { searchQry: query, searchLimit: lim, user: logedUserId } })
            .then(response => {
                this.setState({
                    userId: document.getElementById("chats").name,
                    users: response.data
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



    showMore() {
        this.setState({
            userLimit: this.state.userLimit + 1
        })
    }

    showMoreVisiblity() {
        if (this.state.userLimit !== 1) {
            return <button onClick={this.showMore} style={{ outlineStyle: 'none', boxShadow: 'none', fontSize: '80%' }} className="button-link">Load More...</button>
        }
    }


    selectUser(e) {
        this.setState({
            searchQ: e.target.value,
            userLimit: 1
        })
        let query = this.state.searchQ
        let lim = this.state.userLimit
        let logedUserId = this.state.userId
        axios.get(`${global.URL}/searchUser`, { params: { searchQry: query, searchLimit: lim, user: logedUserId } })
            .then(response => {
                this.setState({
                    userId: document.getElementById("chats").name,
                    users: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }



    searchChange(e) {
        this.setState({
            searchQ: e.target.value,
            userLimit: 2
        })
    }

    sayHi(e) {
        let member2 = e.target.value
        const userText = {
            member1: this.state.userId,
            member2: member2,
            msg: "Hi",
            sender: this.state.userId
        }

        axios.post(`${global.URL}/chatList`, userText)
            .then(res => {
                if (res.data.sent) {
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
    }



    showUsers() {
        if (this.state.userLimit !== 1) {
            return this.state.users.map((user, i) => {
                return (
                    <div className="active" key={i} style={{ marginTop: '20px', marginLeft: '1%', borderRadius: '50px', height: '17%' }}>
                        <div className="d-flex bd-highlight" style={{ marginTop: '2%' }} >
                            <div className="img_cont" style={{ marginLeft: '15%', marginTop: '2%' }}>
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="No" className="rounded-circle user_img" />
                                <span className="online_icon offline"></span>
                            </div>
                            <div className="user_info">
                                <button style={{ outlineStyle: 'none', boxShadow: 'none' }} className="button-link" value={user.userId} onClick={this.selectUser}>{user.userName}</button>
                                <br /><label style={{ color: 'white', fontSize: '50%' }} >Last Active: 3:30PM</label>
                            </div>
                        </div>
                    </div >
                )
            })
        } else {
            return this.state.users.map((user, i) => {
                return (
                    <div className="active" key={i} style={{ marginTop: '20px', marginLeft: '1%', borderRadius: '50px' }}>
                        <div className="d-flex bd-highlight" style={{ marginTop: '2%' }} >
                            <div className="img_cont" style={{ marginLeft: '15%', marginTop: '2%' }}>
                                <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="No" className="rounded-circle user_img" />
                                <span className="online_icon offline"></span>
                            </div>
                            <div className="user_info">
                                <button style={{ outlineStyle: 'none', boxShadow: 'none' }} className="button-link" >{user.userName} </button><label style={{ color: 'white', fontSize: '50%' }} >Last Active: 3:30PM</label>
                                <br />
                                <label style={{ color: 'yellow' }}>Chats: 23</label>&nbsp;&nbsp;&nbsp;&nbsp;<label style={{ color: 'yellow' }}>    Posts: 9</label>
                                <button style={{ outlineStyle: 'none', boxShadow: 'none', paddingLeft: '5%' }} value={user.userId} onClick={this.sayHi} className="btn btn-primary" >Say Hi Now</button>
                            </div>
                        </div>

                        {/* Posts start */}
                        <div className="container" style={{ padding: '1px 10% 5% 10%' }}>
                            <hr style={{ border: '1px dotted yellow' }} />
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery">
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery">
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery" >
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/158971/pexels-photo-158971.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                                <div className="col-lg-4 col-md-4 col-xs-8 thumb">
                                    <a className="thumbnail" href="google.com" data-image-id="" data-toggle="modal" data-title=""
                                        data-image="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        data-target="#image-gallery">
                                        <img className="img-thumbnail"
                                            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                            alt="Another alt text" />
                                    </a>
                                </div>
                            </div>
                            <hr style={{ border: '1px dotted yellow' }} />
                        </div>

                    </div >
                )
            })
        }
    }

    render() {
        return (
            //<h1>Recent Posts of : {this.state.uName}</h1>
            <div className="container-fluid h-100" >
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-xl-8 chat">
                        <div className="card">
                            <div className="card-header msg_head active">
                                <div className="input-group">
                                    <input type="text" placeholder="Search..." onChange={this.searchChange} name="" className="form-control search" />
                                    <div className="input-group-prepend">
                                        <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body msg_card_body" >

                                {
                                    this.showUsers()
                                }

                                {
                                    this.showMoreVisiblity()
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default FindFriends