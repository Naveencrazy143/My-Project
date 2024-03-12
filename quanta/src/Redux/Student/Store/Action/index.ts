import {

  RESET_STUDENT,

  YOUTUBE_VIDEO_TITLE,

  FETCH_USER_DIGITAL_PROFILE,
  FETCH_USER_DIGITAL_PROFILE_SUCCESS,
  FETCH_USER_DIGITAL_PROFILE_FAILURE,

  POST_USER_DIGITAL_PROFILE,
  POST_USER_DIGITAL_PROFILE_SUCCESS,
  POST_USER_DIGITAL_PROFILE_FAILURE,

  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  SETTING_FLOW_DIAGRAM_IMAGE
} from '../ActionTypes';


///////////////////////  Version 2 ///////////////////////////////

export const resetStudentReducer = () => {
  return {
    type: RESET_STUDENT,
  }
}

/**
 * Setting Youtube video title
 */

export const settingYoutubeVideoTitle = (value: any) => {
  return {
    type: YOUTUBE_VIDEO_TITLE,
    payload: value,
  };
};

//get user digital profile

export const fetchUserDigitalProfile = (params) => {
  return {
    type: FETCH_USER_DIGITAL_PROFILE,
    payload: params,
  };
};

export const fetchUserDigitalProfileSuccess = (response) => {
  return {
    type: FETCH_USER_DIGITAL_PROFILE_SUCCESS,
    payload: response,
  };
};

export const fetchUserDigitalProfileFailure = (error) => {
  return {
    type: FETCH_USER_DIGITAL_PROFILE_FAILURE,
    payload: error,
  };
};



//Add user digital profile

export const addUserDigitalProfile = (params) => {
  return {
    type: POST_USER_DIGITAL_PROFILE,
    payload: params,
  };
};

export const addUserDigitalProfileSuccess = (response) => {
  return {
    type: POST_USER_DIGITAL_PROFILE_SUCCESS,
    payload: response,
  };
};

export const addUserDigitalProfileFailure = (error) => {
  return {
    type: POST_USER_DIGITAL_PROFILE_FAILURE,
    payload: error,
  };
};


//get user details

export const getUserDetails = (params) => {
  console.log("1111111111called");
  
  return {
    type: FETCH_USER_DETAILS,
    payload: params,
  };
};

export const getUserDetailsSuccess = (response) => {
  console.log("22222222222response",response);
  
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getUserDetailsFailure = (error) => {
  return {
    type: FETCH_USER_DETAILS_FAILURE,
    payload: error,
  };
};


// setting flowdiagram image

export const settingFlowDiagramImage = (response) => {
  console.log("responseee===>", response)
  return {
    type: SETTING_FLOW_DIAGRAM_IMAGE,
    payload: response,
  };
};