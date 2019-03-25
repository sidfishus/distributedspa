import * as React from "react";
import axios from "axios";

const initialState = {
    username: "",
    password: "",
};

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state=initialState;
        this.ChangeUsername = this.ChangeUsername.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.UpdateState = this.UpdateState.bind(this);
        this.LoginClick = this.LoginClick.bind(this);
    }

    UpdateState(f) {
        this.setState(state => f(state));
    }

    ChangeUsername() {
        const value=event.target.value;
        this.UpdateState(() => {
            return {
                username: value
            };
        });
    }

    ChangePassword() {
        const value=event.target.value;
        this.UpdateState(() => {
            return {
                password: value
            };
        });
    }

    LoginClick() {
        axios.post("/account/login",this.state);
    }

    render() {
        return (
            <div>
                <input value={this.state.username} onChange={this.ChangeUsername} />
                <br />
                <input value={this.state.password} onChange={this.ChangePassword} />
                <br />
                <button onClick={this.LoginClick}>Login</button>
            </div>
        );
    }
};