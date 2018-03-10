import fetch from 'isomorphic-fetch'
import util from 'util';
import {getMethod,getOptions,getUrl} from '../util/network';


export const LOGINLOGOUT = 'LOGINLOGOUT'
export const RECEIVE_CONTRACTOR_VALIDATION = 'RECEIVE_CONTRACTOR_VALIDATION'

export function loginLogoutWithToken(loggedIn) {
    return {
        type: LOGINLOGOUT,
        loggedIn: loggedIn
    }
}

export function receiveLoginDetails(json) {
    return {
        type: RECEIVE_CONTRACTOR_VALIDATION,
        loginName:json.loginName,
        admin:json.admin,
        validated: json.validated
    }
}

export function getLoginDetails() {
    var body = JSON.stringify({
    });

    return dispatch => {
        fetch(getUrl('logindetails'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveLoginDetails(responseJson)))
            .catch((error) => {
                console.error(error);
            });
    }
}

