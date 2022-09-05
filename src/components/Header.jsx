import React from 'react';
import { Link } from 'react-router-dom';
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
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>

        </nav>
      </header>
    );
  }
}

export default Header;
