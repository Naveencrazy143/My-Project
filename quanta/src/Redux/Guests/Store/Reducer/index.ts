import {
  RESET_GUEST,

  POST_TASK_BY_GUEST,
  POST_TASK_BY_GUEST_SUCCESS,
  POST_TASK_BY_GUEST_FAILURE,

  FETCH_GUEST_TASKS,
  FETCH_GUEST_TASKS_SUCCESS,
  FETCH_GUEST_TASKS_FAILURE,

  FETCH_GUEST_TASK_DETAILS,
  FETCH_GUEST_TASK_DETAILS_SUCCESS,
  FETCH_GUEST_TASK_DETAILS_FAILURE,

  SELECTED_GUEST_TASK_ITEM,

  CODE_OUTPUT_DATA,
  GUEST_TASK_CODE,

  FETCH_GUEST_TASK_DETAILS_OPEN,
  FETCH_GUEST_TASK_DETAILS_OPEN_SUCCESS,
  FETCH_GUEST_TASK_DETAILS_OPEN_FAILURE,


  FETCH_TASK_OBJECT,
  DOWNLOAD_TASK_TYPE
} from '../ActionTypes';

const initialState = {
  loading: false,
  guestTasks: [],
  guestTaskDetails: [],
  selectedGuestTask: [],
  codeOutputData: undefined,
  guestTaskCode: undefined,
  guestViewTaskDetails: undefined,
  downloadTaskType: undefined,
  getTaskObject: {},


};

const GuestReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case RESET_GUEST:
      state = initialState;
      break;

    /**
     * add task by guest
     */

    case POST_TASK_BY_GUEST:
      state = { ...state, loading: true };
      break;
    case POST_TASK_BY_GUEST_SUCCESS:
      state = { ...state };
      break;
    case POST_TASK_BY_GUEST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get task by guest
     */

    case FETCH_GUEST_TASKS:
      state = { ...state, loading: true };
      break;
    case FETCH_GUEST_TASKS_SUCCESS:
      state = { ...state, guestTasks: action.payload };
      break;
    case FETCH_GUEST_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get task by guest
     */

    case FETCH_GUEST_TASK_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_GUEST_TASK_DETAILS_SUCCESS:
      state = { ...state, guestTaskDetails: action.payload };
      break;
    case FETCH_GUEST_TASK_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * selected guest task item
     */


    case SELECTED_GUEST_TASK_ITEM:
      // console.log("andka", action.payload)
      state = { ...state, selectedGuestTask: action.payload };
      break;

    /**
   * code output data
   */
    case CODE_OUTPUT_DATA:
      state = { ...state, codeOutputData: action.payload };
      break;

    /**
*  guest task code 
*/


    case GUEST_TASK_CODE:
      console.log("action.payload", action.payload);

      state = { ...state, guestTaskCode: action.payload };
      break;


    /**
*  guest task code
*/

    case FETCH_GUEST_TASK_DETAILS_OPEN:
      state = { ...state, loading: true };
      break;
    case FETCH_GUEST_TASK_DETAILS_OPEN_SUCCESS:
      state = { ...state, guestViewTaskDetails: action.payload };
      break;
    case FETCH_GUEST_TASK_DETAILS_OPEN_FAILURE:
      state = { ...state, loading: false };
      break;



    /**
*  guest download task type
*/


    case DOWNLOAD_TASK_TYPE:
      console.log("action.payload", action.payload);

      state = { ...state, downloadTaskType: action.payload };
      break;

    /**
*  guest task download
*/


    case FETCH_TASK_OBJECT:
      console.log("action.payload", action.payload);

      state = { ...state, getTaskObject: action.payload };
      break;
    
      default:
      state = state;
      break;
  }



  return state;
};

export { GuestReducer };
