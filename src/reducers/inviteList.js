export default function (state = [], action){
	switch(action.type){
		case 'INVITES_GET' : 
			return action.payload;

		case 'NEW_INVITE' : 
			const allInvites = state.slice(0)
			allInvites.push(action.payload);
			return allInvites
		break;
	}

	return state
}