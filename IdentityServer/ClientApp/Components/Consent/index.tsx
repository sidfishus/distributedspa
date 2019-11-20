import * as React from "react";
import { Fragment } from "react";
import { Form, Divider, Segment, Checkbox, Grid, Container, Header, Button } from "semantic-ui-react";
import { ConditionalBold } from "../ConditionalBold";
import { IRoutedCompProps, IScope } from "../../routes";
import axios from "axios";

interface IScopeForState extends IScope {
    checked: boolean;
    idx: number;
};

interface IConsentProps extends IRoutedCompProps {
    returnUrl: string;
};

type IConsentState = {
    identityScopes: Array<IScopeForState>;
    apiScopes: Array<IScopeForState>;
    errorMsg: string;
};

export class Consent extends React.Component<IConsentProps,IConsentState> {
    constructor(props: IConsentProps) {
        const { extra: consentModel } = props.prerenderData;

        super(props);

        this.SubmitConsent=this.SubmitConsent.bind(this);
        this.UpdateState = this.UpdateState.bind(this);

        // Copy the consent model in to our state
        this.state = {
            identityScopes: this.CopyScopeForState(consentModel.identityScopes),
            apiScopes: this.CopyScopeForState(consentModel.apiScopes),
            errorMsg: null
        };
    }

    render() {
        const { identityScopes, apiScopes, errorMsg } = this.state;
        const { extra: consentModel } = this.props.prerenderData;

        if(errorMsg) {
            return <p>{errorMsg}</p>;
        }

        const needScopeDivider=(identityScopes.length>0 && apiScopes.length>0);

        const submitDisabled=(!this.AllRequiredAccessIsTicked(identityScopes) ||
            !this.AllRequiredAccessIsTicked(apiScopes));

        return (
            <Fragment>
                <br />
                <br />
                <Form>
                    <Container text>
                        <Segment size="huge" raised>
                            <Header textAlign="center"><u>{consentModel.clientName} is requesting your permission.</u></Header>
                            <br />
                            <div>Please uncheck the permissions you do not wish to grant:</div>
                            <ConsentDivider />

                            {identityScopes.length > 0 &&
                                <ConstentScopeList
                                    scopeList={identityScopes}
                                    title={"Personal Information:"}
                                    keyBase="identity"
                                    fOnChange={(checked: boolean,idx: number) => this.ChangeScopeCheckedStatus(checked,idx,"identityScopes")}
                                />
                            }

                            {needScopeDivider && <ConsentDivider horizontal/>}

                            {apiScopes.length > 0 &&
                                <ConstentScopeList
                                    scopeList={apiScopes}
                                    title={"Application Access:"}
                                    keyBase="api"
                                    fOnChange={(checked: boolean,idx: number) => this.ChangeScopeCheckedStatus(checked,idx,"apiScopes")}
                                />
                            }

                            <ConsentDivider horizontal/>

                            <br />

                            <Grid columns={1}>
                                <Grid.Column>
                                    <SubmitConsent
                                        parent={this}
                                        remember={false}
                                        disabled={submitDisabled}
                                    >
                                        Allow
                                    </SubmitConsent>

                                    <SubmitConsent
                                        parent={this}
                                        remember={true}
                                        disabled={submitDisabled}
                                    >
                                        Allow and Remember
                                    </SubmitConsent>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Container>
                </Form>
            </Fragment>
        );
    }

    UpdateState(fChange: (state: IConsentState) => any) {
        this.setState(state => fChange(state));
    }

    ChangeScopeCheckedStatus(checked: boolean, idx: number, scopeType: string) {
        this.UpdateState(state => {
            const scopeListCopy: Array<IScopeForState> =(state as any)[scopeType];
            scopeListCopy[idx].checked=checked;

            const rv: any={};
            rv[scopeType] = scopeListCopy;

            return rv;
        });
    }

    // The index is so we can instantly reference the checkbox in the state later
    CopyScopeForState(scopeList: Array<IScope>): Array<IScopeForState> {
        return scopeList.map((scope,idx) => {
            return {
                ...scope,
                checked: true,
                idx: idx
            };
        });
    }

    AllRequiredAccessIsTicked(scopeList: Array<IScopeForState>) {
        let requiredAreAllTicked=true;

        // All required scopes must be checked
        for(let i=0;i<scopeList.length;++i) {
            const scope=scopeList[i];
            requiredAreAllTicked=(!scope.required || scope.checked);
            if(!requiredAreAllTicked) {
                break;
            }
        }

        return requiredAreAllTicked;
    }

    SubmitConsent(rememberConsent: boolean) {
        const { returnUrl } = this.props;
        axios.post("/consent",{
            ...this.state,
            rememberConsent: rememberConsent,
            returnUrl: returnUrl
        }).then(res => {
            window.location=res.data;
        }).catch(res => {
            const errorMsg=((res.response && res.response.data)?res.response.data:res.message);
            this.UpdateState(() => {
                return {
                    errorMsg: errorMsg
                };
            });
        });
    }
}

const ConsentDivider: any = () => {
    return <Divider />;
};

const ConstentScopeList: any =
    ({scopeList, title, keyBase, fOnChange}:
    { scopeList: Array<IScopeForState>, title: string, keyBase: string, fOnChange: (checked: boolean, idx: number) => void}) => {

    const scopes=scopeList.map((item,idx) => {
        return (
            <ConsentScope
                scope={item}
                key={`${keyBase}-${idx}`}
                fOnChange={(checked: boolean) => fOnChange(checked,idx)}
            />
        );
    });

    return (
        <Fragment>
            <label>{title}</label>
            <Grid columns={2}>
                {scopes}
            </Grid>
        </Fragment>
    );
};

const MyCheckbox: any =
    ({fOnChange, label, checked}:
    {fOnChange: (checked: boolean) => void, label: string, checked: boolean}) => {
    return (
        <Grid.Row>
            <Grid.Column width={3}>
                <Checkbox
                    toggle
                    checked={checked}
                    onChange={(event,data) => fOnChange(data.checked)}
                />
            </Grid.Column>
            {label && 
                <Grid.Column width={13}>
                    {label}
                </Grid.Column>
            }
        </Grid.Row>
    );
};

const ConsentScope: any =
    ({scope, fOnChange}:
    {scope: IScopeForState, fOnChange: (checked: boolean) => void}) => {

    const label = (
        <Fragment>
            <ConditionalBold
                condition={scope.required}
            >
                {scope.displayName}
            </ConditionalBold>
            {scope.required && <i> (required)</i>}
        </Fragment>
    );

    return (
        <MyCheckbox
            fOnChange={fOnChange}
            label={label}
            checked={scope.checked}
        />
    );
};

const SubmitConsent: any =
    ({parent, remember, children, disabled}:
    {parent: Consent, remember: boolean, children: React.ReactElement, disabled: boolean}) => {
    return (
        <Button
            primary
            size="big"
            disabled={disabled}
            onClick={() => parent.SubmitConsent(remember)}
        >
            {children}
        </Button>
    );
};