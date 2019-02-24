// @flow

import * as React from "react";
import { Form,Row,Col,ControlLabel,Button } from "react-bootstrap";

type LoginState = {
    username: string;
    password: string;
};

const initialState : LoginState = {
    username: "",
    password: ""
}

type LoginProps = {
};

class Login extends React.Component<LoginProps,LoginState> {
    constructor(props:LoginProps) {
        super(props);
        this.state=initialState;
    }

    //sidtodo here
    LoginClick() {
        const { state } = this;
        const url=CreateAPIURL("Account/Login");

        HttpPostJson(url,state).then((res) => {
            alert("success");
        }).catch((res) => {
            alert("fail");
        });
    }

    render() {
        const { state } = this;
        return (
            <Form>
                <TextInput
                    labelText="User"
                    value={state.username}
                    UpdateState={(value,state) => {
                        return {
                            username: value
                        };
                    }}
                    parent={this}
                />

                <TextInput
                    labelText="Password"
                    value={state.password}
                    UpdateState={(value,state) => {
                        return {
                            password: value
                        };
                    }}
                    parent={this}
                    password={true}
                />

                <InputButton
                    text="Login"
                    onClick={() => this.LoginClick()}
                    disabled={state.username==="" || state.password===""}
                />
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