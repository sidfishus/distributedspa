import * as React from "react";
import { EvalIfFunction } from "../../Shared/Misc";

export const ConditionalTransform : React.ReactNode =
    ({condition, transform, children}:
    {condition: any, transform: () => React.ReactNode, children: React.ReactElement}) => {
    
    if(EvalIfFunction(condition)) {
        return transform();
    }
    return children;
};