import * as React from "react";
import { EvalIfFunction } from "../../Shared/Misc";

export const ConditionalTransform = ({condition, transform, children}) => {
    if(EvalIfFunction(condition)) {
        return transform();
    }
    return children;
};