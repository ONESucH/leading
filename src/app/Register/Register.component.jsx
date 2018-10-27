/* Модули */
import React from 'react';

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
                               type="text"
                               value={this.state.name}
                               onChange={this.serializeData}
                               placeholder="Имя"
                               required />
                    </label>
                    <label>
                        <input name="nick_name"
                               type="text"
                               value={this.state.nick_name}
                               onChange={this.serializeData}
                               placeholder="Никнем"
                               required />
                    </label>
                    <label>
                        <input name="phone"
                               type="text"
                               value={this.state.phone}
                               onChange={this.serializeData}
                               placeholder="Телефон"
                               required />
                    </label>
                    <label>
                        <input name="pass"
                               type="password"
                               value={this.state.pass}
                               onChange={this.serializeData}
                               placeholder="Пароль будет скрыт"
                               required />
                    </label>
                    <label>
                        <input name="pass_confirm"
                               type="password"
                               value={this.state.pass_confirm}
                               onChange={this.serializeData}
                               placeholder="Повторите пароль"
                               required />
                    </label>
                    <label>
                        <input type="submit" value="отправить" />
                    </label>
                </form>
            </div>
        )
    }
}
