const express = require('express');
const { sequelize, Heros } = require('./models');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/heros', async (req, res, next) => {
	try {
		let heros = await Heros.findAll();

		res.status(200).json({ success: true, data: heros });
	} catch (error) {
		next(error);
	}
});

app.post('/add-hero', async (req, res, next) => {
	let { name, age, superpower, status, id } = req.body;

	try {
		let [, isCreated] = await Heros.upsert({
			name,
			age,
			superPower: superpower,
			isAlive: status,
			id,
		});

		let message = isCreated ? 'added' : 'updated';

		res.status(200).json({ message: `Hero was ${message} successfully` });
	} catch (error) {
		error.message = 'Hero was not added';
		next(error);
	}
});

app.get('/hero/:id', async (req, res, next) => {
	try {
		let id = parseInt(req.params.id);

		const hero = await Heros.findByPk(id);

		res.status(200).json({ data: hero });
	} catch (error) {
		next(error);
	}
});

app.delete('/delete-hero/:id', async (req, res, next) => {
	try {
		let id = parseInt(req.params.id);
		let result = await Heros.destroy({ where: { id: id } });

		let message = result ? 'Hero was deleted successfully' : 'Unable to delete hero';

		res.status(200).json({ success: result, message: message });
	} catch (error) {
		error.message = 'Unable to delete hero';
		next(error);
	}
});

app.use((err, req, res, next) => {
	res.status(400).json({ success: false, message: err.message });
});

app.listen(port, async () => {
	try {
		await sequelize.authenticate();
		console.log('Database connected');
		console.log(`app listening on port 3001!`);
	} catch (error) {
		console.log('Database connection not successfull');
		console.error(error.message);
		process.exit(1);
	}
});
