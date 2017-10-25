import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {editRoute, fetchRoutesDataIfNeeded} from './actions';
import RoutesTable from "./RoutesTable";

class RoutesTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showResults = this.showResults.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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

    return {
        routesList: routesList,
        admin:admin,
        routesDataAvailable,
        centValues
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

