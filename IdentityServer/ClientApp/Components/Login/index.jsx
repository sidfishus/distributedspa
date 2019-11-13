import * as React from "react";
import { Fragment } from "react";
import { Form, Segment, Container, Header, Input, Grid, Button, Checkbox, Label } from "semantic-ui-react";

//sidtodo use library functions
import axios from "axios";

const initialState = {
    username: "",
    password: "",
    rememberMe: true,
    invalidDetails: false
};

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state={...initialState};

        this.ChangeUsername = this.ChangeUsername.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.UpdateState = this.UpdateState.bind(this);
        this.LoginClick = this.LoginClick.bind(this);
        this.RememberMeClick=this.RememberMeClick.bind(this);
    }

    UpdateState(f) {
        this.setState(state => f(state));
    }

    ChangeUsername() {
        const value=event.target.value;
        this.UpdateState(() => {
            return {
                username: value,
                invalidDetails: false
            };
        });
    }

    ChangePassword() {
        const value=event.target.value;
        this.UpdateState(() => {
            return {
                password: value,
                invalidDetails: false
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
            if(err.response.status===401) {
                this.UpdateState(() => {
                    return {
                        invalidDetails: true
                    };
                });
            }
            else {
                //sidtodo error msg
            }
        });
    }

    RememberMeClick() {
        this.UpdateState((state) => {
            return {
                rememberMe: !state.rememberMe
            };
        });
    }

    render() {

        const { SSR } = this.props;
        const { rememberMe, username, password, invalidDetails } = this.state;

        let loginForm = null;
        if(!SSR) {
            // Window not available in SSR
            // Use the view ratio to determine how many padding rows are needed to place the login box near the centre
            // so this will work on all screen sizes
            const ratio = window.screen.availHeight / window.screen.availWidth;

            let paddingRows = [];
            const numPadingRows = parseInt(ratio*8.0);
            for(let i=0;i<numPadingRows;++i) {
                paddingRows.push(<Grid.Row key={i} />);
            }

            loginForm = (
                <Fragment>
                    {paddingRows}
                    <Container text>
                        <Segment size="massive" raised>
                            <Header textAlign="center">Sign In</Header>
                            <Grid columns={16}>

                                <Grid.Row>
                                    
                                    <Grid.Column width={1} />
                                    
                                    <Grid.Column width={14} >
                                        <Input focus placeholder="Username" fluid size="large" onChange={this.ChangeUsername} />
                                    </Grid.Column>

                                    <Grid.Column width={1} />
                                    
                                    {invalidDetails &&
                                        <Label floating color="red" pointing="left" size="large">Invalid user or password.</Label>
                                    }
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={14}>
                                        <Input focus type="password" placeholder="Password" fluid size="large" onChange={this.ChangePassword} />
                                    </Grid.Column>
                                    <Grid.Column width={1} />
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={14}>
                                        <Checkbox label="Remember Me" onChange={this.RememberMeClick} checked={rememberMe} />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column>
                                        <Button
                                            primary
                                            size="massive"
                                            onClick={this.LoginClick}
                                            disabled={!username || !password}
                                        >
                                            Login
                                        </Button>
                                    </Grid.Column>

                                    <Grid.Column>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Container>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <br />
                <br />
                <Form>
                    <Grid>
                        {loginForm}
                    </Grid>
                </Form>
            </Fragment>
        );
    }
};