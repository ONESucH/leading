/* Модули */
import React from 'react';
import { Link } from 'react-router-dom';

/* Стили */
import './Header.component.less';

export default class HeaderComponent extends React.Component {
    render() {
        return (
            <Link to="/" className="app-Header">Header component loaded!</Link>
        )
    }
}
