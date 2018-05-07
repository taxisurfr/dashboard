import TableStore from './../util/TableStore';
import {
    REQUEST_PRICESDATA, RECEIVE_PRICESDATA, UPDATE_PRICESDATA,
    SHOW_ADD_PRICE_STATUS_CHANGE,
    RESET_PRICESDATA,
    UPDATE_NEW_PRICESDATA,INIT_PRICE
} from '../Prices/actions';
import {PRICESDATA_DIRTY, SHOW_EDIT_PRICE, SHOW_NEW_PRICE} from "./actions";

function emprty_price() {
    return {
        prices: {},
        locations: {},
        route: {startroute: '', endroute: ''},
        cents: null
    };
}

function pricesData(state = {
    isFetching: false,
    pricesList: new TableStore(""),
    pricesDataAvailable: false,
    idAddPriceActive: false,
    price: emprty_price()
}, action) {
    switch (action.type) {
        case REQUEST_PRICESDATA:
            return Object.assign({}, state, {
                isFetching: true,
                pricesList: null,
                pricesDataAvailable: false
            })
        case RECEIVE_PRICESDATA:
            return Object.assign({}, state, {
                isFetching: false,
                pricesList: action.pricesList,
                locations: action.locationList,
                pricesDataAvailable: true,
                contractors: action.contractors,
                admin: action.admin
            })
        case PRICESDATA_DIRTY:
            return Object.assign({}, state, {
                pricesDataAvailable: false
            })
        case UPDATE_PRICESDATA:
            let copy = Object.assign({}, state);
            copy.price[action.updateType]= action.value;
            return copy;
            /*switch (action.updateType) {
                case 'price':
                    return Object.assign({}, state, {
                        id: action.value.id,
                        price: action.value.price
                    })
                case 'contractor':
                    return Object.assign({}, state, {
                        newcontractorId: action.value
                    })
            }*/
        case RESET_PRICESDATA:
            return Object.assign({}, state, {
                isAddPriceActive: true,
                price: emprty_price()
            })
        case SHOW_EDIT_PRICE:
            if (action.isEditPriceActive) {
                return Object.assign({}, state, {
                    isEditPriceActive: action.isEditPriceActive,
/*
                    id: action.price.id,
                    contractorId: action.price.contractor ? action.price.contractor.id : null,
                    startroute: action.price.startroute,
                    endroute: action.price.endroute,
                    cents: action.price.cents,
*/
                    price: action.price
                })
            } else {
                return Object.assign({}, state, {
                    isEditPriceActive: action.isEditPriceActive,
                })
            }
        case SHOW_NEW_PRICE:
                return Object.assign({}, state, {
                    isNewPriceActive: action.isNewPriceActive,
                })
        case INIT_PRICE:
            return Object.assign({}, state, {
                price: {contractor: {id:action.contractorId}}
            })
        default:
            return state
    }
}


export default pricesData
