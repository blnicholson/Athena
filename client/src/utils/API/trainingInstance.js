import axios from 'axios';

export default {
	getTrainingInstances: (params = {}) => {
		return axios.get('/API/traininginstances', { params });
	},
	create: trainingInstance => {
		return axios.post('/API/traininginstances', trainingInstance);
	},
	update: (trainingInstance) => {
		return axios.put('/API/traininginstances/' + trainingInstance._id, trainingInstance);
	},
	addDocument: (id, document) => {
		return axios.put('/API/traininginstances/' + id, { $push: { documents: document }});
	}
};