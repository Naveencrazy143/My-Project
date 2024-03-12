import Live from "./Api/Live";
import { Card } from "./Api";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css'
function App() {

  const API_INSTANCES = [
    {
      "name": "EDAT_STAGING_BACKEND",
      "url": "http://103.118.188.135:8005/company/index"
    },
    {
      "name": "EDAT_STAGING_FRONTEND",
      "url": "http://103.118.188.135:3000/"
    },
    {
      "name": "TMS_STAGING_BACKEND",
      "url": "http://103.118.188.135:8004/company/index"
    },
    {
      "name": "TMS_STAGING_FRONTEND",
      "url": "http://103.118.188.135:3004/"
    }
  ]


  const [edatFrontendColor, setEdatFrontendColor] = useState('');
  const [edatBackendColor, setEdatBackendColor] = useState('');
  const [tmsFrontendColor, setTmsFrontendColor] = useState('');
  const [tmsBackendColor, setTmsBackendColor] = useState('');
  const [zenyqWebAuthColor, setZenyqWebAuthColor] = useState('');
  const [zenyqReportsColor, setZenyqReportsColor] = useState('');
  const [zenyqValidateUserWebColor, setZenyqValidateUserWebColor] = useState('');
  const [zenyqOnboardColor, setZenyqOnboardColor] = useState('');


  const EDAT_STAGING_FRONTEND_URL = "http://103.118.188.135:3000/"
  const EDAT_STAGING_BACKEND_URL = "http://103.118.188.135:8005/company/index";
  const TMS_STAGING_FRONTEND_URL = "http://103.118.188.135:3004/"
  const TMS_STAGING_BACKEND_URL = "http://103.118.188.135:8004/company/index"
  const ZENYQ_WEBAUTH_URL = "https://webauth.zenyq.com/"
  const ZENYQ_REPORTS_URL  = "https://reports.zenyq.com/"
  const ZENYQ_VALIDATE_USERS_WEB_URL  = "https://validateuserweb.zenyq.com/"
  const ZENYQ_ONBOARD_URL  = "https://onboard.zenyq.com/"



  useEffect(() => {
    ApiHandler()
  }, [])

  useEffect(() => {
      setInterval(ApiHandler,300000);
  },[])

  const ApiHandler = () => {
    EdatStagingFrontendApiHandler()
    EdatStagingBackendApiHandler()
    TmsStagingFrontendApiHandler()
    TmsStagingBackendApiHandler()
    ZenyqWebAuthApiHandler()
    ZenyqReportsApiHandler()
    ZenyqValidateUserWebApiHandler()
    ZenyqOnboardApiHandler()

  }


  const EdatStagingFrontendApiHandler = () => {
    axios.get(EDAT_STAGING_FRONTEND_URL).then((response) => {
      setEdatFrontendColor('green')
    }).catch((error) => {
      setEdatFrontendColor('red')

    });
  }

  const EdatStagingBackendApiHandler = () => {
    axios.get(EDAT_STAGING_BACKEND_URL).then((response) => {
      setEdatBackendColor('green')
    }).catch((error) => {
      setEdatBackendColor('red')
    });
  }

  const TmsStagingFrontendApiHandler = () => {
    axios.get(TMS_STAGING_FRONTEND_URL).then((response) => {
      setTmsFrontendColor('green')
    }).catch((error) => {
      setTmsFrontendColor('red')
    });
  }

  const TmsStagingBackendApiHandler = () => {
    axios.get(TMS_STAGING_BACKEND_URL).then((response) => {
      setTmsBackendColor('green')
    }).catch((error) => {
      setTmsBackendColor('red')
    });
  }

  const ZenyqWebAuthApiHandler = () => {
    axios.get(ZENYQ_WEBAUTH_URL).then((response) => {
      setZenyqWebAuthColor('green')
    }).catch((error) => {
      setZenyqWebAuthColor('red')

    });
  }

  const ZenyqReportsApiHandler = () => {
    axios.get(ZENYQ_REPORTS_URL).then((response) => {
      setZenyqReportsColor('green')
    }).catch((error) => {
      setZenyqReportsColor('red')
    });
  }
  
  const ZenyqValidateUserWebApiHandler = () => {
    axios.get(ZENYQ_VALIDATE_USERS_WEB_URL).then((response) => {
      setZenyqValidateUserWebColor('green')
    }).catch((error) => {
      setZenyqValidateUserWebColor('red')

    });
  }
  
  const ZenyqOnboardApiHandler = () => {
    axios.get(ZENYQ_ONBOARD_URL).then((response) => {
      setZenyqOnboardColor('green')
    }).catch((error) => {
      setZenyqOnboardColor('red')
    });
  }


  return (
    <div className="" >

      <h1 className="text-center"> API LOGS </h1>
      <div className="row mt-4 m-0">
        <div className="col-sm-4">
          <h4 className="text-center"> EDAT STAGING FRONTEND </h4>
          <div className="row justify-content-center align-items-center my-4 m-0">
            <div class="box">
              {

                edatFrontendColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                edatFrontendColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>

        </div>
        <div className="col-sm-4  ">
          <h4 className="text-center"> EDAT STAGING BACKEND  </h4>
          <div className="row justify-content-center align-items-center my-4 m-0">
            <div class="box">
              {

               edatBackendColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                edatBackendColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
        <div className="col-sm-4 ">
          <h4 className="text-center"> TMS STAGING FRONTEND </h4>
          <div className="row justify-content-center align-items-center my-4 m-0">
            <div class="box">
              {

                tmsFrontendColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                tmsFrontendColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

           </div>
        </div>
        <div className="col-sm-4">
          <h4 className="text-center"> TMS_STAGING_BACKEND </h4>
          <div className="row justify-content-center align-items-center my-4 m-0">
            <div class="box">
              {
                tmsBackendColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                tmsBackendColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
         <div className="col-sm-4">
          <h4 className="text-center"> ZENYQ WEBAUTH </h4>
          <div className="row justify-content-center align-items-center my-4 m-0"> 
            <div class="box">
              {
                zenyqWebAuthColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                zenyqWebAuthColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>


          </div>
        </div>
        <div className="col-sm-4">
          <h4 className="text-center"> ZENYQ REPORTS </h4>
          <div className="row justify-content-center align-items-center my-4 m-0"> 
             <div class="box">
              {
                zenyqReportsColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                zenyqReportsColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>
        </div> 
        <div className="col-sm-4">
          <h4 className="text-center"> ZENYQ VALIDATE USERS WEB </h4>
          <div className="row justify-content-center align-items-center my-4 m-0"> 
             <div class="box">
              {
                zenyqValidateUserWebColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                zenyqValidateUserWebColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>
        </div>
        <div className="col-sm-4 ">
          <h4 className="text-center"> ZENYQ ONBOARD </h4>
          <div className="row justify-content-center align-items-center my-4 m-0"> 
             <div class="box">
              {
                zenyqOnboardColor === "green" &&

                <div class="success alert">
                  <div class="alert-body">
                    Success !
                  </div>
                </div>
              }
              {
                zenyqOnboardColor === "red" &&
                <div class="error alert">
                  <div class="alert-body">
                    Error !
                  </div>
                </div>
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
