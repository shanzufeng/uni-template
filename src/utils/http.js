import axios from 'axios';
const { VITE_APP_REQ_URL, VITE_APP_AXIOS_BASE_URL } = import.meta.env;
const getFullURL = (baseURL, url, params, paramsSerializer)=> {
	if (url.startsWith('http')) {
		return axios.getUri({ url, params, paramsSerializer });
	}
	baseURL = baseURL.endsWith('/') ? baseURL : `${baseURL}/`;
	url = url.startsWith('/') ? url.slice(1) : url;
	return axios.getUri({ url: `${baseURL}${url}`, params, paramsSerializer });
}
let baseURL;
// #ifdef H5
baseURL = VITE_APP_AXIOS_BASE_URL
// #endif
// #ifndef H5
baseURL = VITE_APP_REQ_URL + VITE_APP_AXIOS_BASE_URL
// #endif

export {
  baseURL,
  getFullURL
}
