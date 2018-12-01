// React Imports
import React from "react";

// CSS & Local Imports
import API from '../../../../../../../utils/API';
import EmployeeListItem from './EmployeeListItem';
import EmployeesSubHeader from '../../EmployeesSubHeader';
import "./ViewEmployees.css";
import MessageModal from '../../../../../components/MessageModal';

class ViewEmployees extends React.Component {
	
	state = {
		message: '',
		employees: [],
		selected: {
			all: false,
			active: true,
			inactive: false
		}
	};
	
	componentDidMount() {
		this.getEmployees();
	}

	getEmployees = () => {
		const query = {
			__organization: this.props.organization._id
		};
		API.auth.getUsers(query).then(res => {
			if(res.data.success) {
				console.log('Employees:', res.data.users);
				this.setState({ employees: res.data.users, message: '' });
			} else {
				this.setState({ message: res.data.msg });
			}
		}).catch(err => {
			console.log(err);
			
			this.setState({ message: 'Uh Oh! Something went wrong!' });
			
		});
	};
	
	switchTab = e => {
		const { selected } = this.state
		selected.all = selected.active = selected.inactive = false;
		selected[e.target.id] = true;
		this.setState({ selected: selected, message: '' });
	};
	
	searchEmployees = e => {
		e.preventDefault();
		console.log(e.target);
	};
	
	changeRole = (e, employee) => {
		e.preventDefault();
		if(employee.role >= 3) return this.setState({ message: 'Cannot change that user\'s permission level.' });
		if(employee.employeeActive) {
			employee.role = employee.role == 1 ? 2 : 1;
	// 		return alert(newRole);
			API.auth.update(employee).then(response => {
				if(response.data.success) {
	// 				alert(response.data.user.role);
					if(this.props.user._id == employee._id && employee.role == 1) return this.logout();
					this.getEmployees();
				} else {
					this.setState({ message: response.data.msg });
				}
			}).catch(err => {
				console.log(err);
				this.setState({ message: 'Uh Oh! Something went wrong!' });
			});
		} else {
			this.setState({ message: 'Must activate employee before changing permission levels.' });
		}
	};
	
	deactivateEmployee = (e, employee) => {
		e.preventDefault();
		if(employee.role >= 3) return this.setState({ message: 'Cannot deactivate that user.' });
		employee.role = 1;
		employee.previousActivationStatus = employee.active;
		employee.active = false;
		employee.employeeActive = false;
		API.auth.update(employee).then(response => {
			if(response.data.success) {
				if(this.props.user._id == employee._id) return this.logout();
				this.getEmployees();
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	reactivateEmployee = (e, employee) => {
		e.preventDefault();
		employee.active = employee.previousActivationStatus;
		employee.employeeActive = true;
		API.auth.update(employee).then(response => {
			if(response.data.success) {
				this.getEmployees();
			} else {
				this.setState({ message: response.data.msg });
			}
		}).catch(err => {
			console.log(err);
			this.setState({ message: 'Uh Oh! Something went wrong!' });
		});
	};
	
	logout = () => {
		localStorage.removeItem('jwtToken');
// 		window.location.href='/login';
		this.props.history.push(`/login`);
	};
	
	closeMessageModal = () => {
		this.setState({ message: '' })
	};
	
	render() {
		const { selected, employees, message } = this.state;
		let filteredEmployees = employees;
		if(selected.active) filteredEmployees = employees.filter(employee => employee.employeeActive);
		if(selected.inactive) filteredEmployees = employees.filter(employee => !employee.employeeActive);
		return (
			<div>
				<EmployeesSubHeader search={true} searchEmployees={this.searchEmployees} addEmployee={true} organization={this.props.organization} user={this.props.user} />
				{/*
					this.state.message !== '' &&
					<div>{this.state.message}</div>
				*/}
				{ message !== '' &&
					<MessageModal message={message} closeMessageModal={this.closeMessageModal} />
				}
				<div className='employeesNav-wrapper'>
					<span className={selected.all && 'employeesNav-selected'} id='all' onClick={this.switchTab}>All </span>| 
					<span className={selected.active && 'employeesNav-selected'} id='active' onClick={this.switchTab}>Active </span>| 
					<span className={selected.inactive && 'employeesNav-selected'} id='inactive' onClick={this.switchTab}>Inactive</span>
					<div className='employeeCount'>{filteredEmployees.length}</div>
				</div>
				<div className="row veiwEmployees-wrapper">
					<div className="col s12 m12 employee-padding">
							<ul className="collection z-depth-3">
								{filteredEmployees.map(employee =>
									<EmployeeListItem
										employee={employee}
										organization={this.props.organization}
										changeRole={this.changeRole}
										deactivateEmployee={this.deactivateEmployee}
										reactivateEmployee={this.reactivateEmployee}
									/>
								)}
							</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default ViewEmployees;