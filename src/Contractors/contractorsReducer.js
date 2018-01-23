import { combineReducers } from 'redux'
import {reducer as reduxFormReducer} from 'redux-form'
import TableStore from  './../util/TableStore';
import {
    REQUEST_CONTRACTORSDATA, RECEIVE_CONTRACTORSDATA, UPDATE_CONTRACTORSDATA,
    ADD_ROUTE_STATUS_CHANGE,
    SHOW_ADD_CONTRACTOR_STATUS_CHANGE,
    RESET_CONTRACTORSDATA,
    UPDATE_NEW_CONTRACTORSDATA
} from '../Contractors/actions';

function contractorsData(state = {
    isFetching: false,
    contractorsList: new TableStore(""),
    contractorsDataAvailable: false,
    idAddContractorActive: false
}, action) {
    switch (action.type) {
        case REQUEST_CONTRACTORSDATA:
            return Object.assign({}, state, {
                isFetching: true,
                contractorsList: null,
                contractorsDataAvailable: false
            })
        case RECEIVE_CONTRACTORSDATA:
            return Object.assign({}, state, {
                isFetching: false,
                contractorsList: action.contractorsList,
                contractorsDataAvailable: true,
                admin:action.admin
            })
        case UPDATE_CONTRACTORSDATA:
            switch (action.updateType){
                case 'contractor':
                    return Object.assign({}, state, {
                        id: action.value.id,
                        name: action.value.name,
                        email: action.value.email,
                        address1: action.value.address1,
                        address2: action.value.address2,
                        address3: action.value.address3,
                        address4: action.value.address4
                    })
                case 'name':
                    return Object.assign({}, state, {
                        name: action.value
                    })
                case 'address1':
                    return Object.assign({}, state, {
                        address1: action.value
                    })
                case 'address2':
                    return Object.assign({}, state, {
                        address2: action.value
                    })
                case 'address3':
                    return Object.assign({}, state, {
                        address3: action.value
                    })
                case 'address4':
                    return Object.assign({}, state, {
                        address4: action.value
                    })
                case 'email':
                    return Object.assign({}, state, {
                        email: action.value
                    })
            }
        case SHOW_ADD_CONTRACTOR_STATUS_CHANGE:
            return Object.assign({}, state, {
                isAddContractorActive: action.isAddContractorActive
            })
        case RESET_CONTRACTORSDATA:
            return Object.assign({}, state, {
                isAddContractorActive: true,
                id: null,
                name: null,
                email: null,
                address1: null,
                address2: null,
                address3: null,
                address4: null
            })
        default:
            return state
    }
}



export default contractorsData
