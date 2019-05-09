class ChatBox{
	constructor( room, username ){
		this.room = room;
		this.username = username;
		this.chats = db.collection('chats');
		this.unsubscribe;
	}

	async addChat( message ){
		const now = new Date();
		const chat = {
			message,
			room : this.room,
			username: this.username,
			created_at: firebase.firestore.Timestamp.fromDate(now)
		};

		const response = await this.chats.add(chat);
		return response;
	}

	getChats( callback ){
		this.unsubscribe = this.chats
		.where('room','==', this.room)
		.orderBy('created_at')
		.onSnapshot( (snapshot) =>{
			snapshot.docChanges().forEach( (change) =>{
				if(change.type === 'added'){
					callback(change.doc.data());
				}
			});
		});
	}

	updateUsername( username ){
		this.username = username;
		localStorage.setItem('username',username); 
	}

	updateRoom( room ){
		this.room = room;
		if( this.unsubscribe ){
			this.unsubscribe();
		}
	}
}