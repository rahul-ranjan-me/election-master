import React from 'react'
require('../css/resendInvite.css')

const resendInvite = () => { return(
  <div className="resendInvite">
    <h5>Resend Invite</h5>
    <form>
        <label>Type the name and press enter to select</label>
        <div><input type="text" /></div>
        <button type="submit" className="btn btn-default">Resend invite</button>
    </form>
  </div>
) }

export default resendInvite