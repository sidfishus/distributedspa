// @flow

import * as React from "react";
import { Form,Row,Col,ControlLabel,Button } from "react-bootstrap";
import * as Oidc from "oidc-client";

type LoginProps = {
};

type LoginState = {
};

class Login extends React.Component<LoginProps,LoginState> {
    constructor(props:LoginProps) {
        super(props);
        this.IDS4LoginClick = this.IDS4LoginClick.bind(this);
    }

    IDS4LoginClick() {
        // Create the user manager
        //sidtodo change the URL's
        var config = {
            authority: "http://localhost:5099",
            client_id: "DistributedSPA",
            redirect_uri: "https://localhost:5001/logincallback",
            response_type: "code",
            scope:"openid DistributedSPA",
            post_logout_redirect_uri : "https://localhost:5001/login",
        };
        var mgr = new Oidc.UserManager(config);

        // Login
        mgr.signinRedirect();
    }

    render() {
        const { state } = this;
        return (
            <Form horizontal>
                <Row>
                    <Col>
                        <InputButton
                            text="Identity Server 4 Login"
                            onClick={this.IDS4LoginClick}
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