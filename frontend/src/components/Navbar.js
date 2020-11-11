import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import logo from '../images/TextMeMore_Logo.png'
import 'bootstrap/dist/css/bootstrap.css'
import Chats from './AllChats'
import Post from './RecentPosts'
import Login from './Login'



class Navbar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activePosts: 'nav-link ',
            activeChats: 'nav-link ',
            activeNotification: 'nav-link ',
            activeLogin: 'nav-link active',

        }
    }



    render() {
        return (

            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="https://www.google.com/search?sxsrf=ALeKk038rcSbyjRvEF5eDDfQ3F5xupu91w%3A1604666588529&source=hp&ei=3ESlX7aTHpWW4-EPlOmA0AU&q=react&oq=react&gs_lcp=CgZwc3ktYWIQAzIECCMQJzIECCMQJzIECCMQJzIICAAQyQMQkQIyBQgAEJECMgQIABBDMgcIABCxAxBDMgQIABBDMgQIABBDMgQIABBDOgcIIxDqAhAnOg0ILhDHARCjAhDqAhAnOgIILjoFCC4QsQM6AggAOggIABCxAxCDAToECC4QQzoHCAAQyQMQQ1DOWVizZWC5aWgBcAB4AIAB3gKIAd0IkgEHMC4yLjIuMZgBAKABAaoBB2d3cy13aXqwAQo&sclient=psy-ab&ved=0ahUKEwi28fXv-O3sAhUVyzgGHZQ0AFoQ4dUDCAc&uact=5" target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="30" height="30" alt="Img not found" />
                        </a>
                        <h4 className="navbar-brand">TextMeMore</h4>
                        <div className="collpse nav-collpse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/user/posts/:uid" className={this.state.activePosts}>Posts</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/chats" className={this.state.activeChats}>Chats</Link>
                                </li>
                                <li className="navbar-item align-right">
                                    <Link to="/notifications" className={this.state.activeNotification}>Notifications</Link>
                                </li>
                                <li className="navbar-item align-right">
                                    <Link to="/" className={this.state.activeLogin}>Login{this.state.uid}</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path="/" exact component={Login} />
                    <Route path="/user/posts/:id" exact component={Post} />
                    <Route path="/chats" exact component={Chats} />
                </div>
            </Router>

        )
    }
}

export default Navbar
