import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Button, H, Logo, Radio, useKeyPress, AppLoader, Modal, Card, Input, DropDown, InputHeading } from "@Components";
import { setLanguage, setRegisteredMobileNumber, validateGuestUser } from '@Redux';
import { convertToUpperCase, getValidateError, GUEST_REGISTRATION_FORM_RULES, ifObjectExist, LANGUAGES, showToast, validate } from '@Utils';
import { useInput, useNavigation } from '@Hooks';
import { AUTH_PATH, ROUTES } from '@Routes';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContainer } from '@Modules';
import { translate } from '@I18n';

const GENDER_LIST = [
  { id: '1', name: 'Male', value: 'M' },
  { id: '2', name: 'Female', value: 'f' },
  { id: '3', name: 'Others', value: 'O' },
];

function GuestUserRegistration() {

  const { goTo } = useNavigation()
  const dispatch = useDispatch();

  const { registeredMobileNumber } = useSelector(
    (state: any) => state.AuthReducer
  );

  const mobileNumber = useInput("");
  const name = useInput("")
  const [gender, setGender] = useState('')
  const [submitLoader, setSubmitLoader] = useState(false)


  const onGuestRegister = () => {

    const validParams = {
      first_name: convertToUpperCase(name.value),
      mobile_number: registeredMobileNumber ? registeredMobileNumber : mobileNumber.value,
      gender: gender
    }

    const validation = validate(GUEST_REGISTRATION_FORM_RULES, validParams)

    if (ifObjectExist(validation)) {

      const params = {
        first_name: convertToUpperCase(name.value),
        mobile_number: registeredMobileNumber ? registeredMobileNumber : mobileNumber.value,
        gender: gender
      }
      setSubmitLoader(true)

      dispatch(
        validateGuestUser({
          params,
          onSuccess: (success) => () => {
            showToast('success', success.message)
            setSubmitLoader(false)
            dispatch(setRegisteredMobileNumber(registeredMobileNumber ? registeredMobileNumber : mobileNumber.value));
            goTo(AUTH_PATH.OTP, false)
          },
          onError: (error) => () => {
            setSubmitLoader(false)
            if (error?.status_code === -1) {
              showToast('error', error?.error_message)
              dispatch(setRegisteredMobileNumber(mobileNumber.value));
            } else if (error?.status_code === 0) {
              showToast('error', error?.error_message)
            }

          },
        })
      );
    } else {
      setSubmitLoader(false)
      showToast("error", getValidateError(validation))
    }

  }

  return (
    <div className={`${!registeredMobileNumber ? "pt-5 pb-5":''}`}>
      <AuthContainer className='mt-4'>

        <div className="row  ">
          <div className="col">

            <Logo />
            <div className="my-5 mx-sm-3 ">
              <Input
                heading={translate("auth.name")!}
                placeholder={translate("auth.enterYourName")!}
                onChange={name.onChange}
                value={name.value}
              />
              {!registeredMobileNumber && (
                <Input
                  heading={translate("auth.mobileNumber")!}
                  placeholder={translate("auth.enterYourMobileNumber")!}
                  type={"number"}
                  onChange={mobileNumber.onChange}
                  value={mobileNumber.value}
                  maxLength={10}
                />
              )}

              <div >
                <InputHeading heading={translate("auth.gender")!} />
                <DropDown
                  data={GENDER_LIST}
                  placeholder={translate("auth.selectGender")!}
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                  }}
                />
              </div>
            </div>
            <div className="px-3">
              <Button
                block
                isLoading={submitLoader}
                size={'md'}
                text={translate("common.submit")!}
                onClick={() => {
                  onGuestRegister()
                }}
              />
            </div>

          </div>
        </div>
      </AuthContainer>

    </div>
  )
}

export { GuestUserRegistration }