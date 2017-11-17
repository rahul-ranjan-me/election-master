import React from 'react'
import { Badge } from 'react-bootstrap'
require('../css/eventParticipated.css')

const eventParticipated = () => { return(
  <div className="eventParticipated">
    <h3>Event Participated</h3>
    <p><Badge>42</Badge></p>
  </div>
) }

export default eventParticipated