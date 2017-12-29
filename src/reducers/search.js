export default function (state = {}, action){
	switch(action.type){
		case 'SEARCHED_USER' : 
			return action.payload

		break;
	}
	return state
}