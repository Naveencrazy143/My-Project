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

  SETTING_FLOW_DIAGRAM_IMAGE,


} from '../ActionTypes';
import { StudentStateProp } from '../../Interfaces';

const initialState: StudentStateProp = {
  youtubeVideoTitle: '',
  userDigitalProfileDetails: undefined,
  userProfileDetails: undefined,
  flowDiagramImageUrl: ''
};

const StudentReducer = (state = initialState, action: any) => {

  ///////////////////////  Version 2 ///////////////////////////////

  switch (action.type) {

    /**
    * reset reducer
    */
    case RESET_STUDENT:
      state = initialState;
      break;
    // case RESET_DASHBOARD:
    //   state = initialState;
    //   break;

    /**
    *Setting youtube video title
    */
    case YOUTUBE_VIDEO_TITLE:

      state = { ...state, youtubeVideoTitle: action.payload };
      break;


    //get user digital profile details

    case FETCH_USER_DIGITAL_PROFILE:
      state = { ...state };
      break;
    case FETCH_USER_DIGITAL_PROFILE_SUCCESS:
      state = { ...state, userDigitalProfileDetails: action.payload };
      break;
    case FETCH_USER_DIGITAL_PROFILE_FAILURE:
      state = { ...state };
      break;

    //Add user digital profile details

    case POST_USER_DIGITAL_PROFILE:
      state = { ...state };
      break;
    case POST_USER_DIGITAL_PROFILE_SUCCESS:
      state = { ...state };
      break;
    case POST_USER_DIGITAL_PROFILE_FAILURE:
      state = { ...state };
      break;

    //Get user profile details

    case FETCH_USER_DETAILS:
      state = { ...state };
      break;
    case FETCH_USER_DETAILS_SUCCESS:
      console.log("action.payload ==>",action.payload );
      
      state = { ...state, userProfileDetails: action.payload };
      break;
    case FETCH_USER_DETAILS_FAILURE:
      state = { ...state };
      break;

      // setting flowdiagram image

      case SETTING_FLOW_DIAGRAM_IMAGE:
      console.log("action.payload ==>",action.payload );
      
      state = { ...state, flowDiagramImageUrl: action.payload };
      break;


    default:
      state = state;
      break;
  }

  return state;
};

export default StudentReducer;
