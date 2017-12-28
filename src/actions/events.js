import { getEvents } from '../promises'

const getAllEvents = function() {
  return(dispatch) => {
    return getEvents().then((response) => {
       dispatch({type: 'EVENTS_GET', payload: response.data})
    }).catch(error => {
      throw(error);
    });
  }
}

const createEventAction = function(data){
  return {type: 'EVENT_CREATE', payload: data}
}

export {
  getAllEvents
, createEventAction
}