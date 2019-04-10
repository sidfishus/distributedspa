
import * as React from "react";

// Simple component that conditionally returns a component/text wrapped in bold
export const ToggleBold = (props) => {

    if(props.useBold) {
        return <b>{props.children}</b>
    }
    return inner;
};