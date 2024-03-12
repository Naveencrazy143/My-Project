import { RESET_GUEST,

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

  
  DOWNLOAD_TASK_TYPE,
  FETCH_TASK_OBJECT
} from '../ActionTypes';

export const resetGuestReducer = () =>{
  return{
    type: RESET_GUEST,
  }
}


/**
 * add task by guest
 */

export const postAddTaskByGuest = (params: any) => {
  return {
    type: POST_TASK_BY_GUEST,
    payload: params,
  };
};

export const postAddTaskByGuestSuccess = (response: any) => {
  return {
    type: POST_TASK_BY_GUEST_SUCCESS,
    payload: response,
  };
};

export const postAddTaskByGuestFailure = (response: any) => {
  return {
    type: POST_TASK_BY_GUEST_FAILURE,
    payload: response,
  };
};

/**
 * get guest tasks
 */

export const fetchGuestTasks = (params: any) => {
  return {
    type: FETCH_GUEST_TASKS,
    payload: params,
  };
};

export const fetchGuestTasksSuccess = (response: any) => {
  return {
    type: FETCH_GUEST_TASKS_SUCCESS,
    payload: response,
  };
};

export const fetchGuestTasksFailure = (response: any) => {
  return {
    type: FETCH_GUEST_TASKS_FAILURE,
    payload: response,
  };
};

/**
 * get guest task details
 */

export const fetchGuestTaskDetails = (params: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS,
    payload: params,
  };
};

export const fetchGuestTaskDetailsSuccess = (response: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchGuestTaskDetailsFailure = (response: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS_FAILURE,
    payload: response,
  };
};

//selected guest task item

export const selectedGuestTaskItem = (response: any) => {
  console.log("action",response);
  
  return {
    type: SELECTED_GUEST_TASK_ITEM,
    payload: response,
  };
};

//code output data

export const setCodeOutputData = (response: any) => {
  console.log("actionnn",response);
  
  return {
    type: CODE_OUTPUT_DATA,
    payload: response,
  };
};
// guest task code

export const setGuestTaskCode = (response: any) => {
  console.log("response action",response);
  
  return {
    type: GUEST_TASK_CODE,
    payload: response,
  };
};

// guest GET task code DETAILS


export const getGuestTaskDetailsOpen = (params: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS_OPEN,
    payload: params,
  };
};

export const getGuestTaskDetailsOpenSuccess = (response: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS_OPEN_SUCCESS,
    payload: response,
  };
};

export const getGuestTaskDetailsOpenFailure = (response: any) => {
  return {
    type: FETCH_GUEST_TASK_DETAILS_OPEN_FAILURE,
    payload: response,
  };
};


export const downloadTaskTYpe = (response: any) => {
  return {
    type: DOWNLOAD_TASK_TYPE,
    payload: response,
  };
};

export const fetchTaskObject = (response: any) => {
  return {
    type:FETCH_TASK_OBJECT,
    payload: response,
  };
};