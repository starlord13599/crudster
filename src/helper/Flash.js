import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

export default class Flash extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true,
		};
		this.onClose = this.onClose.bind(this);
	}

	onClose() {
		this.props.onClose();
	}

	render() {
		if (this.state.show) {
			return (
				<div>
					<Alert
						style={{ marginBottom: 0 }}
						variant={this.props.variant}
						dismissible
						onClose={this.onClose}
					>
						{this.props.message}
					</Alert>
				</div>
			);
		}
		return null;
	}
}
