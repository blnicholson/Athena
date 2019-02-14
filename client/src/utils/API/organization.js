import axios from 'axios';

export default {
	register: (organization) => {
		return axios.post('/API/organizations/register', { organization });
	},
	validate: (organization, owner) => {
		return axios.post('/APi/organizations/validate', { organization, owner });
	},
	addOwner: (organization, owner) => {
		return axios.post('/API/organizations/owner', { organization, owner });
	},
	update: (organization) => {
		return axios.put('/API/organizations', organization);
	}
};