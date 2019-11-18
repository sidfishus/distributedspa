// @flow

import axios from "axios";
import * as Oidc from "oidc-client";

//sidtodo change API path
export function CreateAPIURL(url:string, params: ?string = null) {
	return `http://localhost:5010/${url}${((params) ? `?${params}` : "")}`;
}

export function HttpGetJson(url:string) {
	return axios.get(url);
}

export function HttpPostJson(
	url:string,
	json: Object) {
	return axios.post(url,json);
}

const CreateAuthAxios = (user: Oidc.User) => {
	return axios.create({
		headers: {
			"Authorization" : "Bearer " + user.access_token
		}
	});
};

export const HttpAuthGetJson = (user: Oidc.User, url: string) => {
	const obj=CreateAuthAxios(user);

	return obj.get(url);
}

export function FormatHttpError(data:any) {
	let objType = typeof (data);
	if (objType === "object") {
		return JSON.stringify(data);
	} else {
		return data;
	}
}