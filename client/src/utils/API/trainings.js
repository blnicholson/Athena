import axios from 'axios';

export default {
	getTrainings: (params = {}) => {
// 		console.log('getTrainings(params):', params);
		axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
		return axios.get('/API/trainings', { params });
	},
	addTraining: newTraining => {
		return axios.post('/API/trainings', newTraining);
	},
	findById: (params = {}) => {
// 		console.log('params:', params);
		return axios.get('/API/trainings/' + params.id, { params });
	},
	pagination: (organization, limit, offset) => {
		const params = {
			organization: organization._id,
			limit: limit,
			offset: offset
		}
// 		console.log('limit/offset', params);
		return axios.get('/API/trainings/pagination', { params });
	},
	update: training => {
		return axios.put('/API/trainings/' + training._id, training);
	},
	addDocument: (id, document) => {
		return axios.put('/API/trainings/' + id, { $push: { documents: document }});
	}
	
};