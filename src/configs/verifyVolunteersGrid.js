function formatVerifyReinvite(obj, details){
  return `Verify | Reinvite`
}

const headers = {
  'name' : {
    "id" : "name",
    "label" : "Name",
    "sort" : true,
    "sorted" : true,
    "isHidden" : false,
    "width" : "20%"
  },
  'mobile' : {
    "id" : "mobile",
    "label" : "Mobile No.",
    "sort" : true,
    "isHidden" : false,
    "width" : "20%"
  },
  'email' : {
      "id" : "email",
      "label" : "Email",
      "sort" : true,
      "isHidden" : false,
      "width" : "20%"
  },
  'electionID' : {
      "id" : "electionID",
      "label" : "Election Id",
      "sort" : true,
      "isHidden" : false,
      "width" : "20%"
  },
  'verifyReinvite' : {
      "id" : "verifyReinvite",
      "label" : "Verify / Reinvite",
      "sort" : false,
      "isHidden" : false,
      "format" : formatVerifyReinvite,
      "width" : "20%"
  }
}

export default headers