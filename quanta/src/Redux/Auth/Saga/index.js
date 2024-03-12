import { takeLatest, put, call } from 'redux-saga/effects';
import {
  validateUserApi,
  validateRegisterUserApi,
  otpRegisterApi,
  getBusinessPlacesApi,
  validateUserBusinessApi,
  getBrandSectorsApi,
  getBusinessPlaceDetailsApi,
  registerCompanyApi,
  SectorServiceTypesApi,
  registerAdminApi,
  otpLoginApi,
  validateGuestUserApi

} from '@Services';

import { ERRORS, sagaErrorHandler } from '@Utils';
import {
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  validateUserSuccess,
  validateUserFailure,
  hideLoader,
  showLoader,
  validateRegisterUserSuccess,
  validateRegisterUserFailure,
  otpRegisterSuccess,
  otpRegisterFailure,
  getUserBusinessPlacesSuccess,
  getUserBusinessPlacesFailure,
  validateUserBusinessSuccess,
  validateUserBusinessFailure,
  brandSectorsSuccess,
  brandSectorsFailure,
  businessPlaceDetailsSuccess,
  businessPlaceDetailsFailure,
  registerCompanySuccess,
  registerCompanyFailure,
  sectorServiceTypesSuccess,
  sectorServiceTypesFailure,
  registerAdminSuccess,
  registerAdminFailure,
  VALIDATE_USER,
  VALIDATE_USER_BUSINESS,
  GET_USER_BUSINESS_PLACES,
  BRAND_SECTOR,
  BUSINESS_PLACES_DETAILS,
  REGISTER_COMPANY,
  SECTOR_SERVICE_TYPES,
  REGISTER_ADMIN,
  otpLoginFailure,
  otpLoginSuccess,
  OTP_LOGIN,

  VALIDATE_GUEST_USER,
  validateGuestUserSuccess,
  validateGuestUserFailure
} from '@Redux';

function* validateUserBusinessSaga(action) {
  try {

    yield put(showLoader());
    const response = yield call(validateUserBusinessApi, action.payload.params);
 
    console.log(response);
    if (response?.success) {
      yield put(hideLoader());
      yield put(validateUserBusinessSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      const error = sagaErrorHandler(response)
      yield put(validateUserBusinessFailure(error));
      yield call(action.payload.onError(error));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateUserBusinessFailure(error));
    yield call(action.payload.onError(error));
  }
}


/**
 * 
 * @param {validate User} action 
 */

function* validateUserSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(validateUserApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(validateUserSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(validateUserFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateUserFailure(ERRORS.INVALID_REQUEST));
  }
}



/**
 * register admin
 */

function* registerAdminSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerAdminApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(registerAdminSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(registerAdminFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}

/**
 * get user business places
 */

function* getUserBusinessPlacesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getBusinessPlacesApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(getUserBusinessPlacesSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(getUserBusinessPlacesFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
  }
}


function* validateRegisterUserSaga(action) {
  console.log(JSON.stringify(action));
  try {
    yield put(showLoader());
    const response = yield call(validateRegisterUserApi, action.payload.params);
    console.log(JSON.stringify(response));

    if (response.success) {
      yield put(hideLoader());
      yield put(validateRegisterUserSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(validateUserFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateUserFailure(error.error_message));
    yield call(action.payload.onError(error));
  }
}

function* otpRegisterSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(otpRegisterApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(otpRegisterSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(otpRegisterFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(otpRegisterFailure(error.error_message));
    yield call(action.payload.onError(error));
  }
}


/**
 * otp login
 * @param {*} action 
 */


function* otpLoginSaga(action) {
  console.log(JSON.stringify(action.payload));
  try {
    yield put(showLoader());
    const response = yield call(otpLoginApi, action.payload.params);
    if (response.success) {
      yield put(hideLoader());
      yield put(otpLoginSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      // console.log('otpelse', response)
      yield put(hideLoader());
      if (response?.error_message) {
        const errorMessage = response.error_message
        yield put(otpLoginFailure(errorMessage));
        yield call(action.payload.onError(errorMessage));
      } else {
        const errorMessage = response?.message
        yield put(otpLoginFailure(errorMessage));
        yield call(action.payload.onError(errorMessage));
      }
    }
  } catch (error) {
    console.log("errrr saga otp", error)
    yield put(hideLoader());
    yield put(otpRegisterFailure(ERRORS.INVALID_REQUEST));
    yield call(action.payload.onError(error));

  }
}

function* brandSectorsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(getBrandSectorsApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(brandSectorsSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(brandSectorsFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(brandSectorsFailure(ERRORS.INVALID_REQUEST));
  }
}
function* businessPlaceDetailsSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(
      getBusinessPlaceDetailsApi,
      action.payload.params,
    );
    if (response.success) {
      yield put(hideLoader());
      yield put(businessPlaceDetailsSuccess({ ...response }));
      yield call(action.payload.onSuccess(response));
    } else {
      yield put(hideLoader());
      yield put(businessPlaceDetailsFailure(response.error_message));
      yield call(action.payload.onError(response));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(businessPlaceDetailsFailure(ERRORS.INVALID_REQUEST));
  }
}

function* registerCompanySaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(registerCompanyApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(registerCompanySuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(registerCompanyFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(registerCompanyFailure(ERRORS.INVALID_REQUEST));
  }
}

function* sectorServiceTypesSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(SectorServiceTypesApi, action.payload);
    if (response.success) {
      yield put(hideLoader());
      yield put(sectorServiceTypesSuccess({ ...response }));
    } else {
      yield put(hideLoader());
      yield put(sectorServiceTypesFailure(response.error_message));
    }
  } catch (error) {
    yield put(hideLoader());
    yield put(sectorServiceTypesFailure(ERRORS.INVALID_REQUEST));
  }
}

/**
 * validate guest user
 */


function* validateGuestUserSaga(action) {
  try {
    yield put(showLoader());
    const response = yield call(validateGuestUserApi, action.payload.params);
    console.log(response,"======")
    if (response?.success) {
      yield put(hideLoader());
      yield put(validateGuestUserSuccess({ ...response }));
      yield call(action.payload.onSuccess(response.details));

    } else {
      yield put(hideLoader());
      const error = sagaErrorHandler(response)
      yield put(validateGuestUserFailure(error));
      yield call(action.payload.onError(error));

    }
  } catch (error) {
    yield put(hideLoader());
    yield put(validateGuestUserFailure(ERRORS.INVALID_REQUEST));
  }
}




///watcher///

function* AuthSaga() {
  yield takeLatest(VALIDATE_USER, validateUserSaga);
  yield takeLatest(VALIDATE_REGISTER_USER, validateRegisterUserSaga);
  yield takeLatest(OTP_REGISTER, otpRegisterSaga);
  yield takeLatest(OTP_LOGIN, otpLoginSaga);
  yield takeLatest(VALIDATE_USER_BUSINESS, validateUserBusinessSaga);
  yield takeLatest(GET_USER_BUSINESS_PLACES, getUserBusinessPlacesSaga);
  yield takeLatest(BRAND_SECTOR, brandSectorsSaga);
  yield takeLatest(BUSINESS_PLACES_DETAILS, businessPlaceDetailsSaga);
  yield takeLatest(REGISTER_COMPANY, registerCompanySaga);
  yield takeLatest(SECTOR_SERVICE_TYPES, sectorServiceTypesSaga);
  yield takeLatest(REGISTER_ADMIN, registerAdminSaga);

  yield takeLatest(VALIDATE_GUEST_USER, validateGuestUserSaga);

}

export default AuthSaga;
