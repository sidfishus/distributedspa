import * as React from "react";
import { Fragment } from "react";

//sidtodo use library functions
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
        // Login 
        const { returnUrl } = this.props;
        axios.post("/account/login",{
            ...this.state,
            returnUrl: returnUrl
        }).then(res => {
            window.location=res.data;
        }).catch(err => {
            //sidtodo
            alert("error 1");
        });
    }

    render() {

        return (
            <Fragment>
                <input value={this.state.username} onChange={this.ChangeUsername} />
                <br />
                <input value={this.state.password} onChange={this.ChangePassword} />
                <br />
                <input type="hidden" name="returnUrl" value={this.props.returnUrl} />
                <button onClick={this.LoginClick}>Login</button>
            </Fragment>
        );
    }
};