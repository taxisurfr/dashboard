import { combineReducers } from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import TableStore from  './../util/TableStore';
import {
    REQUEST_FINANCEDATA, RECEIVE_FINANCEDATA,
    TRANSFER_ACTIVE,TRANSFER_NAME_CHANGE,TRANSFER_AMOUNT_CHANGE
} from '../Finance/actions';
import {
    REQUEST_ROUTESDATA, RECEIVE_ROUTESDATA, UPDATE_ROUTESDATA
} from '../Routes/actions';
import {
    LOGINLOGOUT
} from '../Header/actions';

import {
    REQUEST_BOOKINGDATA, RECEIVE_BOOKINGDATA
} from '../Booking/actions'

function financeData(state = {
    loggedIn:false,
    transferName: '',
    isFetching: false,
    paymentList: new TableStore(""),
    transferList: new TableStore(""),
    summaryList: new TableStore(""),
    financeDataAvailable: false,
}, action) {
    switch (action.type) {
        case REQUEST_FINANCEDATA:
            return Object.assign({}, state, {
                financeDataAvailable: false,
                isFetching: true
            })
        case LOGINLOGOUT:
            return Object.assign({}, state, {
                loggedIn: action.loggedIn,
            })
        case RECEIVE_FINANCEDATA:
            return Object.assign({}, state, {
                isFetching: false,
                paymentList: action.paymentList,
                transferList: action.transferList,
                summaryList: action.summaryList,
                financeDataAvailable: true,
                admin: action.admin
            })
        case TRANSFER_ACTIVE:
            return Object.assign({}, state, {
                transferActive: action.transferActive
            })
        case TRANSFER_NAME_CHANGE:
            return Object.assign({}, state, {
                transferName: action.transferName
            })
        case TRANSFER_AMOUNT_CHANGE:
            return Object.assign({}, state, {
                transferAmount: action.transferAmount
            })
        default:
            return state
    }
}

function bookingData(state = {
    isFetching: false,
    bookingList: new TableStore(""),
    bookingDataAvailable: false
}, action) {
    switch (action.type) {
        case REQUEST_BOOKINGDATA:
            return Object.assign({}, state, {
                isFetching: true,
                bookingDataAvailable: false
            })
        case RECEIVE_BOOKINGDATA:
            return Object.assign({}, state, {
                isFetching: false,
                bookingList: action.bookingList,
                admin:action.admin,
                bookingDataAvailable: true
            })
        default:
            return state
    }
}

function routesData(state = {
    isFetching: false,
    routesList: new TableStore(""),
    routesDataAvailable: false,
    centValues: []
}, action) {
    switch (action.type) {
        case REQUEST_ROUTESDATA:
            return Object.assign({}, state, {
                isFetching: true,
                routesDataAvailable: false
            })
        case RECEIVE_ROUTESDATA:
            return Object.assign({}, state, {
                isFetching: false,
                routesList: action.routesList,
                routesDataAvailable: true,
                admin:action.admin,
                centValues: action.centValues
            })
        case UPDATE_ROUTESDATA:
            state.centValues[action.id] =action.cents;
            return Object.assign({}, state, {
                centValues: state.centValues
            })
        default:
            return state
    }
}



const rootReducer = combineReducers({
    financeData,
    bookingData,
    routesData,
    form: reduxFormReducer
})

export default rootReducer
