import { Route, Switch } from 'react-router-dom';
import './App.css';
import Grid from './app/grid/Grid';
import TopNavbar from './app/navbar/TopNavbar';
import AddForm from './app/addForm/AddForm';

function App() {
	return (
		<div>
			<TopNavbar></TopNavbar>

			<Switch>
				<Route exact path="/" component={Grid}></Route>
				<Route exact path="/add-hero" component={AddForm}></Route>
			</Switch>
		</div>
	);
}

export default App;
