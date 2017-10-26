"use strict";


import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    fetchFinanceDataIfNeeded,
    transferActive,
    setTransferName,
    setTransferAmount,
    cancelBooking,
    saveTransferOnServer
} from './actions';
import PaymentTable from "./PaymentTable";
import TransferTable from "./TransferTable";
import SummaryTable from "./SummaryTable";

class FinanceTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onTransfer = this.onTransfer.bind(this);
        this.saveTransfer = this.saveTransfer.bind(this);
        this.transferNameChange = this.transferNameChange.bind(this);
        this.transferAmountChange = this.transferAmountChange.bind(this);

    };

    onTransfer(active) {
        const {dispatch} = this.props;
        dispatch(transferActive(active));
    }

    saveTransfer() {
        const {dispatch} = this.props;
        dispatch(saveTransferOnServer(this.props.transferAmount * 100, this.props.transferName));
    }

    transferNameChange(e) {
        const {dispatch} = this.props;
        dispatch(setTransferName(e.target.value));
    }

    transferAmountChange(e) {
        const {dispatch} = this.props;
        dispatch(setTransferAmount(e.target.value));
    }

    render() {
        const financeDataAvailable = this.props.financeDataAvailable;
        if (!financeDataAvailable) this.props.dispatch(fetchFinanceDataIfNeeded());
        return (
            <div>
                {!financeDataAvailable && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                {financeDataAvailable &&
                <div>
                    <PaymentTable paymentList={this.props.paymentList}
                                  onCancel={this.props.onCancelBookingClick}/>
                    < TransferTable
                        transferActive={this.props.transferActive}
                        transferList={this.props.transferList}
                        admin={this.props.admin}
                        onTransfer={this.onTransfer}
                        transferName={this.props.transferName}
                        transferNameChange={this.transferNameChange}
                        transferAmountChange={this.transferAmountChange}
                        saveTransfer={this.saveTransfer}
                    />
                    <SummaryTable summaryList={this.props.summaryList}/>
                </div>
                }
            </div>
        );
    }
}

FinanceTableContainer.propTypes = {
    transferName: PropTypes.string.isRequired,
    paymentList: PropTypes.object.isRequired,
    transferList: PropTypes.object.isRequired,
    financeDataAvailable: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    onCancelBookingClick: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {financeDataAvailable} = state.financeData;
    const {paymentList} = state.financeData;
    const {transferList} = state.financeData;
    const {summaryList} = state.financeData;
    const {admin} = state.financeData;
    const {transferActive} = state.financeData;
    const transferName = state.financeData.transferName ? state.financeData.transferName : '';
    const {transferAmount} = state.financeData;
    const {
        isFetching
    } = paymentList || {
        isFetching: true,
        paymentList: {}
    }

    return {
        isFetching: false,
        paymentList: paymentList,
        transferList: transferList,
        summaryList: summaryList,
        admin: admin,
        transferActive: transferActive,
        transferName: transferName,
        transferAmount: transferAmount,
        financeDataAvailable: financeDataAvailable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCancelBookingClick: (id) => {
            console.log('cancelling row' + id);
            dispatch(cancelBooking(id))
        },
        dispatch: dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FinanceTableContainer)

