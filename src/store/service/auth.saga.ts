import {API} from '@app/utils/constants';
import {instance} from '@app/utils/server/instance';
import {AxiosResponse} from 'axios';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  // logout
  logoutFailure,
  logoutSuccess,
  // Sign-in
  signInFailure,
  signInSuccess,
  // Sign-up
  signUpFailure,
  signUpSuccess,
} from '../slice/auth.slice';
import Storage from '@app/utils/storage';
import {persistor} from '..';
import {showMessage} from '@app/utils/helpers/Toast';

const {auth} = API;

const _header = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

// Worker Saga: Handles the sign-in API call
function* handleSignIn(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.login,
      action.payload,
    );

    console.log("result:::",result);
    const {status, data} = result;
    console.log("data:::",data?.data.token);

    if (status === 200) {
      yield put(
        signInSuccess({
          token: data?.data?.token,
          refreshToken: data?.data?.token,
        }),
      );
      showMessage('Login Successful, You have been logged in successfully!');
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(signInFailure(error?.response?.data?.message || error.message));
  }
}

// Worker Saga: Handles the sign-up API call
function* handleSignUp(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      instance.post,
      auth.signup,
      action.payload,
    );

    const {status, data} = result;

    if (status === 200) {
      yield put(signUpSuccess());
      showMessage(
        'Registration Successful, Your account has been created successfully!',
      );
    }
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(signUpFailure(error?.response?.data?.message || error.message));
  }
}

// Worker Saga: Handles the logout process
function* handleLogout() {
  try {
    /*
        const result: AxiosResponse<any> = yield call(instance.get, auth.logout);

        const {status, data} = result;

        if (status === 200) {
        // Clear local storage (if needed)
        yield call(Storage.clearAll);

        // Purge the persisted data
        yield call(persistor.purge);

        // Dispatch the logout action to reset the state
        yield put(logoutSuccess());
        }
    */

    // Clear local storage (if needed)
    yield call(Storage.clearAll);

    // Purge the persisted data
    yield call(persistor.purge);

    // Dispatch the logout action to reset the state
    yield put(logoutSuccess());
    showMessage('Logout Successful, You have been logged out successfully!');
  } catch (error: any) {
    showMessage(error?.response?.data?.message || error.message);
    yield put(logoutFailure(error?.response?.data?.message || error.message));
  }
}

function* authSaga() {
  yield takeLatest('auth/signInRequest', handleSignIn);
  yield takeLatest('auth/signUpRequest', handleSignUp);
  yield takeLatest('auth/logoutRequest', handleLogout);
}

export default authSaga;
