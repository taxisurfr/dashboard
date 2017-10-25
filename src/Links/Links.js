import React from 'react';
import {Link} from 'react-router';

const Links = () =>
    <nav>
        <Link className="mui--text-headline" to="finance">Finance  </Link>
        <Link className="mui--text-headline" to="booking">Booking</Link>
        <Link className="mui--text-headline" to="routes">Routes</Link>
    </nav>
export default Links;
