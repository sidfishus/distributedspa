import * as React from "react";
import { Fragment } from "react";
import { Form, Segment, Container, Header, Input, Grid, Button } from "semantic-ui-react";

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

        const { SSR } = this.props;

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
                                        <Input focus placeholder="Username" fluid size="large" />
                                    </Grid.Column>
                                    <Grid.Column width={1} />
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column width={14}>
                                        <Input focus password="true" placeholder="Password" fluid size="large" />
                                    </Grid.Column>
                                    <Grid.Column width={1} />
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column width={1} />
                                    <Grid.Column>
                                        <Button
                                            primary
                                            size="massive"
                                            onClick={this.LoginClick}
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