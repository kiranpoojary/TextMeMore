import React, { Component } from 'react'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'



class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            userData: [],
            limit: 2
        }
        this.showNotifications = this.showNotifications.bind(this)
        this.notiSelected = this.notiSelected.bind(this)
    }


    componentDidMount() {
        this.setState({
            userId: document.getElementById("notif").name
        })

        var id = document.getElementById("notif").name



        axios.get(`${global.URL}/searchUser/notifications`, { params: { userId: id } })
            .then(response => {

                this.setState({
                    userData: response.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {

            }
            )

    }


    showNotifications() {
        var msg
        return this.state.userData.map((user, i) => {
            var totalNoti = Object.keys(user.notifications).length

            var start = totalNoti - 1
            var till = totalNoti - this.state.limit
            return user.notifications.map((noti, j) => {

                if (start >= till) {
                    var type = user.notifications[start].notiType
                    var from = user.notifications[start].fromId
                    var time = user.notifications[start].time
                    // var seen = Boolean(user.notifications[start].seen)
                    start--

                    switch (type) {
                        case "request":
                            msg = " requested to follow you."
                            break
                        case "accept":
                            msg = " accepted your follow request."
                            break
                        default:
                            msg = "Something went wrong"
                            break
                    }
                    var d1 = new Date(time)
                    var d2 = new Date()
                    var diff = d2 - d1
                    var min = Math.floor(diff / 60e3)
                    var hr = Math.floor(min / 60)
                    var timeString
                    if (min === 0) {
                        timeString = "just now"
                    } else
                        if (min > 0 && min < 60) {
                            timeString = min + " minutes ago"
                        } else {
                            if (hr > 0 && hr < 24) {
                                timeString = hr + " hour ago"

                            } else {
                                var days = Math.floor(hr / 24)
                                if (days <= 9) {
                                    timeString = (days === 1) ? days + " day ago" : days + " days ago"
                                } else {
                                    timeString = "9+ days ago"
                                }
                            }
                        }

                    return (
                        <div className="user-list" key={j} >

                            <div className="d-flex bd-highlight" >
                                <div className="img_cont" >
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="No" className="rounded-circle user_img" />
                                    <span className="online_icon offline"></span>
                                </div>
                                <div className="user_info">
                                    <button style={{ outlineStyle: 'none', boxShadow: 'none' }} onClick={this.notiSelected} className="button-link" value={from} id={j}>{from + msg}</button>
                                    <label style={{ color: 'white', fontSize: "70%" }}>{timeString}</label>
                                </div>
                            </div>
                        </div >
                    )

                }


                return null

            })
        })
    }

    notiSelected(e) {

    }


    render() {
        return (
            //<h1>Recent Posts of : {this.state.uName}</h1>
            <div className="container-fluid h-100" >
                <div className="row justify-content-center h-100">
                    <div className="col-md-8 col-xl-8 chat">
                        <div className="card">
                            <div className="card-header msg_head active" style={{ color: "white" }}>
                                <h3>Recent Notification</h3>
                            </div>

                            <div className="card-body msg_card_body" >

                                {
                                    this.showNotifications()
                                }
                                <button onClick={() => { this.setState({ limit: this.state.limit + 2 }) }} style={{ outlineStyle: 'none', boxShadow: 'none', fontSize: '80%' }} className="button-link">Load More...</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications



