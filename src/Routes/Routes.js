import React, {Component} from 'react';
import Request from 'react-http-request';
import Links from '../Links/Links';
import RoutesTableContainer from './RoutesTableContainer';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
const BookingHeader = () => <div><Links /><h1>Booking</h1></div>;

const
    Routes = () => <div><RoutesTableContainer/></div>;



export default Routes;
