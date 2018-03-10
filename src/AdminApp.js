import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import AdminAppbar from './Header/AdminAppbar';

import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import FinanceTableContainer from './Finance/Finance';
import Booking from './Booking/Booking';
import logo from './logo.svg';
import {
    loginLogoutWithToken,
    LOGIN, getLoginDetails
} from './Header/actions'
import Contractors from "./Contractors/Contractors";
import Prices from "./Prices/Prices";

/*import {getRouteDescription, getFormatedPrice,getPickup}
 from '../util/formatter';*/

class AdminApp extends Component {
    constructor(props) {
        super(props);
    }

    login = (response) => {
        localStorage.setItem("tokenId", response.tokenId);
        const {dispatch} = this.props;
        dispatch(loginLogoutWithToken(true,response.profileObj.email));
        dispatch(getLoginDetails());
    }
    logout = (response) => {
        localStorage.setItem("tokenId", null);
        const {dispatch} = this.props;
        dispatch(loginLogoutWithToken(false));
    }

    render() {

        const {src} = this.props;
        const {match} = this.props;

        const {pathname} = this.props.location;
        const {loggedIn} = this.props;
        const {admin} = this.props;
        const {loginName} = this.props;
        const {validated} = this.props;
        const finance = (pathname==='' || pathname==='finance'|| pathname==='/finance') && validated;
        const booking = (pathname===''|| pathname==='/booking') && validated;
        const routes = (pathname===''|| pathname==='/routes') && validated && admin;
        const contractors = (pathname===''|| pathname==='/contractors') && validated && admin;
        const prices = (pathname===''|| pathname==='/prices') && validated;

        return (
            <div>
                <AdminAppbar
                    loggedIn={loggedIn}
                    loginName={this.props.loginName}
                    login={this.login}
                    logout={this.logout}
                    validated={this.props.validated}
                    admin={this.props.admin}
                />
                {finance && <FinanceTableContainer/>}
                {booking && <Booking/>}
                {contractors && <Contractors/>}
                {prices && <Prices/>}

            </div>
        )
    }
}


AdminApp.propTypes = {
    // onSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const loggedIn = state.financeData.loggedIn;
    const {loginName} = state.financeData;
    const {validated} = state.financeData;
    const {admin} = state.financeData;
    return {
        loginName,
        loggedIn,
        admin,
        validated
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
