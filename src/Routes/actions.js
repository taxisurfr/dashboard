import fetch from 'isomorphic-fetch'
import util from 'util';
import {getMethod,getOptions,getUrl} from '../util/network';
var TableStore = require('./../util/TableStore');

export const RECEIVE_ROUTESDATA = 'RECEIVE_ROUTESDATA'
export const REQUEST_ROUTESDATA = 'REQUEST_ROUTESDATA'
export const UPDATE_ROUTESDATA = 'UPDATE_ROUTESDATA'
export const ADD_ROUTE_STATUS_CHANGE = 'ADD_ROUTE_STATUS_CHANGE'
export const UPDATE_NEW_ROUTESDATA = 'UPDATE_NEW_ROUTESDATA'

export function updateRoute(id,cents) {
    return {
        type: UPDATE_ROUTESDATA,
        id: id,
        cents: cents
    }
}

export function updateNewRoute(updateType,value) {
    return {
        type: UPDATE_NEW_ROUTESDATA,
        updateType: updateType,
        value:value
    }
}

function requestRoutesData() {
    return {
        type: REQUEST_ROUTESDATA
    }
}

export function addRouteActive(isAddRouteActive){
    return {
        type: ADD_ROUTE_STATUS_CHANGE,
        isAddRouteActive:isAddRouteActive
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
        centValues: centValues,
        locations: json.locations,
        created: json.created
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
    return !state.routesData.routesDataAvailable && !state.routesData.isFetching;
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
export function addRoute(route) {
    return (dispatch, getState) => {
        return dispatch(addRouteOnServer(route))
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

function addRouteOnServer(route) {
    var body = JSON.stringify({
        startroute: route.startroute,
        endroute: route.endroute
    });

    return dispatch => {
        fetch(getUrl('createRoute'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveRoutesData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }

}