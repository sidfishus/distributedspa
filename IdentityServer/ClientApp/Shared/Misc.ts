
//TODO: put this in to a library
// Return a query string parameter value.
export const GetQSParamF = (location: any): (paramName: string) => string => {
    const params=new URLSearchParams(location.search);
    return (paramName: string) => {
        const rv=params.get(paramName);
        return rv;
    };
}

//TODO: put this in to a library
// If the value is a function, call it and return the value, otherwise return the value as is
export const EvalIfFunction: any = (scalarOrFunc: any) => {
    if(typeof(scalarOrFunc)==="function") {
        return scalarOrFunc();
    }
    return scalarOrFunc;
}