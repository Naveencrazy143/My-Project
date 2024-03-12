import React, { useEffect, useState } from "react";
import { Card, Input, Button, H, Logo, Radio, useKeyPress, AppLoader, Modal } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, ERROR_MESSAGE_ALERT, validate, MOBILE_NUMBER_RULES, ifObjectExist } from "@Utils";
import { useInput, useModal, useNavigation } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ValidateUserBusiness } from "@Services";
import { AuthContainer, UserValidateBusinessModal } from "@Modules";
import { AUTH_PATH, ROUTES } from '@Routes'
import { showToast } from '@Utils'

import {
  validateUserBusiness,
  clearValidateUserBusiness,
  setRegisteredMobileNumber,
  setLanguage,
  validateRegisterUser,
} from "@Redux";
import { GetToken } from "../../../../FirebaseMessaging/GetToken";
import { FCM_TOKEN } from "@Utils";

function Login() {

  const fcmTokenValue = localStorage.getItem(FCM_TOKEN)


  const { goTo } = useNavigation()
  const mobileNumber = useInput("");
  const dispatch = useDispatch();
  const enterPress = useKeyPress('Enter')
  const [submitLoader, setSubmitLoader] = useState(false)
  const [guestModal, setGuestModal] = useState(false)


  const { language } = useSelector(
    (state: any) => state.AuthReducer
  );

  useEffect(() => {
    if (enterPress) {
      validateUserBusinessApiHandler()
    }
  }, [enterPress])

  const validateUserBusinessApiHandler = () => {


    const params = {
      mobile_number: mobileNumber.value,
      ln: language.value,
      app_user_type: BUSINESS,
    };

    const validation = validate(MOBILE_NUMBER_RULES, params);

    if (ifObjectExist(validation)) {
      setSubmitLoader(true)

      dispatch(
        validateUserBusiness({
          params,
          onSuccess: (success) => () => {
            setSubmitLoader(false)
            dispatch(setRegisteredMobileNumber(mobileNumber.value));
            goTo(AUTH_PATH.OTP, false)
          },
          onError: (error: any) => () => {
            setSubmitLoader(false)
            if (error?.status_code === -1) {
              showToast('error', error?.error_message)
              setGuestModal(!guestModal)
              dispatch(setRegisteredMobileNumber(mobileNumber.value));
            } else if (error?.status_code === 0) {
              showToast('error', error?.error_message)
            }
          },
        })
      );
    } else {
      showToast("error", validation.mobile_number[0]);
    }
  };

  return (
    <>
      {fcmTokenValue === null && (
        <GetToken />
      )}
      <div className="">
        <AuthContainer className="mt-4">
          <div className=" row justify-content-center align-items-center">
            <div className="col ">
              {/* <AppLoader /> */}
              {/* <Card className="pb-2"> */}
              <Logo />
              <div className="my-5 mx-sm-3">
                <Input
                  heading={translate("auth.mobileNumber")}
                  placeholder={"00000 00000"}
                  type={"number"}
                  onChange={mobileNumber.onChange}
                  value={mobileNumber.value}
                  maxLength={10}
                />
                <H tag={"h5"} text={translate("auth.chooseLanguge")} />
                <Radio
                  selected={language}
                  data={LANGUAGES}
                  onRadioChange={(selected) => {
                    if (selected) {
                      dispatch(setLanguage(selected));
                    }
                  }}
                />
              </div>
              <div className="px-3">
                <Button
                  block
                  isLoading={submitLoader}
                  size={'md'}
                  text={translate("common.submit")}
                  onClick={() => {
                    if (!submitLoader) {
                      validateUserBusinessApiHandler();
                    }

                  }}
                />
              </div>
              <div className="text-center pt-2">
                <small className={` pointer`}
                  onClick={() => {
                    dispatch(setRegisteredMobileNumber(''))
                    goTo(AUTH_PATH.GUEST_USER_REGISTRATION, false)
                  }} >{translate("auth.continueAsAGuest")}</small>
              </div>
              {/* </Card> */}
            </div>
          </div>
        </AuthContainer>
      </div >
      <Modal isOpen={guestModal} onClose={() => { setGuestModal(false) }} title={translate("guest.wrongMessageAlert")!} titleClassname={'text-center ml-4'} margin="mt-3 "
      >
        <div className='text-center  '>
          <Button
            className="px-3 py-1"
            color={'secondary'}
            text={translate("common.no")!}
            onClick={() => {
              setGuestModal(!guestModal)
              dispatch(setRegisteredMobileNumber(''))
            }}
          />
          <Button
            className="px-3 py-1"
            text={translate("common.yes")!}
            onClick={() => {
              goTo(AUTH_PATH.GUEST_USER_REGISTRATION, false)
              setGuestModal(!guestModal)
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export { Login };
