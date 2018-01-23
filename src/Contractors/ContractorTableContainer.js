import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    addContractorActive, addNewContractorActive, fetchContractorDataIfNeeded, saveContractor, updateContractor,
    updateContractorValue
} from './actions';
import ContractorTable from "./ContractorTable";

class ContractorTableContainer extends React.Component {
    constructor(props) {
        super(props);
        this.showNewContractor = this.showNewContractor.bind(this);
        this.onAddContractorActive = this.onAddContractorActive.bind(this);
        this.saveContractor = this.saveContractor.bind(this);
        this.updateContractor = this.updateContractor.bind(this);
        this.modifyContractor = this.modifyContractor.bind(this);
    }

    showNewContractor() {
        this.props.dispatch(addNewContractorActive());

    }

    onAddContractorActive(active) {
        this.props.dispatch(addContractorActive(active));

    }

    saveContractor(contractor) {
        this.props.dispatch(saveContractor(contractor));
        this.onAddContractorActive(false);
    }

    modifyContractor(contractor) {
        this.props.dispatch(updateContractorValue('contractor',contractor));
        this.onAddContractorActive(true);
    }

    updateContractor(type,event) {
        if (event) {
            const value = event.target.value;
            this.props.dispatch(updateContractorValue(type, value));
        }
    }


        render() {
        const {contractorsDataAvailable} = this.props;
        if (!contractorsDataAvailable) this.props.dispatch(fetchContractorDataIfNeeded());
        return (
            <div>
                {!contractorsDataAvailable && <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>}
                {contractorsDataAvailable && <ContractorTable
                    admin={this.props.admin}
                    contractorsList={this.props.contractorsList}
                    saveContractor={this.saveContractor}
                    modifyContractor={this.modifyContractor}
                    updateContractor={this.updateContractor}
                    onAddContractorActive={this.onAddContractorActive}
                    showNewContractor={this.showNewContractor}
                    contractor={this.props.contractor}
                    isAddContractorActive={this.props.isAddContractorActive}
                />}
            </div>
        );
    }
}


ContractorTableContainer.propTypes = {
    contractorsList: PropTypes.object.isRequired,
    contractorsDataAvailable: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    const {contractorsDataAvailable} = state.contractorsData;
    const {contractorsList} = state.contractorsData;
    const {admin} = state.contractorsData;
    const {isAddContractorActive} = state.contractorsData;

    return {
        contractorsList: contractorsList,
        admin: admin,
        contractorsDataAvailable,
        isAddContractorActive,
        contractor: {
            id: state.contractorsData.id,
            name: state.contractorsData.name,
            address1: state.contractorsData.address1,
            address2: state.contractorsData.address2,
            address3: state.contractorsData.address3,
            address4: state.contractorsData.address4,
            email: state.contractorsData.email}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContractorTableContainer)

