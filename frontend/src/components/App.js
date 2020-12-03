import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
//import Chats from './AllChats'
import Posts from './NavAdder'
import Login from './Login'
//import Notif from './Notifications'
//import UserProfile from './Profile'



class App extends Component {


    render() {
        return (
            <Router>
                <div className="container">
                    <Route path="/" exact component={Login} />
                    <Route path="/posts" exact component={Posts} />
                    {/* <Route path="/profile" component={UserProfile} />
                    <Route path="/chats" component={Chats} />
                    <Route path="/notifications" component={Notif} /> */}
                </div>
            </Router>

        )
    }
}

export default App
