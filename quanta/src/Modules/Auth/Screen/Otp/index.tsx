import React, { useEffect, useState } from "react";
import { OtpInput, Button, useKeyPress, AppLoader, Logo } from "@Components";
import { AuthContainer } from "@Modules";
import { useInput, useTimer, useNavigation } from "@Hooks";
import { OTP_RESEND_DEFAULT_TIME, BUSINESS, validate, OTP_RULES, ifObjectExist, USER_TOKEN, showToast } from "@Utils";
import { useSelector, useDispatch } from "react-redux";
import { otpRegister, validateRegisterUser, otpLogin, userLoginDetails, userDetails } from "@Redux";
import { AUTH_PATH } from '@Routes'
import { translate } from "@I18n";

function Otp() {
  const dispatch = useDispatch();
  const { registeredMobileNumber, language, validateUserBusinessResponse } = useSelector(
    (state: any) => state.AuthReducer
  );
  const { goTo } = useNavigation()
  const enterPress = useKeyPress('Enter')
  const [submitLoader, setSubmitLoader] = useState(false)



  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
  const otp1 = useInput("");


  // console.log(JSON.stringify(validateUserBusinessResponse));

  useEffect(() => {
    if (enterPress) {
      proceedOtpValidationApiHandler()
    }
  }, [enterPress])

  const proceedOtpResentApiHandler = () => {
    setSeconds(OTP_RESEND_DEFAULT_TIME);
    const params = {
      mobile_number: registeredMobileNumber,
      ln: language,
      app_user_type: BUSINESS,
    };
    // dispatch(validateRegisterUser({ params }));
  };


  const proceedOtpValidationApiHandler = () => {

    const finalOtp = otp1.value;

    const params = {
      mobile_number: registeredMobileNumber,
      otp: finalOtp,
    };

    const validation = validate(OTP_RULES, params);

    if (ifObjectExist(validation)) {
      if (validateUserBusinessResponse.success) {
        setSubmitLoader(true)

        dispatch(
          otpLogin({
            params,
            onSuccess: (response) => () => {
              setSubmitLoader(false)
              showToast('success', response?.details?.message)
   
              localStorage.setItem(USER_TOKEN, response.details.token);
              goTo(AUTH_PATH.SPLASH, true)
              dispatch(
                userLoginDetails({
                  ...loginDetails,
                  isLoggedIn: true,
                }),
              );
            },
            onError: (error) => () => {
              setSubmitLoader(false)
              showToast('error', error)
            },
          }),
        );
      } else {
        dispatch(
          otpRegister({
            params,
            onSuccess: (response: any) => () => {
              console.log("respoo===>", response)
            },
            onError: (error) => () => {
              console.log("errrr===>", error)
            },
          })
        );
      }

    } else {
      showToast('error', validation?.otp[0])
    }
  };

  return (
    <div className="py-3">
      {/* <AppLoader /> */}
      <AuthContainer>
        <div className="text-center pt-5 pb-3">
          <div className="mt--3">
            <Logo />
          </div>
          <div className="row justify-content-center align-items-center ">
            <OtpInput value={otp1.value} onChange={otp1.onChange} />
            {/* <OtpInput value={otp2.value} onChange={otp2.onChange} />
            <OtpInput value={otp3.value} onChange={otp3.onChange} />
            <OtpInput value={otp4.value} onChange={otp4.onChange} /> */}
          </div>
          <div className="mb-5">
            <small className="d-block">
              {translate("auth.haveNotReceivedTheVerificationCode")}
            </small>
            {seconds === 0 ? (
              <div onClick={proceedOtpResentApiHandler}>
                <span className="font-weight-600 pointer">{translate("common.resend")}</span>
              </div>
            ) : (
              <span className="font-weight-600 ml-1">
                {"00:" + (seconds < 10 ? "0" + seconds : seconds)}
              </span>
            )}
          </div>
          <div className="pt-3">
            <div className="">
              <Button
                block
                isLoading={submitLoader}
                size="md"
                text={translate("auth.verify")?.toUpperCase()}
                onClick={() => {
                  if (!submitLoader) {
                    proceedOtpValidationApiHandler()
                  }
                }}
              />
            </div>
          </div>
        </div>
      </AuthContainer>
    </div>

  );
}
export { Otp };
