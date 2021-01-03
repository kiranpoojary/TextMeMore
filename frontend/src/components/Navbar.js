import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../images/TextMeMore_Logo.png'
import find from '../images/search.png'
import chat from '../images/private.png'
import group from '../images/group.png'
import notif from '../images/notification.png'
import user from '../images/user.png'
import FindFriends from './FindFriends'
import UserProfile from './Profile'
import Chats from './PrivateChat'
import Notif from './Notifications'
import Random from './RandomChat'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePosts: 'nav-link ',
            activeChats: 'nav-link ',
            activeNotification: 'nav-link ',
            activeLogin: 'nav-link ',
            activeRandom: 'nav-link',
            widthHeightActive: "25%",
            widthHeightFind: "25%",
            widthHeightChat: "15%",
            widthHeightGroup: "15%",
            widthHeightNotif: "15%",
            widthHeightUser: "15%",

            UId: this.props.UId
        }

        this.clicked = this.clicked.bind(this)
    }


    clicked(id) {
        switch (id) {
            case "find":
                this.setState({
                    widthHeightFind: this.state.widthHeightActive,
                    widthHeightChat: "15%",
                    widthHeightGroup: "15%",
                    widthHeightNotif: "15%",
                    widthHeightUser: "15%",
                })
                break
            case "chat":
                this.setState({

                    widthHeightFind: "15%",
                    widthHeightChat: this.state.widthHeightActive,
                    widthHeightGroup: "15%",
                    widthHeightNotif: "15%",
                    widthHeightUser: "15%",
                })
                break
            case "group":
                this.setState({

                    widthHeightFind: "15%",
                    widthHeightChat: "15%",
                    widthHeightGroup: this.state.widthHeightActive,
                    widthHeightNotif: "15%",
                    widthHeightUser: "15%",
                })
                break
            case "notif":
                this.setState({

                    widthHeightFind: "15%",
                    widthHeightChat: "15%",
                    widthHeightGroup: "15%",
                    widthHeightNotif: this.state.widthHeightActive,
                    widthHeightUser: "15%",
                })
                break
            case "user":
                this.setState({

                    widthHeightFind: "15%",
                    widthHeightChat: "15%",
                    widthHeightGroup: "15%",
                    widthHeightNotif: "15%",
                    widthHeightUser: this.state.widthHeightActive
                })
                break
            default:
                break

        }

    }

    render() {
        return (
            <Router>
                <div className="container" >
                    <nav className="navbar navbar-icon-top navbar-expand-lg" style={{ backgroundColor: " #f5f6fa", border: "solid black" }}>
                        <a className="navbar-brand" href="https://www.google.com/search?sxsrf=ALeKk038rcSbyjRvEF5eDDfQ3F5xupu91w%3A1604666588529&source=hp&ei=3ESlX7aTHpWW4-EPlOmA0AU&q=react&oq=react&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzIICAAQyQMQkQIyBQgAEJECMgQIABBDMgcIABCxAxBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnOg0ILhDHARCjAhDqAhAnOgIILjoFCC4QsQM6AggAOggIABCxAxCDAToECC4QQzoHCAAQyQMQQ1DOWVizZWC5aWgBcAB4AIAB3gKIAd0IkgEHMC4yLjIuMZgBAKABAaoBB2d3cy13aXqwAQo&sclient=psy-ab&ved=0ahUKEwi28fXv-O3sAhUVyzgGHZQ0AFoQ4dUDCAc&uact=5" target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="30" height="30" alt="Img not found" />
                        </a>
                        <h4 className="navbar-brand">TextMeMore</h4>
                        <div className="collpse nav-collpse" >
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/find" id="find" onClick={() => this.clicked("find")} name={this.state.UId} className={this.state.activePosts}> <img src={find} width={this.state.widthHeightFind} height={this.state.widthHeightFind} alt="Img not found" /></Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/chats" id="chats" onClick={() => this.clicked("chat")} name={this.state.UId} className={this.state.activeChats}><img src={chat} width={this.state.widthHeightChat} height={this.state.widthHeightChat} alt="Img not found" /></Link>
                                </li>
                                <li className="navbar-item ">
                                    <Link to="/random" id="profile" onClick={() => this.clicked("group")} name={this.state.UId} className={this.state.activeRandom}><img src={group} width={this.state.widthHeightGroup} height={this.state.widthHeightGroup} alt="Img not found" /></Link>
                                </li>
                                <li className="navbar-item ">
                                    <Link to="/notifications" id="notif" onClick={() => this.clicked("notif")} name={this.state.UId} className={this.state.activeNotification}><img src={notif} width={this.state.widthHeightNotif} height={this.state.widthHeightNotif} alt="Img not found" /></Link>
                                </li>
                                <li className="navbar-item " >
                                    <Link to="/profile" id="profile" style={{ color: "green", fontSize: "110%" }} onClick={() => this.clicked("user")} name={this.state.UId} className={this.state.activeLogin}><img src={user} width={this.state.widthHeightUser} height={this.state.widthHeightUser} alt="Img not found" />{this.state.UId}</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path={"/find"} exact component={FindFriends} />
                    <Route path={"/chats"} exact component={Chats} />
                    <Route path={"/random"} exact component={Random} />
                    <Route path={"/notifications"} exact component={Notif} />
                    <Route path={"/profile"} exact component={UserProfile} />
                </div>
            </Router>
        )
    }
}

export default Navbar
