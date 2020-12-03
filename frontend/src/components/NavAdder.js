import React, { Component } from 'react'
import Nav from './Navbar'

class RecentPosts extends Component {
    constructor(props) {
        super(props)
        if (typeof (this.props.location.state.userId) != "undefined") {
            this.state = {
                uid: this.props.location.state.userId
            }
        } else {
            alert("ji")
            this.state = {

                uid: ' '
            }
        }
    }

    render() {
        return (
            <div>
                <Nav UId={this.state.uid} />

            </div>
        )
    }
}

export default RecentPosts






// import React from "react";
// import { NavLink } from "react-router-dom";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import Nav from './Navbar'
// import UserProfile from './Profile'
// import Chats from './AllChats'
// import Post from './RecentPosts'
// import Login from './Login'

// const Details = (props) => {
//     const { Username, Email, City, Phone } =
//         (props.location && props.location.state) || {};
//     console.log("Hey " + Username);
//     return (
//         <div>
//             <Router>
//                 <Nav UId={Username} In={"posts"} />
//                 <div className="form-details">
//                     <div>
//                         <strong>Username:</strong> {Username}
//                     </div>
//                     <div>
//                         <strong>Email:</strong> {Email}
//                     </div>
//                     <div>
//                         <strong>City:</strong> {City}
//                     </div>
//                     <div>
//                         <strong>Phone:</strong> {Phone}
//                     </div>
//                 </div>


//             </Router>
//         </div>

//     );
// };

// export default Details;
