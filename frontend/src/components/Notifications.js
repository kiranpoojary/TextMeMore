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
            limit: 1
        }
        this.showNotifications = this.showNotifications.bind(this)
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
            return user.notifications.map((noti, j) => {
                if (j < this.state.limit) {
                    switch (noti.notiType) {
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
                    var d1 = new Date(noti.time)
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
                                switch (hr) {
                                    case 1:
                                        timeString = hr + " hour ago"
                                        break
                                    case 2:
                                        timeString = hr + " hours ago"
                                        break
                                    case 3:
                                        timeString = hr + " hours ago"
                                        break
                                    case 4:
                                        timeString = hr + " hours ago"
                                        break
                                    case 5:
                                        timeString = hr + " hours ago"
                                        break
                                    case 6:
                                        timeString = hr + " hours ago"
                                        break
                                    case 7:
                                        timeString = hr + " hours ago"
                                        break
                                    case 8:
                                        timeString = hr + " hours ago"
                                        break
                                    case 9:
                                        timeString = hr + " hours ago"
                                        break
                                    case 10:
                                        timeString = hr + " hours ago"
                                        break
                                    case 11:
                                        timeString = hr + " hours ago"
                                        break
                                    case 12:
                                        timeString = hr + " hours ago"
                                        break
                                    case 13:
                                        timeString = hr + " hours ago"
                                        break
                                    case 14:
                                        timeString = hr + " hours ago"
                                        break
                                    case 15:
                                        timeString = hr + " hours ago"
                                        break
                                    case 16:
                                        timeString = hr + " hours ago"
                                        break
                                    case 17:
                                        timeString = hr + " hours ago"
                                        break
                                    case 18:
                                        timeString = hr + " hours ago"
                                        break
                                    case 19:
                                        timeString = hr + " hours ago"
                                        break
                                    case 20:
                                        timeString = hr + " hours ago"
                                        break
                                    case 21:
                                        timeString = hr + " hours ago"
                                        break
                                    case 22:
                                        timeString = hr + " hours ago"
                                        break
                                    case 23:
                                        timeString = hr + " hours ago"
                                        break

                                    default:
                                        break

                                }
                            } else {
                                var days = Math.floor(hr / 24)
                                switch (days) {
                                    case 1:
                                        timeString = days + " day ago"
                                        break
                                    case 2:
                                        timeString = days + " days ago"
                                        break
                                    case 3:
                                        timeString = days + " days ago"
                                        break
                                    case 4:
                                        timeString = days + " days ago"
                                        break
                                    case 5:
                                        timeString = days + " days ago"
                                        break
                                    case 6:
                                        timeString = days + " days ago"
                                        break
                                    case 7:
                                        timeString = days + " days ago"
                                        break
                                    case 8:
                                        timeString = days + " days ago"
                                        break
                                    case 9:
                                        timeString = days + " days ago"
                                        break
                                    case 10:
                                        timeString = days + " days ago"
                                        break
                                    default:
                                        timeString = "10+ days ago"
                                }
                            }
                        }

                    return (
                        <div className="active" key={j} style={{ borderRadius: "15px", paddingTop: "3%" }}>

                            <div className="d-flex bd-highlight" >
                                <div className="img_cont" >
                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" alt="No" className="rounded-circle user_img" />
                                    <span className="online_icon offline"></span>
                                </div>
                                <div className="user_info">
                                    <button style={{ outlineStyle: 'none', boxShadow: 'none' }} className="button-link" value={noti.fromId} id={j}>{noti.fromId + msg}</button>
                                    <label style={{ color: 'white', fontSize: "70%" }}>{timeString}</label>
                                </div>
                            </div>
                            <hr />
                        </div >
                    )
                }
                return ""
            })


        })
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
                                <button onClick={() => { this.setState({ limit: this.state.limit + 1 }) }} style={{ outlineStyle: 'none', boxShadow: 'none', fontSize: '80%' }} className="button-link">Load More...</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications



