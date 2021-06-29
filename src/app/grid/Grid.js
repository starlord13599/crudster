import axios from 'axios';
import React, { Component } from 'react';
import { Spinner, Table, Button } from 'react-bootstrap';
import './Grid.css';
import Flash from '../../helper/Flash';
import FlashState from '../../helper/FlashState';
import { Link } from 'react-router-dom';

export default class Grid extends Component {
	constructor(props) {
		super(props);
		this.state = { data: [], isLoading: true, flash: null, variant: null };
		this.onClose = this.onClose.bind(this);
	}

	async componentDidMount() {
		try {
			let { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/heros`);
			let variant = FlashState.getVariant() || null;
			let flash = FlashState.getFlash(variant) || null;

			this.setState((st) => {
				return {
					data: [...data.data],
					isLoading: false,
					variant: variant,
					flash: flash,
				};
			});
		} catch (error) {
			console.log(error.message);
		}
	}

	onClose() {
		this.setState((st) => {
			return { flash: null };
		});
	}

	async onClick(id) {
		const response = await axios.delete(
			`${process.env.REACT_APP_API_BASE_URL}/delete-hero/${id}`
		);

		if (response.data.success) {
			this.setState((st) => {
				return {
					flash: 'Hero deleted successsfully',
					variant: 'success',
					data: st.data.filter((h) => h.id !== id),
				};
			});
		}
	}

	render() {
		if (this.state.isLoading) {
			return (
				<div className="spinner-container">
					<Spinner animation="border" variant="warning" />
					<span className="spinner-text">Loading...</span>
				</div>
			);
		}

		return (
			<div>
				{this.state.flash && (
					<Flash
						variant={this.state.variant}
						message={this.state.flash}
						onClose={this.onClose}
					></Flash>
				)}
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Age</th>
							<th>Super Powers</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.data.map((hero) => {
							return (
								<tr key={hero.id}>
									<td>{hero.id}</td>
									<td>{hero.name}</td>
									<td>{hero.age}</td>
									<td>{hero.superPower}</td>
									<td>{hero.isAlive ? 'Yes' : 'No'}</td>
									<td>
										<Link
											to={{
												pathname: '/add-hero',
												state: hero.id,
											}}
										>
											<Button variant="info">Edit</Button>
										</Link>
										<Button
											variant="danger"
											onClick={this.onClick.bind(this, hero.id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}
