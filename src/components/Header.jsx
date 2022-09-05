import React from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carrengando';

class Header extends React.Component {
  state = {
    carregando: false,
    utilizador: '',
  };

  componentDidMount() {
    this.handleChange();
  }

  handleChange = () => {
    this.setState({ carregando: true }, async () => {
      const users = await getUser();
      this.setState({ utilizador: users, carregando: false });
    });
  };

  render() {
    const { carregando, utilizador } = this.state;
    console.log(utilizador);
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">
          {' '}
          {carregando ? <Carregando /> : utilizador.name}
        </div>
      </header>
    );
  }
}

export default Header;
