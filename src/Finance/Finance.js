import React, {Component} from 'react';
import Request from 'react-http-request';
import FinanceTableContainer from './FinanceTableContainer';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
//const FinanceHeader = () => <div className="mui--text-headline"><Links /><h1>Finance</h1></div>;

const rows = [
    {releaseYear: '2222', title: 'xxxx'},
    {releaseYear: '2222', title: 'xxxx'},
    {releaseYear: '2222', title: 'xxxx'},
    {releaseYear: '2222', title: 'xxxx'}
    // .... and more
];

const
    Finance = () => <div><FinanceTableContainer/></div>;



export default Finance;
