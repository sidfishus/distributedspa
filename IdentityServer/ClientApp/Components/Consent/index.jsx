import * as React from "react";
import { Fragment } from "react";
import { Form, Divider, Segment, Checkbox, Grid } from "semantic-ui-react";
import { ConditionalBold } from "../ConditionalBold";

export class Consent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //sidtodo here
        const { prerenderData } = this.props;
        const { extra: consentModel } = prerenderData;

        const needScopeDivider=consentModel.identityScopes.length>0 && consentModel.apiScopes.length>0;

        return (
            <Form>
                <div>{consentModel.clientName} is requesting your permission.</div>
                <br />
                <div>Please uncheck the permissions you do not wish to grant.</div>
                <ConsentDivider />

                {consentModel.identityScopes.length > 0 &&
                    <ConstentScopeList
                        scopeList={consentModel.identityScopes}
                        title={"Personal Information:"}
                        keyBase="identity"
                    />
                }

                {needScopeDivider && <ConsentDivider horizontal/>}

                {consentModel.apiScopes.length > 0 &&
                    <ConstentScopeList
                        scopeList={consentModel.apiScopes}
                        title={"Application Access:"}
                        keyBase="api"
                    />
                }
            </Form>
        );
    }
}

const ConsentDivider = () => {
    return <Divider horizontal />;
};

const ConstentScopeList = ({scopeList, title,keyBase}) => {

    const scopes=scopeList.map((item,idx) => {
        return <ConsentScope scope={item} key={`${keyBase}-${idx}`} />
    });

    return (
        <Fragment>
            <label>{title}</label>
            <Grid>
                {scopes}
            </Grid>
        </Fragment>
    );
}

const ConsentScope = ({scope}) => {

    return (
        <Grid.Row>
            <Grid.Column>
                <Checkbox toggle defaultChecked />
            </Grid.Column>
            <Grid.Column width={8}>
                <ConditionalBold
                    condition={scope.required}
                >
                    {scope.displayName}
                </ConditionalBold>
                {scope.required && " (required)"}
            </Grid.Column>
        </Grid.Row>
    );
};