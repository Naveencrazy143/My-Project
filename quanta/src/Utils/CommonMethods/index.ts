
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER } from '@Services';
import moment from 'moment';



export const showToast = (type: 'success' | 'error' | 'default' | 'info', message: string) => {

  const style: object = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored"
  }

  let toastElement: string | number | null = null;
  switch (type) {
    case 'success':
      toastElement = toast.success(message, style)
      break;
    case 'error':
      toastElement = toast.error(message, style)
      break;
    case 'info':
      toastElement = toast.info(message, style)
      break;
    default:
      toastElement = toast(message, style)
      break;
  }

  return toastElement;
}

export function getImageUrl(url) {

  if (url) {
    if (url.substring(0, 5) === 'https') {
      return url
    }
    else {
      return SERVER + url
    }
  }
}

export function ifObjectExist(value: object) {
  let is_valid = true;
  console.log("ifObjectExist(validation)", Object.keys(value).length);

  if (Object.keys(value).length !== 0) {
    is_valid = false;
  }
  return is_valid;
}

export function convertToUpperCase(data: string) {
  let toUpperCase = data?.charAt(0).toUpperCase() + data?.slice(1);
  return toUpperCase
}

export const filteredDescription = (value: string) => {
  if (value.length > 57) {
    return value.substring(0, 57) + '...';
  }
  else {
    return value
  }
}

export const filteredName = (value: any, length) => {
  if (value?.length > length) {
    return value.substring(0, length).trim() + '...';
  }
  else {
    return value
  }
}

export const getObjectFromArrayByKey = (array: any, key: string, value: any) => {
  return array.find(item => {
    return item[key] === value;
  });
};

export const ImageToBase64 = async (imageUrl: any) => {
  const response = await fetch(imageUrl);
  const data = await response.blob();
  const reader = new FileReader();
  reader.readAsDataURL(data);
  reader.onloadend = () => {
    return reader.result;
  }
}

export function base64ToImage(base64) {
  const img = new Image();
  img.src = "data:image/png;base64," + base64;
  return img;
}


/**
 * timeline time difference
 */


