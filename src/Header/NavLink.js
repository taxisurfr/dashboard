import React from 'react'
import { Link } from 'react-router'
import {MenuItem} from "react-bootstrap";

var style = {
    color: 'white',
    fontSize: 24,
    border: '20px solid blue'
};
export default React.createClass({
    render() {
        return <Link to="first" style={{ textDecoration: 'none' }} {...this.props}>
            <MenuItem style={{ paddingLeft: 13 }}>Team 1</MenuItem>
        </Link>
    }
})