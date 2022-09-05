import { event } from 'jquery';
import React from 'react';
import Header from './Header';


const Min =2;
class Search extends React.Component {
  state={
    inputPesquisa: '',
    submitPesquisaDis: true, 
  }

  handleChange=(event)=>{
    const {value } = event.target
    this.setState({inputPesquisa: value})
    {value.length>=Min ? this.setState({submitPesquisaDis: false}):
  this.setState({submitPesquisaDis: true})}
  }

  render() {
    const {inputPesquisa, submitPesquisaDis} = this.state

    return (
      
      <div data-testid="page-search">
        <Header />
        <form>
          <input 
          type="text" 
          name="input" 
          data-testid="search-artist-input"
          value={inputPesquisa} 
          onChange={this.handleChange}
          />
          <button 
          type="button"
          data-testid="search-artist-button"
          disabled={submitPesquisaDis}
          >Pesquisar</button>
        </form>
      </div>
    );
  }
}

export default Search;
