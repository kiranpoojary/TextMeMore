import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from '../images/TextMeMore_Logo.png'
import 'bootstrap/dist/css/bootstrap.css'
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
            UId: this.props.UId
        }
    }


    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand" href="https://www.google.com/search?sxsrf=ALeKk038rcSbyjRvEF5eDDfQ3F5xupu91w%3A1604666588529&source=hp&ei=3ESlX7aTHpWW4-EPlOmA0AU&q=react&oq=react&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzIICAAQyQMQkQIyBQgAEJECMgQIABBDMgcIABCxAxBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnOg0ILhDHARCjAhDqAhAnOgIILjoFCC4QsQM6AggAOggIABCxAxCDAToECC4QQzoHCAAQyQMQQ1DOWVizZWC5aWgBcAB4AIAB3gKIAd0IkgEHMC4yLjIuMZgBAKABAaoBB2d3cy13aXqwAQo&sclient=psy-ab&ved=0ahUKEwi28fXv-O3sAhUVyzgGHZQ0AFoQ4dUDCAc&uact=5" target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="30" height="30" alt="Img not found" />
                        </a>
                        <h4 className="navbar-brand">TextMeMore</h4>
                        <div className="collpse nav-collpse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/find" id="posts" name={this.state.UId} className={this.state.activePosts}>FindFriend</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/chats" id="chats" name={this.state.UId} className={this.state.activeChats}>PrivateChats</Link>
                                </li>
                                <li className="navbar-item align-right">
                                    <Link to="/random" id="profile" name={this.state.UId} className={this.state.activeRandom}>RandomChats</Link>
                                </li>
                                <li className="navbar-item align-right">
                                    <Link to="/notifications" id="notif" name={this.state.UId} className={this.state.activeNotification}>Notifications</Link>
                                </li>
                                <li className="navbar-item align-right">
                                    <Link to="/profile" id="profile" name={this.state.UId} className={this.state.activeLogin}>{this.state.UId}</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path={"/find"} exact component={FindFriends} />
                    <Route path={"/profile"} exact component={UserProfile} />
                    <Route path={"/chats"} exact component={Chats} />
                    <Route path={"/random"} exact component={Random} />
                    <Route path={"/notifications"} exact component={Notif} />
                </div>
            </Router>
        )
    }
}

export default Navbar
