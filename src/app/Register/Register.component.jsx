/* Модули */
import React from 'react';
import {Link} from 'react-router-dom';
import InputMask from 'react-input-mask';

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

            patternName: '^[a-zA-Zа-яА-ЯёЁ]{4,25}',
            patternNick_name: '^[a-zA-Z0-9]{4,20}',
            patternPhone: '[0-9()+-]{0,16}',
            patternPass: '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}',
            patternPass_confirm: '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}',

            form_err: false,
            pass_err: false,
            nick_err: false
        };

        this.formReset = this.state; // запишем состоянием в пустом виде

        this.serializeData = this.serializeData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    serializeData(e) {
        let name = e.target.name; // будем призводить поиск по name - атрибуту

        this.setState({
            [name]: e.target.value // запишем состояние по атрибуту
        })
    }

    saveData(e) {
        e.preventDefault();

        let findsInputs = e.target.getElementsByTagName('input'),
            counter = 0;

        // Проверяем инпуты на паттерны и их правильность валидации
        for(let letter = 0; letter < findsInputs.length-1; letter++) {

            for (let key in this.state) {

                if (this.state[key] === findsInputs[letter].pattern || counter === findsInputs.length-2) {

                    if (counter >= 0 && counter <= findsInputs.length-2) counter++;

                }
            }
        }

        // Проверка на количество инпутов
        if (counter !== findsInputs.length-1) return false;

        // Проверяем пустые формы
        if (this.state.name == '' ||
            this.state.nick_name == '' ||
            this.state.phone == '' ||
            this.state.pass == '' ||
            this.state.pass_confirm == '') {
            this.setState({
                form_err: true
            });
            return false;
        } else if (this.state.pass !== this.state.pass_confirm) {
            this.setState({
                pass_err: true
            });
            return false;
        } else {
            console.log('Все хорошо', this.state);

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
                            pattern={this.state.patternName}
                            type="text"
                            value={this.state.name}
                            onChange={this.serializeData}
                            placeholder="Имя"
                            required/>
                    </label>
                    {this.state.nick_err && (<div className="form-no-valid">Никнейм уже использется</div>)}
                    <label>
                        <input
                            name="nick_name"
                            type="text"
                            pattern={this.state.patternNick_name}
                            value={this.state.nick_name}
                            onChange={this.serializeData}
                            placeholder="Никнем"
                            required/>
                    </label>
                    <label>
                        <InputMask
                            name="phone"
                            type="text"
                            pattern={this.state.patternPhone}
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
                            pattern={this.state.patternPass}
                            value={this.state.pass}
                            onChange={this.serializeData}
                            placeholder="Пароль будет скрыт"
                            required/>
                    </label>
                    <label>
                        <input
                            name="pass_confirm"
                            type="password"
                            pattern={this.state.patternPass_confirm}
                            value={this.state.pass_confirm}
                            onChange={this.serializeData}
                            placeholder="Повторите пароль"
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
