export default function (state = {}, action){
	switch(action.type){
		case 'GET_USER_DETAILS' : 
			return action.payload
		
		break;
	}
	return state
}