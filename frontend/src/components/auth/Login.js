import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        const url = 'http://127.0.0.1:8000/api/accounts/login/'
        const loginData = {
            "username": "admin",
            "password": "admin",
        }
        const response = axios.post(url, loginData)
    }

    render() {
    
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>username</label>
                    <input type="text"></input>
                    <label>password</label>
                    <input type="password"></input>
                    <button>login</button>
                </form>
            </div>
        );
    }
}

export default Login;