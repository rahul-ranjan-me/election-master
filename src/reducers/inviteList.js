export default function (state = null, action){
	switch(action.type){
		case 'INVITES_GET' : 
			return action.payload

		case 'NEW_INVITE' : 
			const data = action.payload
			delete data.avatar
          	data.reinvite = 'Reinvite'
			const allInvites = state.slice(0)
			allInvites.push(action.payload);
			return allInvites
		break;
	}
	return state
}