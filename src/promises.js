import axios from 'axios'
import config from './config'

const login = function(data){
  return postCall('/users/login', data, false)
}

const userDetails = function(){
  return getCall('/users/me', true)
}

const signup = function(data){
  return postCall('/users/register', data, false)
}

const inviteeList = function(){
  return getCall('/users/invite', true)
}

const addInvitee = function(data){
  return postCall('/users/invite', data, true)
} 

const postCall = function(url, data, token){
  const axiosData = {
    url: `${config.apiBaseURL}${url}`
  , method: 'post'
  , responseType : 'json'
  , data: data
  }

  if(token){
    axiosData.headers = {
      'Authorization' : token ? 'Token '+config.getToken() : null
    }
  }

  return axios(axiosData)
}

const getCall = function(url, token){
  const axiosData = {
    url: `${config.apiBaseURL}${url}`
  , method: 'get'
  , responseType : 'json'
}

  if(token){
    axiosData.headers = {
      'Authorization' : token ? 'Token '+config.getToken() : null
    }
  }

  return axios(axiosData)
}

export {
  login
, signup
, inviteeList
, addInvitee
, userDetails
}