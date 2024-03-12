import React, { RefObject, useEffect, useState } from 'react';
import { Container, ScreenTitle, Primary, useKeyPress } from '@components';
import { OtpInput } from '../../container';
import {
  ROUTE,
  useNav,
  validateMobileNumber,
  showToast,
  getMaxLengthForNumberInputs,
  goBack,
  ASYN_USER_AUTH,
  goTo,
  DOMAIN
} from '@utils';

import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  getResendLoginOtp,
  proceedSignIn,
} from '../../../../store/auth/actions';

import {
  setUserLoginDetails
} from '../../../../store/app/actions';
import { getDashboard } from '../../../../store/dashboard/actions';


type LoginResponse = {
  token: string;
  is_admin: string;
  is_branch_admin: string;
}
console.log(ASYN_USER_AUTH,"ASYN_USER_AUTH====>")

function Otp() {

  const navigate = useNav();
  let dispatch = useDispatch();

  const { t } = useTranslation();
  const enterPress = useKeyPress('Enter')

  const { mobileNumber } = useSelector(
    (state: any) => state.AuthReducer
  );



  const [validOtp, setValidOtp] = useState('');
  const [counter, setCounter] = useState<number>(59);
  const maxLength = 1

  const inputRef1 = React.createRef<HTMLInputElement>();
  const inputRef2 = React.createRef<HTMLInputElement>();
  const inputRef3 = React.createRef<HTMLInputElement>();
  const inputRef4 = React.createRef<HTMLInputElement>();

  const [otp, setOtp] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      counter !== 0 && setCounter(counter - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter]);

  useEffect(() => {
    if (enterPress) {
      handleSignIn()
    }
  }, [enterPress])

  const onChangeHandler = (e: any) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };




  const reSendOTP = (params: object) => {
    dispatch(getResendLoginOtp({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error: any) => () => {

      }
    }));
  };

  const signInOTP = (params: object) => {
    dispatch(proceedSignIn({
      params,
      onSuccess: (response: LoginResponse) => async () => {

        if (response.is_admin || response.is_branch_admin) {
          await localStorage.setItem(ASYN_USER_AUTH, response.token);
          const params = { userLoggedIn: true, token: response.token, userDetails: response, mobileNumber: mobileNumber }
          dispatch(setUserLoginDetails(params))
          dashBoardApi()
        } else {
          showToast('error', t('invalidAdmin'));
        }
      },
      onError: (error: string) => () => {
        showToast('error', error);
      },
    }));
  };


  const dashBoardApi = () => {
    const DashboardParams = {}
    dispatch(getDashboard({
      DashboardParams,
      onSuccess: (success: any) => () => {

        goTo(navigate, ROUTE.ROUTE_DASHBOARD, true)
      },
      onError: (error: any) => () => {
        showToast('error', error)
      }
    }))
  }

  const validatePostParams = () => {
    const otpConvertor = otp.field1 + otp.field2 + otp.field3 + otp.field4;
    setValidOtp(otpConvertor);
    return (
      validateMobileNumber(mobileNumber).status && otpConvertor.length === 4
    );
  };

  const handleSignIn = () => {
    if (validatePostParams()) {
      const otpConvertor = otp.field1 + otp.field2 + otp.field3 + otp.field4;
      if (otpConvertor.length === 4) {
        const params = {
          mobile_number: mobileNumber,
          otp: otpConvertor,
        };
        signInOTP(params);
      }
    } else {
      showToast('error', t('formInvalidParams'));
    }
  };

  const handleResendOtp = () => {
    setCounter(59);
    const params = {
      mobile_number: mobileNumber,
    };
    reSendOTP(params);
  };



  const changeInputFocus = () => {
    if (otp.field1 === '' && inputRef1.current) {
      inputRef1.current.focus();
    } else if (otp.field2 === '' && inputRef2.current) {
      inputRef2.current.focus();
    } else if (otp.field3 === '' && inputRef3.current) {
      inputRef3.current.focus();
    } else if (otp.field4 === '' && inputRef4.current) {
      inputRef4.current.focus();
    }
  };

  useEffect(() => {
    changeInputFocus()
  }, [otp.field1, otp.field2, otp.field3, otp.field4]);


  const changeBackWardInputFocus = (event: any) => {
    console.log(event.target.name,"eeeeeeeeee==='''///")
    const { value, name } = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && value === '') {
      switch (name) {
        case 'field2':
          inputRef1.current?.focus();
          break;
        case 'field3':
          inputRef2.current?.focus();
          break;
        case 'field4':
          inputRef3.current?.focus();
          break;
        default:
          break;
      }
    } else if (value !== '') {
      switch (name) {
        case 'field1':
          inputRef2.current?.focus();
          break;
        case 'field2':
          inputRef3.current?.focus();
          break;
        case 'field3':
          inputRef4.current?.focus();
          break;
        default:
          break;
      }
    }
  };


  return (
    <Container
      col={'col'}
      height={'vh-100'}
      display={'d-flex'}
      justifyContent={'justify-content-center'}
      alignItems={'align-items-center'}
    >
      <Container
        display={'d-flex'}
        flexDirection={'flex-column'}
        justifyContent={'justify-content-center'}
        alignItems={'align-items-center'}
      >
        <ScreenTitle title={t('verifyOTP')} />
        <Container
          flexDirection={'flex-row'}
          additionClass={'text-center'}
          justifyContent={'justify-content-center'}
          alignItems={'align-items-center'}
          textColor={'text-muted'}
          margin={'mt-5'}
        >
          <small>{t('verificationCode') + '+91-' + mobileNumber}</small>
          <small
            className='ml-2 text-primary text-center'
            role='button' onClick={async () => {
              await localStorage.setItem(DOMAIN, '');
              goTo(navigate, ROUTE.ROUTE_LOGIN, true)
            }}>
            {t('edit')}
          </small>
        </Container>
        <Container textAlign={'text-center'} textColor={'text-muted'}>
          <small>{t('pleaseEnterItBelow')}</small>
        </Container>

        <Container
          flexDirection={'row'}
          justifyContent={'justify-content-center'}
          alignItems={'align-items-center'}
          margin={'mt-4'}

        >
          <OtpInput
            //formCustomClass='ml-2'
            name='field1'
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeBackWardInputFocus(e)}
            value={otp.field1}
            ref={inputRef1}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}

          />
          <OtpInput
            formCustomClass='ml-4'
            name='field2'
            value={otp.field2}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeBackWardInputFocus(e)}
            ref={inputRef2}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }

            }}
          />
          <OtpInput
            formCustomClass='ml-4'
            name='field3'
            value={otp.field3}
            ref={inputRef3}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeBackWardInputFocus(e)}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}
          />
          <OtpInput
            formCustomClass='ml-4'
            name='field4'
            value={otp.field4}
            ref={inputRef4}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => changeBackWardInputFocus(e)}
            onChange={(event) => {
              if (event.target.value.length <= maxLength) {
                onChangeHandler(event);
              }
            }}
          />
        </Container>

        <Container flexDirection={'flex-row'} padding={'pt-4'} col={'col'}>
          <Primary text={t('signIn')} additionClass={'btn-block'} onClick={() => handleSignIn()} />
        </Container>

        <Container
          flexDirection={'flex-row'}
          textAlign={'text-center'}
          justifyContent={'justify-content-center'}
          alignItems={'align-items-center'}
          textColor={'text-muted'}
          margin={'mt-3'}
        >
          <small>{t('OTP?')}</small>
          {counter === 0 ? (
            <small
              className='ml-2 text-primary text-center'
              role='button'
              onClick={() => handleResendOtp()}
            >
              {t('resend')}
            </small>
          ) : (
            <small className='ml-2 text-primary text-center'>
              {`00:${counter < 10 ? '0' + counter : counter}`}
            </small>
          )}
        </Container>
      </Container>
    </Container>
  );
}

export default Otp;
