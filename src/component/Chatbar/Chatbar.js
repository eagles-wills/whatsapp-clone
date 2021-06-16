import { Avatar, IconButton } from "@material-ui/core";
import {
	AttachFile,
	InsertEmoticon,
	Mic,
	MoreVert,
	SearchOutlined,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase";
import Moment from "react-moment";
import { db } from "../../firebase";
import useStore from "../../store";
import "./Chatbar.css";
const Chatbar = () => {
	const [seed, setSeed] = useState("");
	const [messages, setMessages] = useState("");
	const [dbMessages, setDBMessages] = useState([]);
	const [roomName, setRoomName] = useState("");
	const { roomId } = useParams();
	const authUser = useStore((state) => state.user);
	useEffect(() => {
		db.collection("rooms")
			.doc(roomId)
			.onSnapshot((snapshot) => {
				console.log(snapshot.data().name);
				setRoomName(snapshot.data().name);
			});

		db.collection("rooms")
			.doc(roomId)
			.collection("messages")
			.orderBy("timestamp")
			.onSnapshot((snapshot) =>
				setDBMessages(snapshot.docs.map((doc) => doc.data())),
			);
	}, [roomId]);
	console.log(dbMessages);
	console.log(roomName);
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 1000));
	}, [roomId]);

	const handleSubmit = (e) => {
		e.preventDefault();
		db.collection("rooms").doc(roomId).collection("messages").add({
			name: authUser.user.displayName,
			message: messages,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setMessages("");
	};
	return (
		<div className='chatbar'>
			<div className='chatbar__header'>
				<Avatar
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<div className='chatbar__headerInfo'>
					<h3>{roomName}</h3>
					<p>
						Last seen{" "}
						{new Date(
							dbMessages[dbMessages.length - 1]?.timestamp?.toDate(),
						).toDateString()}
					</p>
				</div>
				<div className='chatbar__headerRight'>
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className='chatbar__body'>
				{dbMessages.map((message, i) => (
					<p
						className={`chatbar__message ${
							message.name === authUser.user.displayName &&
							"chatbar__receiver"
						}`}
						key={i}
					>
						<span className='chatbar__name'>{message.name}</span>
						{message.message}
						<span className='chatbar__timestamp'>
							{new Date(message.timestamp?.toDate()).toDateString()}
						</span>
					</p>
				))}
			</div>
			<div className='chatbar__footer'>
				<InsertEmoticon />
				<form onSubmit={(e) => handleSubmit(e)}>
					<input
						type='text'
						value={messages}
						onChange={(e) => setMessages(e.target.value)}
					/>
					<button>Send a message</button>
				</form>
				<Mic />
			</div>
		</div>
	);
};

export default Chatbar;
