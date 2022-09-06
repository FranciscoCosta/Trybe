import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

const Min = 3;
class Login extends React.Component {
  state = {
    btnlogin: true,
    carrengado: false,
    submit: false,
    name: '',
  };

  hadleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ name: value });
    if (value.length < Min) {
      this.setState({ btnlogin: true });
    } else {
      this.setState({ btnlogin: false });
    }
  };

  handleClick = () => {
    const { name } = this.state;
    this.setState({ submit: true,
      carrengado: true }, async () => {
      await createUser({ name });
      this.setState({ carrengado: false });
    });
  };

  render() {
    const { btnlogin, name, carrengado, submit } = this.state;
    if (carrengado) return <Carregando />;
    if (!carrengado && submit) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login" className="container-login">
        <form className="form-login">
          <label htmlFor="nome">
            Name:
            <input
              type="text"
              name="name"
              id="nome"
              data-testid="login-name-input"
              className="input-login"
              onChange={ this.hadleInputChange }
              value={ name }
              placeholder="Login"
            />
          </label>
          <button
            type="button"
            name="input-name"
            data-testid="login-submit-button"
            disabled={ btnlogin }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
