import * as React from "react";
import { Form, Divider, Segment, Checkbox, Grid } from "semantic-ui-react";
import { ToggleBold } from "../ToggleBold";

export class Consent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //sidtodo here
        const { prerenderData } = this.props;
        const { extra: consentModel } = prerenderData;

        const identityScopes=consentModel.identityScopes.map((item,idx) => {
            return <ConsentScope scope={item} key={`identity-${idx}`} />
        });

        return (
            <Form>
                <div>{consentModel.clientName} is requesting your permission.</div>
                <br />
                <div>Please uncheck the permissions you do not wish to grant.</div>
                <br />
                <Divider
                    horizontal
                />
                <div>Personal Information:</div>
                <br />

                {identityScopes.length > 0 && 
                    <Grid>
                        {identityScopes}
                    </Grid>}
            </Form>
        );
    }
}

const ConsentScope = ({scope}) => {

    return (
        <Grid.Row>
            <Grid.Column>
                <Checkbox toggle defaultChecked />
            </Grid.Column>
            <Grid.Column width={8}>
                <ToggleBold
                    useBold={scope.required}
                >
                    {scope.displayName}
                </ToggleBold>
            </Grid.Column>
        </Grid.Row>
    );
};