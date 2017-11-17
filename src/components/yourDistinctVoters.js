import React from 'react'
import { Badge } from 'react-bootstrap'
require('../css/yourDistinctVoters.css')

const yourDistinctVoters = () => { return(
  <div className="yourDistinctVoters">
    <h3>Your distinct voters</h3>
    <p><Badge>252</Badge></p>
  </div>
) }

export default yourDistinctVoters