import React, { Component } from 'react'
import axios, { post } from 'axios'


export class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }


    onFormSubmit(e) {
        e.preventDefault()
        let file = this.state.file
        axios.post(`${global.URL}/image`, { a: 10, b: 20 })
            .then(res => {
                console.log(file);
                alert(res.data.num1);
            })
            .catch(err => {
                console.log(err);
            })


        // const options = {
        //     url: `${global.URL}/image`,
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     },
        //     data: {
        //         a: 10,
        //         b: 20
        //     }
        // };

        // axios(options)
        //     .then(response => {
        //         alert("done")
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })


    }


    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}
export default Profile
