import fetch from 'isomorphic-fetch'
import util from 'util';
import {getMethod,getOptions,getUrl} from '../util/network';
var TableStore = require('./../util/TableStore');

export const RECEIVE_ROUTESDATA = 'RECEIVE_ROUTESDATA'
export const REQUEST_ROUTESDATA = 'REQUEST_ROUTESDATA'
export const UPDATE_ROUTESDATA = 'UPDATE_ROUTESDATA'

export function updateRoute(id,cents) {
    return {
        type: UPDATE_ROUTESDATA,
        id: id,
        cents: cents

    }
}

function requestRoutesData() {
    return {
        type: REQUEST_ROUTESDATA
    }
}

function receiveRoutesData(json) {
    var centValues=[];
    for( var i = 0; i < json.routesList.length; i++ ) {
        var route = json.routesList[i];
        centValues[i] = route.cents;
    }
    return {
        type: RECEIVE_ROUTESDATA,
        routesList: new TableStore(json.routesList),
        admin: json.admin,
        centValues: centValues
    }
}


function fetchRoutesData() {
    return dispatch => {
        dispatch(requestRoutesData())
        fetch(getUrl('routes'), getOptions('POST'))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveRoutesData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }
}

function shouldFetchRoutesData(state) {
    return !state.routesData.routesDataAvailable;
}

export function fetchRoutesDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchRoutesData(getState())) {
            return dispatch(fetchRoutesData())
        }
    }
}

export function editRoute(id,cents) {
    return (dispatch, getState) => {
        return dispatch(updateRouteOnServer(id,cents))
    }
}
function updateRouteOnServer(id,cents) {
    var body = JSON.stringify({
        id: id,
        cents:cents
    });

    return dispatch => {
        fetch(getUrl('editRoute'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveRoutesData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }

}