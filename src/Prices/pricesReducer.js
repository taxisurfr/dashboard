import TableStore from './../util/TableStore';
import {
    REQUEST_PRICESDATA, RECEIVE_PRICESDATA, UPDATE_PRICESDATA,
    SHOW_ADD_PRICE_STATUS_CHANGE,
    RESET_PRICESDATA,
    UPDATE_NEW_PRICESDATA
} from '../Prices/actions';
import {SHOW_EDIT_PRICE} from "./actions";

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
                admin: action.admin
            })
        case UPDATE_PRICESDATA:
            switch (action.updateType) {
                case 'price':
                    return Object.assign({}, state, {
                        id: action.value.id,
                        price: action.value.price
                    })
                case 'startroute':
                    return Object.assign({}, state, {
                        startroute: action.value
                    })
                case 'endroute':
                    return Object.assign({}, state, {
                        endroute: action.value
                    })
                case 'cents':
                    return Object.assign({}, state, {
                        cents: action.value
                    })
            }

        case RESET_PRICESDATA:
            return Object.assign({}, state, {
                isAddPriceActive: true,
                price: emprty_price()
            })
        case SHOW_EDIT_PRICE:
            if (action.isEditPriceActive) {
                return Object.assign({}, state, {
                    isEditPriceActive: action.isEditPriceActive,
                    id: action.price.id,
                    routeId: action.price.route.id,
                    contractorId: action.price.contractor ? action.price.contractor.id : null,
                    startroute: action.price.route.startroute,
                    endroute: action.price.route.endroute,
                    cents: action.price.cents
                })
            } else {
                return Object.assign({}, state, {
                    isEditPriceActive: action.isEditPriceActive,
                })
            }

        default:
            return state
    }
}


export default pricesData
