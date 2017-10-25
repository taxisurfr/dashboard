"use strict";


import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import  {fetchBookingDataIfNeeded,cancelBooking} from './actions';
import BookingTable from "./BookingTable";

class BookingTableContainer extends React.Component {
    constructor() {
        super();
    };


    render() {
        const bookingDataAvailable = this.props.bookingDataAvailable;
        if (!bookingDataAvailable)this.props.dispatch(fetchBookingDataIfNeeded());
        return (
            <div>
                {!bookingDataAvailable && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                {bookingDataAvailable && <BookingTable
                    admin={this.props.admin}
                    bookingList={this.props.bookingList}
                    onCancel={this.props.onCancelBookingClick}/>}
            </div>
        );
    }
}

BookingTableContainer.propTypes = {
    bookingList: PropTypes.object.isRequired,
    bookingDataAvailable: PropTypes.bool.isRequired,
    onCancelBookingClick: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {bookingDataAvailable} = state.bookingData;
    const {bookingList} = state.bookingData;
    const {admin} = state.bookingData;
    const {
        isFetching
    } = bookingList || {
        isFetching: true,
        bookingList: {}
    }

    return {
        isFetching: false,
        bookingList: bookingList,
        admin:admin,
        bookingDataAvailable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCancelBookingClick: (id) => {
            console.log('cancelling row'+id);
            dispatch(cancelBooking(id))
        },
        dispatch : dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BookingTableContainer)

