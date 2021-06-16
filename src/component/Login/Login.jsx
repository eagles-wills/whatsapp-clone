import React from "react";
import logo from "./logo/whatsapp.png";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import useStore from "../../store";
const Login = () => {
	const setUser = useStore((state) => state.setUser);
	const signIn = () => {
		console.log("login page");
		auth
			.signInWithPopup(provider)
			.then((result) => setUser(result.user))
			.catch((error) => error.message);
	};
	return (
		<div className='login'>
			<div className='login__container'>
				<img src={logo} alt='whatsapp' className='login__logo' />

				<div className='login__text'>
					<h1>Sign in to WhatsApp</h1>
				</div>
				<Button onClick={signIn} className='login__button'>
					Sign In With Google
				</Button>
			</div>
		</div>
	);
};

export default Login;
