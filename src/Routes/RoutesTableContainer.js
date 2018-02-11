import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    addRoute, addStartRoute, addRouteActive, addStartRouteActive, editRoute, fetchRoutesDataIfNeeded,
    updateNewRoute, addPriceActive, updatePriceValueOnRoute
} from './actions';
import RoutesTable from "./RoutesTable";
import {savePrice, setPricesDataDirty, updatePriceValue} from "../Prices/actions";

class RoutesTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onAddRouteActive = this.onAddRouteActive.bind(this);
        this.onAddStartRouteActive = this.onAddStartRouteActive.bind(this);
        this.saveRoute = this.saveRoute.bind(this);
        this.saveStartRoute = this.saveStartRoute.bind(this);
        this.updateRouteId = this.updateRouteId.bind(this);
        this.updateStartRouteFromSelect = this.updateStartRouteFromSelect.bind(this);
        this.updateStartRouteFromText = this.updateStartRouteFromText.bind(this);
        this.updateEndRoute = this.updateEndRoute.bind(this);
        this.onAddPrice = this.onAddPrice.bind(this);
        this.cancelAddPrice = this.cancelAddPrice.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
        this.savePrice = this.savePrice.bind(this);

    }

    showResults(values) {
        const v = this.props.values;
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    };

    handleUpdate(index,props) {
        const id = props.data.getObjectAt(index)['id'];
        const cents = props.centValues[index];
        this.props.dispatch(editRoute(id,cents));
    }

    onAddRouteActive(active){
        this.props.dispatch(addRouteActive(active));
    }
    onAddStartRouteActive(active){
        this.props.dispatch(addStartRouteActive(active));
    }

    saveRoute(route){
        this.props.dispatch(addRoute(route));
        this.onAddRouteActive(false);
        this.props.dispatch(setPricesDataDirty());
    }

    saveStartRoute(route){
        this.props.dispatch(addStartRoute(route));
        this.onAddStartRouteActive(false);
    }

/*
    Price
*/
    onAddPrice(route){
        this.props.dispatch(addPriceActive(route,true));

    }
    cancelAddPrice(){
        this.props.dispatch(addPriceActive({},false));

    }
    updatePrice(type, contractorId, event) {
        if (contractorId)
        {
            const value = {id:event.id,name:event.label};
            this.props.dispatch(updatePriceValueOnRoute(type, value));
        } else {
            if (event) {
                const value = event.target.value;
                this.props.dispatch(updatePriceValueOnRoute(type, value));
            }
        }
    }
    savePrice(price) {
        var isNewPrice = true;
        this.props.dispatch(savePrice(price,isNewPrice));
        this.props.dispatch(addPriceActive({},false));
    }
/*
    Start route
*/
    updateStartRouteFromSelect(event) {
        if (event) {
            const value = event.value;
            this.props.dispatch(updateNewRoute('startroute', value));
        }
    }
    updateStartRouteFromText(event) {
        if (event) {
            const value = event.target.value;
            this.props.dispatch(updateNewRoute('startroute', value));
        }
    }

    updateRouteId(event) {
        if (event) {
            const value = event.target.value;
            this.props.dispatch(updateNewRoute('routeid', value));
        }
    }
    updateEndRoute(event) {
        if (event) {
            const value = event.value;
            this.props.dispatch(updateNewRoute('endroute', value));
        }
    }

    render() {
        const {routesDataAvailable} = this.props;
        if (!routesDataAvailable) this.props.dispatch(fetchRoutesDataIfNeeded());
        return (
            <div>
                {!routesDataAvailable && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                {routesDataAvailable && <RoutesTable
                    admin={this.props.admin}
                    routesList={this.props.routesList}
                    onSaveRoute={this.handleUpdate}
                    centValues={this.props.centValues}
                    isAddRouteActive={this.props.isAddRouteActive}
                    isAddStartRouteActive={this.props.isAddStartRouteActive}
                    saveRoute={this.saveRoute}
                    savePrice={this.savePrice}
                    saveStartRoute={this.saveStartRoute}
                    updateRouteId={this.updateRouteId}
                    updateStartRouteFromSelect={this.updateStartRouteFromSelect}
                    updateStartRouteFromText={this.updateStartRouteFromText}
                    updateEndRoute={this.updateEndRoute}
                    route={this.props.route}
                    price={this.props.price}
                    locations={this.props.locations}
                    contractorIdList={this.props.contractorIdList}
                    contractorName={this.props.contractorName}
                    created={this.props.created}
                    onAddRouteActive={this.onAddRouteActive}
                    onAddStartRouteActive={this.onAddStartRouteActive}
                    onAddPrice={this.onAddPrice}
                    cancelAddPrice={this.cancelAddPrice}
                    updatePrice={this.updatePrice}
                    isAddPriceActive={this.props.isAddPriceActive}
                />}
            </div>
        );
    }
}


RoutesTableContainer.propTypes = {
    routesList: PropTypes.object.isRequired,
    routesDataAvailable: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {routesDataAvailable} = state.routesData;
    const {routesList} = state.routesData;
    const {admin} = state.routesData;
    const {centValues} = state.routesData;
    const {addRouteActive} = state.routesData;
    const {addStartRouteActive} = state.routesData;
    const {isAddRouteActive} = state.routesData;
    const {isAddStartRouteActive} = state.routesData;

    const {id} = state.routesData;
    const {startroute} = state.routesData;
    const {endroute} = state.routesData;
    const {isFetching} = state.routesData;
    const {locations} = state.routesData;
    const {created} = state.routesData;
    const {isAddPriceActive} = state.routesData;
    const {cents} = state.routesData;
    const {contractorIdList} = state.routesData;
    const {contractorId} = state.routesData;
    const {contractorName} = state.routesData;

    return {
        routesList: routesList,
        admin:admin,
        routesDataAvailable,
        centValues,
        addRouteActive,
        addStartRouteActive,
        isFetching,
        isAddRouteActive,
        isAddStartRouteActive,
        locations,
        contractorIdList,
        contractorId,
        contractorName,
        created,
        isAddPriceActive,
        route: {id: id, startroute:startroute, endroute: endroute},
        price: {routeId: id,contractorId: contractorId,startroute:startroute, endroute: endroute,cents: cents}
    }
}




const mapDispatchToProps = (dispatch) => {
    return {
        onEditRouteClick: (values) => {
            dispatch(editRoute(values))
        },
        dispatch : dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RoutesTableContainer)

