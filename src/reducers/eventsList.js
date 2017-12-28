export default function (state = null, action){
	switch(action.type){
		case 'EVENTS_GET' : 
			return action.payload

        case 'EVENT_CREATE' :
            state.myEvents[0].push(action.payload)
            return state
		break;
	}
	return state
}