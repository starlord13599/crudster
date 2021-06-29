import React, { Component } from 'react';
import { Col, Alert, Row, Button, Form, Container } from 'react-bootstrap';
import './AddForm.css';
import addHeroSchema from '../../validations/add-hero-validation';
import FlashState from '../../helper/FlashState';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class AddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: {
				id: null,
				name: '',
				age: '',
				status: '',
				superpower: '',
			},
			error: '',
			showAlert: false,
			redirect: null,
			message: null,
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	onChange(e) {
		this.setState((st) => {
			return { formData: { ...st.formData, [e.target.name]: e.target.value } };
		});
	}

	onClose() {
		this.setState((st) => {
			return { showAlert: false };
		});
	}

	async onSubmit(e) {
		e.preventDefault();
		let { id, name, age, superpower, status } = this.state.formData;

		const { error, value } = addHeroSchema.validate({ name, age, superpower });
		if (error) {
			this.setState((st) => {
				return { error: error.message, showAlert: true };
			});
			return false;
		}

		const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/add-hero`, {
			...value,
			status,
			id,
		});

		if (response.status !== 200) {
			FlashState.setFlash('danger', response.data.message);
			this.setState((st) => {
				return { redirect: '/' };
			});
			return false;
		}

		if (response.status === 200) {
			FlashState.setFlash('success', response.data.message);
			this.setState((st) => {
				return { redirect: '/' };
			});
			return true;
		}
	}

	async componentDidMount() {
		let heroId = this.props.location.state || null;

		if (heroId) {
			let response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/hero/${heroId}`);
			let { id, name, isAlive, age, superPower } = response.data.data;
			console.log(isAlive);
			this.setState((st) => {
				return { formData: { name, status: isAlive, age, superpower: superPower, id } };
			});
		}
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />;
		}

		return (
			<Container className="AddForm">
				<h2>Add Heros</h2>
				<hr></hr>

				{this.state.showAlert && (
					<Alert variant="danger" onClose={this.onClose} dismissible>
						{this.state.error}
					</Alert>
				)}

				<Form onSubmit={this.onSubmit}>
					<Row className="AddForm-row">
						<Form.Group as={Col}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								name="name"
								value={this.state.formData.name}
								placeholder="Enter name of hero"
								onChange={this.onChange}
							/>
						</Form.Group>
					</Row>

					<Row className="AddForm-row">
						<Form.Group as={Col}>
							<Form.Label>Age</Form.Label>
							<Form.Control
								name="age"
								type="number"
								onChange={this.onChange}
								value={this.state.formData.age}
								placeholder="Enter Age"
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Status</Form.Label>
							<Form.Control
								onChange={this.onChange}
								value={this.state.formData.status}
								name="status"
								as="select"
							>
								<option value="null">Choose...</option>
								<option value={true}>Active</option>
								<option value={false}>Inactive</option>
							</Form.Control>
						</Form.Group>
					</Row>

					<Row className="AddForm-row">
						<Form.Group as={Col}>
							<Form.Label>Super Power</Form.Label>
							<Form.Control
								name="superpower"
								onChange={this.onChange}
								value={this.state.formData.superpower}
								placeholder="Enter super-ability of the hero"
							/>
						</Form.Group>
					</Row>

					<Row>
						<Button type="submit" className="AddForm-button" variant="primary" block>
							Add
						</Button>
					</Row>
				</Form>
			</Container>
		);
	}
}
