import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
//mport Register from './Registration'
//import ForgotPass from './ForgotPassword'
import Login from './Login'



function index() {
            return (
                        <Login />
            )
}

export default index