export function getTimelineRelativeTimeFormat(date: Date | null | undefined): string {
  if (!date) {
    return '';
  }
  const now = new Date();
  const dateString = date;
  const dates = new Date(dateString);
  const timestamp = dates.getTime();

  const diff = now.getTime() - timestamp

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);


  if (seconds < 60) {
    if (seconds <= 1) {
      return 'now'
    }
    else {
      return `${seconds} secs ago`;
    }
  } else if (minutes < 60) {
    return `${minutes} ${minutes > 1 ? 'mins' : 'min'} ago`;
  } else if (hours < 24) {
    return ` ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
  } else if (days < 7) {
    return `${days} ${days > 1 ? 'days' : 'day'} ago`;
  } else if (weeks < 4) {
    return `${weeks} ${weeks > 1 ? 'weeks' : 'week'} ago`;
  } else if (months < 12) {
    return `${months <=1 ? 1 : months} ${months > 1 ? 'months' : 'month'} ago`;
  } else {
    return `${years} ${years > 1 ? 'years' : 'year'} ago`;
  }
}


export const displayDate = (inputDate: any) => {
  const today = new Date();
  const date = new Date(inputDate);

  if (isNaN(date.getTime())) {
    return ''; // invalid date
  }

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);
  if (date >= oneWeekAgo) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    if (dayOfWeek) {
      return dayOfWeek;
    }
    return ''; // invalid day of week
  }

  const options: any = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}







//to remove code from names
export const removeCodeFromName = (value: string) => {
  const bracketIndex = value.indexOf('(')
  const finalString = value.substring(0, bracketIndex).trim()
  return finalString
}

// bulk upload

export const downloadFile = (response) => {
  fetch(response)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'file_name';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
}

export const urlDownloader = (url: any) => {
  const link = document.createElement('a');
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// to disable copy and paste, right click and drag and drop
// Define the event listener functions outside of disableCopyRightClickDnd
const disableContextMenu = (e) => { // right-click
  e.preventDefault();
};

const disableCodeEditor = (e) => { // disable code editor
  e.preventDefault();
}

const disableCopyPaste = (e) => { // copy and paste 
  if (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "C" || e.key === "V")) {
    e.preventDefault();
  }
};

const disableDragStart = (e) => {
  e.preventDefault();
};

const disableDrop = (e) => {
  e.preventDefault();
};


// const editor = document.getElementById("my-code-editor");

//   editor.addEventListener("contextmenu", function(event) {
//     event.preventDefault();
//   });

export const disableCopyRightClickDnd = (value) => {
  if (value) {
    // Add the event listeners
    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableCopyPaste);
    document.addEventListener("dragstart", disableDragStart);
    document.addEventListener("dragover", disableDrop);
    document.addEventListener("drop", disableDrop);
    document.addEventListener('my-code-editor', disableCodeEditor)
  } else {
    // Remove the event listeners
    document.removeEventListener("contextmenu", disableContextMenu);
    document.removeEventListener("keydown", disableCopyPaste);
    document.removeEventListener("dragstart", disableDragStart);
    document.removeEventListener("dragover", disableDrop);
    document.removeEventListener("drop", disableDrop);
    document.removeEventListener('my-code-editor', disableCodeEditor)
  }
};

/**
 * Saga Error Handler
 */

export const sagaErrorHandler = (response: any) => {
  let response_s = { ...response }
  if(response_s?.code === "ERR_BAD_RESPONSE"){
    showToast("error", "Something went wrong!")
  }
 else if (!response_s?.error_message) {
    response_s = {
      code: response_s?.code,
      error_message: response_s.message
    }
    showToast('error', response_s.error_message)
  }
  return response_s
}

/**
 * minimum 18 years old
 */


export const isMinimumPeriodElapsed = (date: string, age: number, periodType: any): boolean => {
  const selectedDate = moment(date);
  const currentDate = moment();

  const diffInYears = currentDate.diff(selectedDate, periodType);
  return diffInYears >= age;
}


export const gettingWeekDaysById = (array: any, key: string, value: string) => {
  return array.find((item: any) => {
    return item[key] === value;
  });
};

export function convertTo24Hour(s: any) {
  console.log("ssssssssss",s);
  
  let AMPM = s.slice(-2);
  let formattedTime = s.slice(0, -2).split(":")[0].length === 1 ? "0" + s.slice(0, -2).split(":")[0] : s.slice(0, -2).split(":")[0]
  let timeArr = s.slice(0, -2).split(":");
  let convertedTime = [formattedTime, timeArr[1]]
  if (AMPM === "AM" && convertedTime[0] === "12") {
    convertedTime[0] = "00";
  } else if (AMPM === "PM") {
    convertedTime[0] = (convertedTime[0] % 12) + 12
  }
  return convertedTime?.join(":");
}



const dt = new Date();

export  function getDate(time: any) {
    const start = time?.split(':');
    return new Date(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      parseInt(start[0]),
      parseInt(start[1]),
      // parseInt(start[2]),
    );
  }

export  function dateRangeOverlaps(
    a_start: any,
    a_end: any,
    b_start: any,
    b_end: any,
  ) {

    if (a_start < b_start && b_start < a_end) {
      return true;
    } // b starts in a
    if (a_start < b_end && b_end < a_end) {
      return true;
    } // b ends in a
    if (b_start < a_start && a_end < b_end) {
      return true;
    } // a in b
    return false;
  }


 export const generateUUID = () => {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); // use high-precision timer if available
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }

  export const convertDurationToTime = (durationString: string) => {
    const durationArray = durationString.split(' ');
  
    let totalDurationInMinutes = 0;
  
    durationArray.forEach((duration) => {
      if (duration === 'min') {
        totalDurationInMinutes += parseInt(durationArray[durationArray.indexOf(duration) - 1]);
      } else if (duration === 'hr') {
        totalDurationInMinutes += parseInt(durationArray[durationArray.indexOf(duration) - 1]) * 60;
      }
    });
  
    const formattedDuration = `${totalDurationInMinutes.toString().padStart(2, '0')}:00`;
  
    return formattedDuration;
  };


  export const convertTimeToDisplayTimeFormat = (timeStr) =>{

    // ex(5 min 2 sec) format

    if(timeStr){
      const timeParts = timeStr.split(':');
      const hours = Math.floor(parseInt(timeParts[0]) / 60);
      const minutes = parseInt(timeParts[0]) % 60;
      const seconds = parseInt(timeParts[1]);
      const timeFormatted = `${hours > 0 ? hours + ' hour ' : ''}${minutes} min ${seconds} sec`;
      return timeFormatted
    }
   
  }

  //notification get device informations
  
  export const getDeviceInfo = () => {
    const userAgent = navigator.userAgent;
  
    const platform = navigator.platform;
    const regex = /(([^)]+))/;
    const match = regex.exec(userAgent);
    let brand
    let model
    if (match && match.length > 1) {
      const deviceInfo = match[1].split(';');
      brand = deviceInfo[0].trim();
      model = deviceInfo[1].trim();
    }
    return { brand, model, platform }
  }


 export const getSocialMediaIcon = (code) => {

    let icon: any = {}

    switch (code) {
        case 'FB':
            icon = { class: 'btn-icon-only rounded-circle btn btn-facebook', icon: 'fab fa-facebook' }
            break;

        case 'GL':
            icon = { class: 'btn-icon-only rounded-circle btn-google-plus', icon: 'fab fa-google-plus-g' }
            break;

        case 'LN':
            icon = { class: 'btn-icon-only rounded-circle btn btn-facebook', icon: 'bi bi-linkedin' }
            break;

        case 'IM':
            icon = { class: 'btn-icon-only rounded-circle btn btn-youtube', icon: 'fab fa-instagram' }
            break;

        case 'TR':
            icon = { class: 'btn-icon-only rounded-circle btn btn-twitter', icon: 'fab fa-twitter' }
            break;

        case 'DE':
            icon = { class: 'btn-icon-only rounded-circle btn btn-global', icon: 'ni ni-world-2' }
            break;
    }
    return icon
}


// export const toggleSideNav = () => {
//   let boolean = true

//   if (document.body.classList.contains('g-sidenav-pinned')) {
//     document.body.classList.remove('g-sidenav-pinned');
//     document.body.classList.add('g-sidenav-hidden');
//   }
//   else {
//     document.body.classList.add('g-sidenav-pinned');
//     document.body.classList.remove('g-sidenav-hidden');
//   }
//   boolean=!boolean

//   return boolean
  
// };




