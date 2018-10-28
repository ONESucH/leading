/* Модули */
import React from 'react';
import { Link } from 'react-router-dom'; // Модуль для кнопки перехода

/* Стили */
import './Main.component.less';
import HeaderComponent from "../Header/Header.component";
import FooterComponent from "../Footer/Footer.component";

export default class MainComponent extends React.Component {
    
    constructor(props) {
        super (props);

    }

    
    render() {
        
        return (
            <div className="app-Main">
                <HeaderComponent />
                <div className="main">
                    <Link to="/reg">reg</Link><br />
                    <Link to="/sign-in">sign-in</Link>
                </div>
                <FooterComponent />
            </div>
        )
    }
}
