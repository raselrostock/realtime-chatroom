// Dom Queries
const chatList = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newUserForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms');

// Add a new chat 
newChat.addEventListener('submit',e=>{
	e.preventDefault();
	const message = newChat.message.value.trim();
	chatbox.addChat( message )
		.then(()=>{
			newChat.reset();
		})
		.catch(err=>console.log(err));
});

// Update User Name
newUserForm.addEventListener('submit', e =>{
	e.preventDefault();
	const newName = newUserForm.name.value.trim();
	chatbox.updateUsername( newName );
	newUserForm.reset();
	updateMssg.innerText = `Your name is:${newName}`;
	setTimeout(() => updateMssg.innerText ='',3000);
});

// Update the Chat Room 
rooms.addEventListener('click', (e) =>{
	if(e.target.tagName === 'BUTTON'){
		chatUI.clear();
		chatbox.updateRoom( e.target.getAttribute('id'));
		chatbox.getChats(chat => chatUI.render(chat));
	}
});
// Class Instance
const chatUI = new ChatUI(chatList);
const username = localStorage.username ? localStorage.username : 'Anonymous';
const chatbox = new ChatBox('general',username);

//Get Chats and render
chatbox.getChats(data=> chatUI.render(data));


