
import * as React from "react";
import { EvalIfFunction } from "../../Shared/Misc";

// Simple component that conditionally returns a component/text wrapped in bold
export const ConditionalBold: any = ({condition, children}: {condition: any, children: React.ReactElement}) => {

    if(EvalIfFunction(condition)) {
        return <b>{children}</b>;
    }
    return children;
};