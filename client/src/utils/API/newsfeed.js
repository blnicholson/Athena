import axios from 'axios';

export default {
	getNewsfeedItems: (params = {}) => {
		return axios.get('/API/newsfeed', { params });
	},
	create: newsfeedItem => {
		return axios.post('/API/newsfeed', newsfeedItem);
	},
	insertMany: newsfeedItems => {
		return axios.post('/API/newsfeed/_bulk', newsfeedItems);
	}
};