import fetch from 'isomorphic-fetch'
import {getMethod,getOptions,getUrl} from '../util/network';
var TableStore = require('./../util/TableStore');

export const RECEIVE_CONTRACTORSDATA = 'RECEIVE_CONTRACTORSDATA'
export const REQUEST_CONTRACTORSDATA = 'REQUEST_CONTRACTORSDATA'
export const UPDATE_CONTRACTORSDATA = 'UPDATE_CONTRACTORSDATA'
export const RESET_CONTRACTORSDATA = 'RESET_CONTRACTORSDATA'
export const SHOW_ADD_CONTRACTOR_STATUS_CHANGE = 'SHOW_ADD_CONTRACTOR_STATUS_CHANGE'
export const ADD_START_ROUTE_STATUS_CHANGE = 'ADD_START_ROUTE_STATUS_CHANGE'
export const UPDATE_NEW_CONTRACTORSDATA = 'UPDATE_NEW_CONTRACTORSDATA'

export function updateContractorValue(type,value) {
    return {
        type: UPDATE_CONTRACTORSDATA,
        value: value,
        updateType: type
    }
}

export function updateNewRoute(updateType,value) {
    return {
        type: UPDATE_NEW_CONTRACTORSDATA,
        updateType: updateType,
        value:value
    }
}

function requestContractorsData() {
    return {
        type: REQUEST_CONTRACTORSDATA
    }
}

export function addNewContractorActive(){
    return {
        type: RESET_CONTRACTORSDATA
    }
}

export function addContractorActive(isAddContractorActive){
    return {
        type: SHOW_ADD_CONTRACTOR_STATUS_CHANGE,
        isAddContractorActive:isAddContractorActive
    }
}

function receiveContractorsData(json) {
    return {
        type: RECEIVE_CONTRACTORSDATA,
        contractorsList: new TableStore(json.contractorsList),
        admin: json.admin,
    }
}


function fetchContractorsData() {
    return dispatch => {
        dispatch(requestContractorsData())
        fetch(getUrl('contractors'), getOptions('POST'))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveContractorsData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }
}

function shouldFetchContractorsData(state) {
    return !state.contractorsData.pricesDataAvailable && !state.contractorsData.isFetching;
}

export function fetchContractorDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchContractorsData(getState())) {
            return dispatch(fetchContractorsData())
        }
    }
}

export function saveContractor(contractor) {
    return (dispatch, getState) => {
        return dispatch(addContractorOnServer(contractor))
    }
}

function addContractorOnServer(contractor,update) {
    var body = JSON.stringify({
        id: contractor.id,
        address1: contractor.address1,
        address2: contractor.address2,
        address3: contractor.address3,
        address4: contractor.address4,
        email: contractor.email,
        name: contractor.name
    });

    return dispatch => {
        fetch(getUrl('updatecreatecontractor'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receiveContractorsData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }

}

