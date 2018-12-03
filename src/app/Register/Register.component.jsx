/* Модули */
import React from 'react';
import {Link} from 'react-router-dom';
import InputMask from 'react-input-mask';
import { ApiLocation } from '../../components/api/api_location';

/* Стили */
import './Register.component.less';

export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nick_name: '',
            phone: '',
            pass: '',
            pass_confirm: '',

            pattern_name: '^[a-zA-Zа-яА-ЯёЁ]{4,25}',
            pattern_nick_name: '^[a-zA-Z0-9]{4,20}',
            pattern_phone: '[0-9()+-]{0,16}',
            pattern_pass: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,50}',
            pattern_pass_confirm: '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,50}',

            form_err: false,
            pass_err: false,
            nick_err: false,

            rootValidate: false
        };

        this.formReset = this.state; // запишем состоянием в пустом виде

        this.serializeData = this.serializeData.bind(this);
        this.saveData = this.saveData.bind(this);
        this.patternValidate = this.patternValidate.bind(this);
    }

    serializeData(e) {
        let name = e.target.name, // будем призводить поиск по name - атрибуту
            pattern = e.target.getAttribute('pattern'); // активный тег со своим паттерном

        this.setState({
            [name]: e.target.value // запишем состояние по атрибуту
        });

        this.patternValidate(name, pattern);
    }

    patternValidate(name, pattern) {
        if (this.state['pattern_'+name] !== pattern) {
            this.setState({
                rootValidate: true
            });
            return false;
        } else {
            this.setState({
                rootValidate: false
            })
        }
    }

    saveData(e) {

        // Проверяем что все паттерны на месте и схожы с заданными атррибутами
        if (this.state.rootValidate) return false;

        e.preventDefault();

        // Защита на удаление аттрибута
        if (e.target.hasAttribute('noValidate')) return false;

        // Если пароль схож с примером
        if (this.state.pass === '1234AAbb' || this.state.pass_confirm === '1234AAbb') {
            return false;
        }

        // Пароли не совпадают
        if (this.state.pass !== this.state.pass_confirm) {
            this.setState({
                pass_err: true
            });
            return false;
        } else {

            let user = {
                name: this.state.name,
                nick_name: this.state.nick_name,
                phone: this.state.phone,
                pass: this.state.pass,
                pass_confirm: this.state.pass_confirm
            };

            // Из промисса вытащим json
            ApiLocation().then((res) => {
                user.reg_location = res;
                return res;
            });

            console.log('Все хорошо', user);

            this.setState(this.formReset); // вернет пустое состояние
        }
    }

    render() {
        return (
            <div className="app-Register">
                <form className="form" onSubmit={this.saveData}>
                    <h4>Зарегистрируйтесь</h4>
                    {this.state.form_err && (<div className="form-no-valid">Есть пустые формы</div>)}
                    <label>
                        <input
                            name="name"
                            type="text"
                            pattern={this.state.pattern_name}
                            value={this.state.name}
                            onChange={this.serializeData}
                            placeholder="Имя"
                            autoFocus
                            required/>
                    </label>
                    {this.state.nick_err && (<div className="form-no-valid">Никнейм уже использется</div>)}
                    <label>
                        <input
                            name="nick_name"
                            type="text"
                            pattern={this.state.pattern_nick_name}
                            value={this.state.nick_name}
                            onChange={this.serializeData}
                            placeholder="Никнем"
                            required/>
                    </label>
                    <label>
                        <InputMask
                            name="phone"
                            type="text"
                            pattern={this.state.pattern_phone}
                            value={this.state.phone}
                            onChange={this.serializeData}
                            placeholder="+9(999)999-99-99"
                            mask="+9(999)999-99-99"
                            required/>
                    </label>
                    {this.state.pass_err && (<div className="form-no-valid">Пароли не совпадают</div>)}
                    <label>
                        <input
                            name="pass"
                            type="password"
                            pattern={this.state.pattern_pass}
                            value={this.state.pass}
                            onChange={this.serializeData}
                            placeholder="Пароль будет скрыт"
                            title="Пример: 1234AAbb"
                            required/>
                    </label>
                    <label>
                        <input
                            name="pass_confirm"
                            type="password"
                            pattern={this.state.pattern_pass_confirm}
                            value={this.state.pass_confirm}
                            onChange={this.serializeData}
                            placeholder="Повторите пароль"
                            title="Пример: 1234AAbb"
                            required/>
                    </label>
                    <label>
                        <input type="submit" value="отправить"/>
                    </label>
                    <div className="sign-in">
                        <Link to="/sign-in">Войти</Link>
                    </div>
                </form>
            </div>
        )
    }
}
