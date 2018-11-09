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
            form_err: false
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

        console.log('Отправляем', this.state);

        this.setState(this.formReset); // вернет пустое состояние
    }

    render() {
        return (
            <div className="app-Register">
                <form className="form" onSubmit={this.saveData}>
                    <h4>Зарегистрируйтесь</h4>
                    {this.form_err && (<span>Форма не валидна</span>)}
                    <label>
                        <input name="name"
                               pattern="^[a-zA-Zа-яА-ЯёЁ]+$"
                               type="text"
                               value={this.state.name}
                               onChange={this.serializeData}
                               placeholder="Имя"
                               required />
                    </label>
                    <label>
                        <input name="nick_name"
                               type="text"
                               pattern="^[a-zA-Z0-9]+$"
                               value={this.state.nick_name}
                               onChange={this.serializeData}
                               placeholder="Никнем"
                               required />
                    </label>
                    <label>
                        <InputMask name="phone"
                               type="text"
                               pattern="[0-9()+-]{0,16}"
                               value={this.state.phone}
                               onChange={this.serializeData}
                               placeholder="+9(999)999-99-99"
                               mask="+9(999)999-99-99"
                               required />
                    </label>
                    <label>
                        <input name="pass"
                               type="password"
                               pattern="^[a-zA-Z0-9]{6,30}"
                               value={this.state.pass}
                               onChange={this.serializeData}
                               placeholder="Пароль будет скрыт"
                               required />
                    </label>
                    <label>
                        <input name="pass_confirm"
                               type="password"
                               pattern="^[a-zA-Z0-9]{6,30}"
                               value={this.state.pass_confirm}
                               onChange={this.serializeData}
                               placeholder="Повторите пароль"
                               required />
                    </label>
                    <label>
                        <input type="submit" value="отправить" />
                    </label>
                    <div className="sign-in">
                        <Link to="/sign-in">Войти</Link>
                    </div>
                </form>
            </div>
        )
    }
}
