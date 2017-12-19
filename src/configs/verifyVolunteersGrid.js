function formatVerifyReinvite(obj, details){
  return `Reinvite`
}

const formatEmpty = function(obj, details){
  if(details.length === 0){
		return "-";
	}else{
    return details
  }
};

const headers = {
  'name' : {
    "id" : "name",
    "label" : "Mobile no.",
    "sort" : true,
    "sorted" : true,
    "isHidden" : false,
    "format" : formatEmpty,
    "width" : "20%"
  },
  'username' : {
    "id" : "username",
    "label" : "Name",
    "sort" : true,
    "isHidden" : false,
    "format" : formatEmpty,
    "width" : "20%"
  },
  'voterId' : {
    "id" : "voterId",
    "label" : "Election Id",
    "sort" : true,
    "isHidden" : false,
    "format" : formatEmpty,
    "width" : "20%"
  },
  'email' : {
    "id" : "email",
    "label" : "Email",
    "sort" : true,
    "isHidden" : false,
    "format" : formatEmpty,
    "width" : "20%"
  },
  'reinvite' : {
    "id" : "reinvite",
    "label" : "Reinvite",
    "sort" : false,
    "isHidden" : false,
    "format" : formatVerifyReinvite,
    "width" : "20%"
  }
}

export default headers