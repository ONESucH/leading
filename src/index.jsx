/* Модули */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Регистрируем компоненты */
import MainComponent from './app/Main/Main.component';
import RegisterComponent from './app/Register/Register.component';
import SignInComponent from './app/SignIn/SignIn.component';

/* Стили */
import './index.less';

export default class Root extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="max-size-window">

                    <Switch>
                        <Route exact path='/' component={MainComponent} />
                        <Route path='/reg' component={RegisterComponent} />
                        <Route path='/sign-in' component={SignInComponent} />
                    </Switch>
                    
                </div>
            </div>
        )
    }
}

ReactDOM.render((
    <BrowserRouter>
        <Root />
    </BrowserRouter>
), document.getElementById('root'));