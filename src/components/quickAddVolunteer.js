import React from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import Form from './form'
import BulkInvite from './bulkInvite'
import ResendInvite from './resendInvite'

require('../css/quickAddVolunteers.css')

const quickAddVolunteers = () => { 
  const metadata = [
    {
      'id' : 'name',
      'label' : 'Name',
      'type' : 'text',
      'value': ''
    },
		{
      'id' : 'email',
      'label' : 'Email',
      'type' : 'text',
      'value': ''
    },
    {
      'id' : 'mobile',
      'label' : 'Phone Number',
      'type' : 'text',
      'value': ''
    }	
	],

  dataStructure = {
    name: '',
    email: '',
    mobile: ''
  },

  submitData = (data) => {
    console.log(data)
  }

  return(
    <div className="quickAddVolunteers">
      <h3><Glyphicon glyph="plus" /> Add Volunteers</h3>

      <Grid>
        <Row>
          <Col md={4}>
            <h5>Add single volunteer</h5>
            <Form 
              metadata={metadata} 
              onSubmitData={submitData} 
              dataFormat = {dataStructure} 
              cssClassName="quick-invite-form" /> 
          </Col>
          <Col md={4}>
            <BulkInvite />
          </Col>
          <Col md={4}>
            <ResendInvite />
          </Col>
        </Row>
      </Grid>
    </div>
  ) 
}

export default quickAddVolunteers