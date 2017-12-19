import { inviteeList } from '../promises'

const getInvites = function() {
  return(dispatch) => {
    return inviteeList().then((response) => {
        response.data.map((data) => {
          delete data.avatar
          data.reinvite = 'Reinvite'
        })
       dispatch({type: 'INVITES_GET', payload: response.data})
    }).catch(error => {
      throw(error);
    });
  }
}

const newInvite = function(invite) {
  return {type: 'NEW_INVITE', payload: invite}
}

export {
  getInvites
, newInvite
}