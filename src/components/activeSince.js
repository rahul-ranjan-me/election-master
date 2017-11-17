import React from 'react'
import { Badge } from 'react-bootstrap'
require('../css/activeSince.css')

const activeSince = () => { return(
  <div className="activeSince">
    <h3>Active Since</h3>
    <p><i>29-Sep-2017</i></p>
    <h3>Your current status</h3>
    <p><Badge>Active</Badge></p>
  </div>
) }

export default activeSince