import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Carregando from './Carregando';

class Album extends React.Component {
  state = {
    musica: [],
    carregando: false,
  };

  componentDidMount() {
    this.pesquisa();
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

  render() {
    const { musica, carregando } = this.state;
    if (carregando) {
      return <Carregando />;
    }
    const { props: { match: { params: { id } } } } = this;
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
                  key={ id }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
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
