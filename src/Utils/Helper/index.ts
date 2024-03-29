import { SERVER } from '@Services'
import moment from 'moment'

export const getPhoto = (photo: any) => (SERVER + photo)

export const handleEmailClick = (email: any) => {
  return (
    window.open(`mailto:${email}`)
  )
}

export const getDataAndTime = (time: any) => {
  return moment(time).format('MMMM Do YYYY, h:mm a')
}

export const getDateAndTime = (time: any) => {
  return moment(time).format('YYYY MMMM Do , h:mm a')
}

export function arrayOrderbyCreatedAt(array: any) {
  let modifiedArray = [];
  if (array && array.length > 0) {
    modifiedArray = array.sort((a: any, b: any) => {
      return a.created_at < b.created_at
        ? -1
        : a.created_at > b.created_at
          ? 1
          : 0;
    });
    return modifiedArray;
  }
}


export function arrayOrderbyDate(array: any, key: string, isReverse: boolean = false) {
  let modifiedArray = [];
  if (array && array.length > 0) {
    modifiedArray = array.sort((a: any, b: any) => {
      return a[key] < b[key]
        ? -1
        : a[key] > b[key]
          ? 1
          : 0;
    });
    if (isReverse) {
      modifiedArray = modifiedArray.reverse();
    }
    return modifiedArray;


  }
}
