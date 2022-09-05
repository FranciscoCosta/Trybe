import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const Min = 2;
class Search extends React.Component {
  state = {
    inputPesquisa: '',
    submitPesquisaDis: true,
    album: [],
    nomeartista: '',
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ inputPesquisa: value });
    if (value.length < Min) {
      this.setState({ submitPesquisaDis: true });
    } else {
      this.setState({ submitPesquisaDis: false });
    }
  };

  handleClick = () => {
    const { inputPesquisa } = this.state;
    const chamda = async () => {
      const resultdo = await searchAlbumsAPI(inputPesquisa);
      this.setState({
        nomeartista: inputPesquisa,
        inputPesquisa: '',
        album: resultdo,
        submitPesquisaDis: true,
      });
    };
    chamda();
  };

  render() {
    const { nomeartista, inputPesquisa, submitPesquisaDis, album } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="input"
            data-testid="search-artist-input"
            value={ inputPesquisa }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ submitPesquisaDis }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
          {!album.length ? (
            'Nenhum álbum foi encontrado'
          ) : (
            <div>
              <h4>
                Resultado de álbuns de:
                {' '}
                {nomeartista}
              </h4>
              {album.map((artista) => (
                <div key={ artista.collectionId }>
                  <img src={ artista.artworkUrl100 } alt={ artista.artistName } />
                  <h2>{artista.artistName}</h2>
                  <p>{artista.collectionPrice}</p>
                  <p>{artista.trackCount}</p>
                  <p>{artista.releaseDate}</p>
                  <Link
                    to={ `/album/${artista.collectionId}` }
                    data-testid={ `link-to-album-${artista.collectionId}` }
                  >
                    {artista.collectionName}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
