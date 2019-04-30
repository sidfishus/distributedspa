import * as React from "react";
import { Fragment } from "react";
import { Form, Divider, Segment, Checkbox, Grid, Container, Header, Button } from "semantic-ui-react";
import { ConditionalBold } from "../ConditionalBold";

export class Consent extends React.Component {
    constructor(props) {
        const { extra: consentModel } = props.prerenderData;

        super(props);

        // Copy the consent model in to our state
        this.state = {
            identityScopes: this.CopyScopeForState(consentModel.identityScopes),
            apiScopes: this.CopyScopeForState(consentModel.apiScopes),
        };
    }

    render() {
        const { identityScopes, apiScopes } = this.state;
        const { extra: consentModel } = this.props.prerenderData;

        const needScopeDivider=(identityScopes.length>0 && apiScopes.length>0);

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
                                    fOnChange={(checked,idx) => this.ChangeScopeCheckedStatus(checked,idx,"identityScopes")}
                                />
                            }

                            {needScopeDivider && <ConsentDivider horizontal/>}

                            {apiScopes.length > 0 &&
                                <ConstentScopeList
                                    scopeList={apiScopes}
                                    title={"Application Access:"}
                                    keyBase="api"
                                    fOnChange={(checked,idx) => this.ChangeScopeCheckedStatus(checked,idx,"apiScopes")}
                                />
                            }

                            <Grid columns={1}>
                                <Grid.Column>
                                    <Button
                                        primary
                                        size="big"
                                        disabled={!this.AllRequiredAccessIsTicked(identityScopes) ||
                                            !this.AllRequiredAccessIsTicked(apiScopes)}
                                    >
                                        Allow
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Container>
                </Form>
            </Fragment>
        );
    }

    UpdateState(fChange) {
        this.setState(state => fChange(state));
    }

    ChangeScopeCheckedStatus(checked, idx, scopeType) {
        this.UpdateState(state => {
            let scopeListCopy=state[scopeType];
            scopeListCopy[idx].checked=checked;

            let rv={};
            rv[scopeType] = scopeListCopy;

            return rv;
        });
    }

    // The index is so we can instantly reference the checkbox in the state later
    CopyScopeForState(scopeList) {
        return scopeList.map((scope,idx) => {
            return {
                ...scope,
                checked: true,
                idx: idx
            };
        });
    }

    AllRequiredAccessIsTicked(scopeList) {
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
}

const ConsentDivider = () => {
    return <Divider />;
};

const ConstentScopeList = ({scopeList, title, keyBase, fOnChange}) => {

    const scopes=scopeList.map((item,idx) => {
        return (
            <ConsentScope
                scope={item}
                key={`${keyBase}-${idx}`}
                fOnChange={checked => fOnChange(checked,idx)}
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
}

const ConsentScope = ({scope, fOnChange}) => {

    return (
        <Grid.Row>
            <Grid.Column width={3}>
                <Checkbox
                    toggle
                    checked={scope.checked}
                    onChange={(event,data) => fOnChange(data.checked)}
                />
            </Grid.Column>
            <Grid.Column width={13}>
                <ConditionalBold
                    condition={scope.required}
                >
                    {scope.displayName}
                </ConditionalBold>
                {scope.required && <i> (required)</i>}
            </Grid.Column>
        </Grid.Row>
    );
};