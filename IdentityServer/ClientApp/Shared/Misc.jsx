
//TODO: put this in to a library
// Return a query string parameter value.
export const GetQSParamF: string => string = (location) => {
    const params=new URLSearchParams(location.search);
    return (paramName) => {
        const rv=params.get(paramName);
        return rv;
    };
}