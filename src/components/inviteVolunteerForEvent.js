import React from 'react'
import { Badge } from 'react-bootstrap'
import { NavDropdown, MenuItem } from 'react-bootstrap'

require('../css/inviteVolunteerForEvent.css')

const inviteVolunteerForEvent = () => { return(
	<div className="inviteVolunteerForEvent">
		<h3>Invite Volunteers For Events</h3>

		<NavDropdown eventKey={3} title="Choose event to add volunteers" id="chooseEventVolunteers">
			<MenuItem eventKey={3.1}>MLA Election</MenuItem>
			<MenuItem eventKey={3.2}>Haryana MCD</MenuItem>
			<MenuItem eventKey={3.3}>Gujrat State</MenuItem>
			<MenuItem divider />
			<MenuItem eventKey={3.4}>Center Election</MenuItem>
		</NavDropdown>

		<form>
			<label>Type the name and press enter to select</label>
			<div><input type="text" /></div>
			<button type="submit" className="btn btn-default">Resend invite</button>
    </form>
		
	</div>
) }

export default inviteVolunteerForEvent