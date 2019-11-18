// @flow

import * as React from "react";
import { Form,Row,Col,ControlLabel,Button } from "react-bootstrap";
import {  CreateAPIURL } from "../../Shared/http";

type LoginProps = {
};

type LoginState = {
};

class Login extends React.Component<LoginProps,LoginState> {

    m_UserManager;
    m_User;

    constructor(props:LoginProps) {
        super(props);
        this.IDS4LoginClick = this.IDS4LoginClick.bind(this);
        this.CallAPIClick=this.CallAPIClick.bind(this);
        this.SetUser=this.SetUser.bind(this);
    }


    IDS4LoginClick() {
        // Login
        this.m_UserManager.signinRedirect();
    }

    //sidtodo current move
    CallAPIClick() {

        if(!this.m_User) {
            this.m_UserManager.events.addUserLoaded(args => {
                alert("new user");
                this.m_UserManager.getUser().then(user => {
                    this.m_User = user;
                });
            });

            this.m_UserManager.getUser().then(user => {
                this.m_User = user;
            });

            return;
        }

        if(this.m_User) {

            //alert("expired: " + this.m_User.expired());

            var url = CreateAPIURL("TestAPI/TestAction");

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                //sidtodo current check for 401
                console.log(xhr.status, JSON.parse(xhr.responseText));
            }
            xhr.setRequestHeader("Authorization", "Bearer " + this.m_User.access_token);
            xhr.send();
        }
        else {
            // Take user to login screen
            this.IDS4LoginClick();
        }
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