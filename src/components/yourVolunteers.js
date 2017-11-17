import React from 'react'
import { Badge } from 'react-bootstrap'
require('../css/yourVolunteers.css')

const yourVolunteers = () => { return(
  <div className="yourVolunteer">
    <h3>Your Volunteers</h3>
    <p>Active <Badge>42</Badge></p>
    <p>In-Active <Badge>57</Badge></p>
    <p>Total Volunteers <Badge>99</Badge></p>
  </div>
) }

export default yourVolunteers