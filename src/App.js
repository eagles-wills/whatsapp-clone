import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Chatbar, Login, Sidebar } from "./component";
import "./App.css";
import useStore from "./store";

const App = () => {
	const authUser = useStore((state) => state.user);

	return (
		<Router>
			<div className='app'>
				{!authUser ? (
					<Login />
				) : (
					<div className='app__body'>
						<Sidebar />
						<Switch>
							<Route exact path='/' component={Chatbar} />
							<Route exact path='/rooms/:roomId' component={Chatbar} />
						</Switch>
					</div>
				)}
			</div>
		</Router>
	);
};

export default App;
