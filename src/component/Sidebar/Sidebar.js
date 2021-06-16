import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import useStore from "../../store";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat/SidebarChat";
const Sidebar = () => {
	const [rooms, setRooms] = useState([]);
	const authUser = useStore((state) => state.user);
	console.log(authUser.user);
	useEffect(() => {
		const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
			setRooms(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				})),
			),
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar src={authUser?.user.photoURL} />
				<div className='sidebar__headerRight'>
					<IconButton>
						<DonutLarge />
					</IconButton>
					<IconButton>
						<Chat />
					</IconButton>
					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>
			<div className='sidebar__search'>
				<div className='sidebar__searchContainer'>
					<SearchOutlined />
					<input type='text' placeholder='Search or start new chat' />
				</div>
			</div>
			<div className='sidebar__chats'>
				<SidebarChat addNewChat />
				{rooms.map((room) => (
					<SidebarChat key={room.id} name={room.data.name} id={room.id} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
