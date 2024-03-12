export interface AppStateProp {
  loading?: boolean;
  userLoggedIn?: boolean;
  loginDetails: any;
  userDetails:any;
  isSync: any;
  appConfigData: any;
  webConfig: any;
  notificationDetails: any;
  studentTaskData: any;
  numOfPages: number
  currentPage: number;
  token: any
}
