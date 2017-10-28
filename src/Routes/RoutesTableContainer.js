import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {addRoute, addRouteActive, editRoute, fetchRoutesDataIfNeeded, updateNewRoute} from './actions';
import RoutesTable from "./RoutesTable";

class RoutesTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.onAddRoute = this.onAddRoute.bind(this);
        this.saveRoute = this.saveRoute.bind(this);
        this.updateStartRoute = this.updateStartRoute.bind(this);
        this.updateEndRoute = this.updateEndRoute.bind(this);

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

    onAddRoute(active){
        this.props.dispatch(addRouteActive(active));
    }

    saveRoute(route){
        this.props.dispatch(addRoute(route));
        this.onAddRoute(false);
    }

    updateStartRoute(event) {
        if (event) {
            const value = event.value;
            this.props.dispatch(updateNewRoute('startroute', value));
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
                    addRouteActive={this.onAddRoute}
                    isAddRouteActive={this.props.isAddRouteActive}
                    saveRoute={this.saveRoute}
                    updateStartRoute={this.updateStartRoute}
                    updateEndRoute={this.updateEndRoute}
                    route={this.props.route}
                    locations={this.props.locations}
                    created={this.props.created}

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
    const {isAddRouteActive} = state.routesData;

    const {startroute} = state.routesData;
    const {endroute} = state.routesData;
    const {isFetching} = state.routesData;
    const {locations} = state.routesData;
    const {created} = state.routesData;

    return {
        routesList: routesList,
        admin:admin,
        routesDataAvailable,
        centValues,
        addRouteActive,
        isFetching,
        isAddRouteActive,
        locations,
        created,
        route: {startroute:startroute, endroute: endroute}
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

