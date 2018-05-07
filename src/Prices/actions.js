import fetch from 'isomorphic-fetch'
import {getMethod,getOptions,getUrl} from '../util/network';
var TableStore = require('./../util/TableStore');

export const RECEIVE_PRICESDATA = 'RECEIVE_PRICESDATA'
export const PRICESDATA_DIRTY = 'PRICESDATA_DIRTY'
export const REQUEST_PRICESDATA = 'REQUEST_PRICESDATA'
export const UPDATE_PRICESDATA = 'UPDATE_PRICESDATA'
export const RESET_PRICESDATA = 'RESET_PRICESDATA'
export const ADD_START_ROUTE_STATUS_CHANGE = 'ADD_START_ROUTE_STATUS_CHANGE'
export const SHOW_EDIT_PRICE = 'SHOW_EDIT_PRICE'
export const UPDATE_NEW_PRICESDATA = 'UPDATE_NEW_PRICESDATA'
export const SHOW_NEW_PRICE = 'SHOW_NEW_PRICE'
export const INIT_PRICE = 'INIT_PRICE'

export function updatePriceValue(type,value) {
    return {
        type: UPDATE_PRICESDATA,
        value: value,
        updateType: type
    }
}

export function initPrice(value) {
    return {
        type: INIT_PRICE,
        contractorId: value,
    }
}


export function editPrice(price,show) {
    return {
        isEditPriceActive:show,
        type: SHOW_EDIT_PRICE,
        price: price
    }
}
export function newPrice(price,show) {
    return {
        isNewPriceActive: show,
        type: SHOW_NEW_PRICE
    }
}

export function setPricesDataDirty() {
    return {
        type: PRICESDATA_DIRTY
    }
}


function requestPricesData() {
    return {
        type: REQUEST_PRICESDATA
    }
}

export function addNewPriceActive(){
    return {
        type: RESET_PRICESDATA
    }
}
export function showEditPrice(show){
    return {
        type: RESET_PRICESDATA,
        show:show
    }
}


function receivePricesData(json) {
    return {
        type: RECEIVE_PRICESDATA,
        pricesList: new TableStore(json.prices),
        locationList: json.locations,
        admin: json.admin,
        contractors: json.contractors
    }
}


function fetchPricesData() {
    return dispatch => {
        dispatch(requestPricesData())
        fetch(getUrl('prices'), getOptions('POST'))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receivePricesData(responseJson)))
            .catch((error) => {
                console.error(error);
            });

    }
}

function shouldFetchPricesData(state) {
    return !state.pricesData.pricesDataAvailable && !state.pricesData.isFetching;
}

export function fetchPriceDataIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchPricesData(getState())) {
            return dispatch(fetchPricesData())
        }
    }
}

export function savePrice(price,isNew) {
    return (dispatch, getState) => {
        return dispatch(addPriceOnServer(price,isNew))
    }
}

function addPriceOnServer(price,isNew) {

    var body = isNew ? JSON.stringify({
        newPrice: isNew,
        startrouteId: price.startroute,
        endrouteId: price.endroute,
        cents: price.cents,
        contractorId: price.contractor.id
    })
    : JSON.stringify({
            newPrice: isNew,
            startrouteId: price.startroute.id,
            endrouteId: price.endroute.id,
            cents: price.cents,
            contractorId: price.contractor.id,
            id: price.id
        })
    ;

    return dispatch => {
        fetch(getUrl('updatecreateprice'), getMethod('POST',body))
            .then((response) => response.json())
            .then((responseJson) => dispatch(receivePricesData(responseJson)))
            .then((responseJson) => dispatch(newPrice(null,false)))
            .catch((error) => {
                console.error(error);
            });
    }
}

