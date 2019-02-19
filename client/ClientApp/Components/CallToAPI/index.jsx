// @flow

import * as React from "react";
import { Fragment } from "react";
import {  CreateAPIURL,HttpGetJson,FormatHttpError } from "../../Shared/http";
import { withRouter } from "react-router-dom";

type ICallToAPIProps = {
};

type ICallToAPIState = {
    errorMsg: ?string;

    // Requesting data?
    reqData: boolean;

    // Loaded data from the API
    loadedData: ?any;
};

const initialState : ICallToAPIState = {
    errorMsg: null,
    
    reqData: false,

    loadedData: null,
};

class CallToAPIComponent extends React.Component<ICallToAPIProps,ICallToAPIState>
{
    constructor(props)
    {
        super(props);
        this.state=initialState;
    }
    
    componentDidMount()
    {
        this.GetDataFromAPI();
    }

    GetDataFromAPI()
    {
        this.setState({
            reqData: true
        });
        const url=CreateAPIURL("TestAPI/TestAction");
        HttpGetJson(url).then((res) => {
            this.setState({
                errorMsg: null,
                loadedData: res.data,
                reqData: false
            });
        }).catch((res) => {
            this.setState(() => {
                return {
                    errorMsg: ((res.response.data)?res.response.data:res.message),
                    reqData: false
                };
            });
        });
    }

    render()
    {
        // Destructure state properties
        const { errorMsg, reqData,loadedData } = this.state;
        let jsx;
        if(errorMsg) {
            jsx=(
                <h1>Failed to get API data:<br/> {errorMsg}</h1>
            );
        }
        else if(reqData || !loadedData) {
            jsx=(
                <h1>Please be patient, loading data..</h1>
            );
        }
        else {
            const modelJsxArray=loadedData.map((val,index) => {
                return (
                    <Fragment>
                        {index>0 && <hr/>}
                        <h2>obj at index {index} =</h2>
                        <h2>property 1: {val.Property1}</h2>
                        <h2>property 2: {val.Property2}</h2>
                    </Fragment>
                );
            });

            jsx=(
                <Fragment>
                    <h1>Data is loaded:</h1>
                    <br/>
                    {modelJsxArray}
                </Fragment>
            );
        }

        return jsx;
    }
}

export default withRouter(CallToAPIComponent);