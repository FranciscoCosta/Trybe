import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musica: [],
    carregando: false,
    favMusic: [],
  };

  componentDidMount() {
    this.pesquisa();
    this.musicasFav();
  }

  pesquisa = async () => {
    const { props: { match: { params: { id } } } } = this;
    this.setState({ carregando: true });
    const resultadoApi = await getMusics(id);
    this.setState({
      musica: resultadoApi,
      carregando: false,
    });
  };

  musicasFav = async () => {
    const favs = await getFavoriteSongs();
    this.setState({
      carregando: false, favMusic: favs,
    });
  };

  verifica(idM) {
    const { favMusic } = this.state;
    const valor = favMusic.find((musica) => (musica.trackId === idM));
    return valor;
  }

  render() {
    const { musica, carregando, favMusic } = this.state;
    if (carregando) {
      return <Carregando />;
    }
    return (

      <div data-testid="page-album">
        <Header />
        <div>
          {musica.length > 0 && (
            <div>
              <h2 data-testid="artist-name">
                {' '}
                {musica[0].artistName}
              </h2>
              <h2 data-testid="album-name">
                {' '}
                {musica[0].collectionName}
              </h2>
            </div>
          )}
        </div>
        {
          musica.length > 0 && (
            musica.map((music, index) => (
              index > 0 && (
                <MusicCard
                  key={ index }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  dados={ music }
                  fav={ favMusic }
                  verificado={ this.verifica(music.trackId) }
                />
              )
            ))
          )
        }
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
export default Album;
