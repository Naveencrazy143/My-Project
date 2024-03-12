import {
  SHOW_LOADER, 
  HIDE_LOADER, 
  USER_LOGIN_DETAILS, 
  USER_DETAILS, 
  RESET_APP,SYNC_DETAILS, 
  GET_APP_CONFIG_DATA,
  WEB_APP_CONFIG,
  WEB_APP_CONFIG_SUCCESS,
  WEB_APP_CONFIG_FAILURE,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_STUDENT_TASK_DATA,
  FCM_TOKEN
} from '../ActionTypes';

export const resetAppReducer = () =>{
  return{
    type: RESET_APP,
  }
}

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const userLoginDetails = (params: any) => {
  return {
    type: USER_LOGIN_DETAILS,
    payload: params,
  };
};

export const userDetails = (params: any) => {
  return {
    type: USER_DETAILS,
    payload: params,
  };
};

export const syncDetails = (params: any) => {
  return {
    type: SYNC_DETAILS,
    payload: params,
  };
};

export const getAppConfigData = (params: any) => {
  return {
    type: GET_APP_CONFIG_DATA,
    payload: params,
  };
};

/**
 * web app config
 */

export const webAppConfig = (params: any) => {
  return {
    type: WEB_APP_CONFIG,
    payload: params,
  };
};

export const webAppConfigSuccess = (response: any) => {
  console.log("resssppp==>",response)
  return {
    type: WEB_APP_CONFIG_SUCCESS,
    payload: response,
  };
};

export const webAppConfigFailure = (response: any) => {
  return {
    type: WEB_APP_CONFIG_FAILURE,
    payload: response,
  };
};

/**
 * get notifications
 */

export const getNotifications = (params: any) => {
  return {
    type: GET_NOTIFICATIONS,
    payload: params,
  };
};

export const getNotificationsSuccess = (response: any) => {
  return {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: response,
  };
};

export const getNotificationsFailure = (response: any) => {
  return {
    type: GET_NOTIFICATIONS_FAILURE,
    payload: response,
  };
};

//view task details api id
export const getStudentTaskData = (response: any) => {
  return {
    type: GET_STUDENT_TASK_DATA,
    payload: response,
  };
};

//fcm token
export const getFcmToken = (response: any) => {
  return {
    type: FCM_TOKEN,
    payload: response,
  };
};