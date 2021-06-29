class FlashState {
	constructor() {
		this.state = {};
	}

	getFlash(key) {
		let value = this.state[key];
		this.deleteFlash(key);
		return value;
	}

	deleteFlash(key) {
		if (!this.state[key]) {
			return null;
		}

		delete this.state[key];
	}

	getVariant() {
		return Object.keys(this.state)[0];
	}

	setFlash(key, value) {
		this.state[key] = value;
	}
}

export default new FlashState();
