// @flow

import axios from "axios";

//sidtodo change API path
export function CreateAPIURL(url:string, params: ?string = null) {
	return `http://localhost:5010/${url}${((params) ? `?${params}` : "")}`;
}

export function HttpGetJson(url:string) {
	return axios.get(url);
}

export function HttpPostJson(
	url:string,
	json: object) {
	return axios.post(url,json);
}

export function FormatHttpError(data:any) {
	let objType = typeof (data);
	if (objType === "object") {
		return JSON.stringify(data);
	} else {
		return data;
	}
}