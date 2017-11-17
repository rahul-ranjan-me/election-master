import React from 'react'
require('../css/bulkInvite.css')

const bulkInvite = () => { return(
  <div>
    <h5>Add bulk volunteer</h5>
    <p><a href="#">Please click here to download attach <u>format.xls</u> file<br /> and upload it in same format</a></p>
    <form className="upload-bulk">
      <div>
        <label>Upload your file</label>
        <input type="file" />
        <button type="submit" className="btn btn-default">Upload</button>
      </div>
    </form>
  </div>
) }

export default bulkInvite