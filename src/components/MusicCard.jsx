import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    carregado: true,
    chekado: false,
  };

  toggle = () => {
    const { chekado } = this.state;
    this.setState({ chekado: !chekado });
  };

  handleCheked = async () => {
    const { dados } = this.props;
    this.setState({ carregado: false });
    await addSong(dados.id);
    this.setState({ carregado: true });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    console.log(trackId);
    const { carregado, chekado } = this.state;
    return (
      <div>
        {!carregado ? (
          <Carregando />
        ) : (
          <div>
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                checked={ chekado }
                onChange={ this.handleCheked }
                onClick={ this.toggle }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
