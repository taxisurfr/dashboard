import fetch from 'isomorphic-fetch'
import util from 'util';
import {getMethod,getOptions,getUrl} from '../util/network';
var TableStore = require('./../util/TableStore');

export const REQUEST_BOOKINGDATA = 'REQUEST_BOOKINGDATA'
export const RECEIVE_BOOKINGDATA = 'RECEIVE_BOOKINGDATA'

function requestBookingData() {
    return {
        type: REQUEST_BOOKINGDATA
    }
}

function receiveBookingData(json) {
    return {
        type: RECEIVE_BOOKINGDATA,
        bookingList: new TableStore(json.bookingList),
        admin: json.admin
    }
}


function fetchBookingData() {
    return dispatch => {
        dispatch(requestBookingData())
        fetch(getUrl('booking'), getOptions('POST'))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveBookingData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }
}

function shouldFetchBookingData(state) {
    const bookingData = state.bookingData
    return !bookingData.isFetching;
}

export function fetchBookingDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchBookingData(getState())) {
            return dispatch(fetchBookingData())
        }
    }
}

export function cancelBooking(bookingId) {
    console.log("canceling: "+bookingId);
    return (dispatch, getState) => {
        return dispatch(cancelBookingOnServer(bookingId))
    }
}
function cancelBookingOnServer(id) {
    util.inspect(id, { showHidden: true, depth: null });
    var bi = id;
    var body = JSON.stringify({
        bookingId: id
    });

    return dispatch => {
        fetch(getUrl('cancelBooking'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveBookingData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }

}



export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    }
}
