import { combineReducers } from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import TableStore from  './../util/TableStore';
import {
    REQUEST_FINANCEDATA, RECEIVE_FINANCEDATA,
    TRANSFER_ACTIVE,TRANSFER_NAME_CHANGE,TRANSFER_AMOUNT_CHANGE
} from '../Finance/actions';
import {
    REQUEST_ROUTESDATA, RECEIVE_ROUTESDATA, UPDATE_ROUTESDATA,
    ADD_ROUTE_STATUS_CHANGE,
    ADD_START_ROUTE_STATUS_CHANGE,
    UPDATE_NEW_ROUTESDATA, SHOW_ADD_PRICE_STATUS_CHANGE, UPDATE_PRICE_ON_ROUTE_DATA
} from '../Routes/actions';
import {
    ISADMIN,
    LOGINLOGOUT
} from '../Header/actions';

import {
    REQUEST_BOOKINGDATA, RECEIVE_BOOKINGDATA
} from '../Booking/actions'
import contractorsData from "../Contractors/contractorsReducer";
import pricesData from "../Prices/pricesReducer";

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
                loginName: action.loginName,
                admin: action.admin
            })
        case ISADMIN:
            return Object.assign({}, state, {
                admin: action.admin,
                loginName: action.loginName
            })
        case RECEIVE_FINANCEDATA:
            return Object.assign({}, state, {
                contractorIdList:action.contractorIdList,
                contractor:action.contractor,
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
    centValues: [],
    addRouteActive: false,
    addStartRouteActive: false,
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
                centValues: action.centValues,
                locations: action.locations,
                created:action.created,
                contractorIdList:action.contractorIdList
            })
        case UPDATE_ROUTESDATA:
            state.centValues[action.id] =action.cents;
            return Object.assign({}, state, {
                centValues: state.centValues
            })
        case UPDATE_NEW_ROUTESDATA:
            switch (action.updateType){
                case 'routeid':
                    return Object.assign({}, state, {
                        id: action.value
                    })
                case 'startroute':
                    return Object.assign({}, state, {
                        startroute: action.value
                    })
                case 'endroute':
                    return Object.assign({}, state, {
                        endroute: action.value
                    })
                case 'contractor':
                    return Object.assign({}, state, {
                        contractorId: action.value
                    })
            }
        case ADD_ROUTE_STATUS_CHANGE:
            return Object.assign({}, state, {
                isAddRouteActive: action.isAddRouteActive
            })

        case ADD_START_ROUTE_STATUS_CHANGE:
            return Object.assign({}, state, {
                isAddStartRouteActive: action.isAddStartRouteActive
            })
        case SHOW_ADD_PRICE_STATUS_CHANGE:
            return Object.assign({}, state, {
                isAddPriceActive: action.isAddPriceActive,
                id: action.route.id,
                startroute: action.route.startroute,
                endroute: action.route.endroute
            })
        case UPDATE_PRICE_ON_ROUTE_DATA:
            switch (action.updateType) {
                case 'cents':
                    return Object.assign({}, state, {
                        cents: action.value
                    })
                case 'contractor':
                    return Object.assign({}, state, {
                        contractorId: action.value.id,
                        contractorName: action.value.name
                    })
            }

        default:
            return state
    }
}





const rootReducer = combineReducers({
    financeData,
    bookingData,
    routesData,
    contractorsData,
    pricesData,
    form: reduxFormReducer
})

export default rootReducer
