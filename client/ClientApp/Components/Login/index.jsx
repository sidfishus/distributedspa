// @flow

import * as React from "react";
import { Form,Row,Col,ControlLabel,Button } from "react-bootstrap";
import * as Oidc from "oidc-client";
import {  CreateAPIURL } from "../../Shared/http";

type LoginProps = {
};

type LoginState = {
};

class Login extends React.Component<LoginProps,LoginState> {

    m_UserManager;

    constructor(props:LoginProps) {
        super(props);
        this.IDS4LoginClick = this.IDS4LoginClick.bind(this);
        this.CallAPIClick=this.CallAPIClick.bind(this);
    }

    //sidtodo this doesn't work if you put it in the constructor??
    componentDidMount() {
        // Create the user manager
        //sidtodo change the URL's
        var config = {
            authority: "http://localhost:5099",
            client_id: "DistributedSPAClient",
            redirect_uri: "http://localhost:5000/logincallback",
            response_type: "code",
            scope:"openid DistributedSPA",
            post_logout_redirect_uri : "http://localhost:5000/login",
        };
        this.m_UserManager = new Oidc.UserManager(config);
    }

    IDS4LoginClick() {
        // Login
        this.m_UserManager.signinRedirect();
    }

    //sidtodo current move
    CallAPIClick() {
        this.m_UserManager.getUser().then(user => {

            if(user) {
                var url = CreateAPIURL("TestAPI/TestAction");

                var xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = function () {
                    //sidtodo current check for 401
                    console.log(xhr.status, JSON.parse(xhr.responseText));
                }
                xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
                xhr.send();
            }
            else {
                // Take user to login screen
                this.IDS4LoginClick();
            }
        });
    }

    render() {
        const { state } = this;
        return (
            <Form horizontal="true">
                <Row>
                    <Col>
                        <InputButton
                            text="Identity Server 4 Login"
                            onClick={this.IDS4LoginClick}
                        />

                        <InputButton
                            text="Call API"
                            onClick={this.CallAPIClick}
                        />
                    </Col>
                </Row>
            </Form>
        );
    }
}

//sidtodo change the md tags
const InputCtrl = (props:any) => {
	return (
		<Form.Group as ={Row}>
			<Form.Label column md={3}>
				{props.labelText}
			</Form.Label>
			<Col md={5} >
				{props.children}
			</Col>
		</Form.Group>
	);
};

const TextInput = (props) => {
	return (
		<InputCtrl
			labelText={props.labelText}
		>
			<Form.Control
				type={((props.password)?"password":"text")}
				value={props.value}
				onChange={(event) => {
                    const value = event.target.value;
                    props.parent.setState((state) => {
                        return props.UpdateState(value,state);
                    });
                }}
			/>
		</InputCtrl>
	);
};

const InputButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.text}
        </Button>
    );
};

export default Login;