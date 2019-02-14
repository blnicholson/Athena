import axios from 'axios';

export default {
	register: (user) => {
		return axios.post('/API/auth/register', user);
	},
	login: (username, password) => {
		return axios.post('/API/auth/login', { username, password });
	},
	getUsers: (params = {}) => {
		return axios.get('/API/auth/users', { params });
	},
	findById: (params = {}) => {
		return axios.get('/API/auth/user', { params });
	},
	update: user => {
		return axios.put('/API/auth/user', user);
	},
	addTrainingToExistingUsers: training => {
		return axios.put('/API/auth/users', training);
	},
	addTrainingInstances: (id, trainingInstancesArr) => {
		return axios.put('/API/auth/addtrainings', { userID: id, trainingInstances: trainingInstancesArr });
	},
	addTrainingInstance: (id, trainingInstance) => {
		return axios.put()
	},
	addTrainingHours: data => {
		return axios.put('/API/auth/addhours', data);
	},
	search: (organizationID, queryString) => {
		const query = { organizationID: organizationID, queryString: queryString };
		return axios.post('/API/auth/search',  query );
	},
	wildcardSearch: (organizationID, queryString) => {
		const query = { organizationID: organizationID, queryString: queryString };
		return axios.post('/API/auth/wildcard', query );
	},
	test: (newEmployee, cb) => {
		cb(newEmployee);
	}
};