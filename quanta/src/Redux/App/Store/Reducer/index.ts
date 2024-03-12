import {
  SHOW_LOADER,
  HIDE_LOADER,
  USER_LOGIN_DETAILS,
  USER_DETAILS,
  RESET_APP,
  SYNC_DETAILS,
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
import { AppStateProp } from '../../Interfaces';

const initialState: AppStateProp = {
  loading: false,
  userLoggedIn: false,
  loginDetails: undefined,
  userDetails: undefined,
  isSync: { courseTopics: false, course: false, pageSection: false },
  appConfigData: {},
  webConfig: {},
  notificationDetails: [],
  studentTaskData: undefined,
  numOfPages: 0,
  currentPage: 1,
  token: undefined
};

const AppReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case RESET_APP:
      state = initialState;
      break;

    case SHOW_LOADER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case HIDE_LOADER:
      state = {
        ...state,
        loading: false,
      };
      break;
    case USER_LOGIN_DETAILS:
      state = {
        ...state,
        loginDetails: { ...state.loginDetails, ...action.payload },
      };
      break;

    case USER_DETAILS:
      state = {
        ...state,
        loginDetails: { ...state.userDetails, ...action.payload },
      };
      break;

    case SYNC_DETAILS:
      state = {
        ...state,
        isSync: action.payload
      };
      break;

    case GET_APP_CONFIG_DATA:
      state = {
        ...state,
        appConfigData: action.payload
      };
      break;

    /**
    * web app config
    */

    case WEB_APP_CONFIG:
      state = { ...state, loading: true };
      break;
    case WEB_APP_CONFIG_SUCCESS:
      state = { ...state, webConfig: action.payload };
      break;
    case WEB_APP_CONFIG_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get notifications
    */

    case GET_NOTIFICATIONS:
      state = {
        ...state,
        numOfPages: 0,
        currentPage: 1, 
        notificationDetails: []
      };
      break;
    case GET_NOTIFICATIONS_SUCCESS:
      // console.log("succucaction===>", action.payload)
      const dataSet = action.payload
      // console.log("datattasettt==>", dataSet)
      state = {
        ...state,
        notificationDetails: dataSet.data,
        numOfPages: dataSet.num_pages,
        currentPage:
          dataSet.next_page === -1
            ? dataSet.num_pages
            : dataSet.next_page - 1,
      };
      break;
    case GET_NOTIFICATIONS_FAILURE:
      state = { ...state, loading: false };
      break;

    //view task details id
    case GET_STUDENT_TASK_DATA:
      state = { ...state, studentTaskData: action.payload };
      break;

    //get fcm token
    case FCM_TOKEN:
      state = { ...state, token: action.payload };
      break;

    default:
      state = state;
      break;
  }

  return state;
};

export { AppReducer };
