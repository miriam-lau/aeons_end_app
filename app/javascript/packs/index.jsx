// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cards from '../components/cards';
import GameHistory from '../components/game_history';
import Mages from '../components/mages';
import Nemeses from '../components/nemeses';
import Randomizer from '../components/randomizer';

/**
 * Enum of pages.
 */
const PAGES = {
  RANDOMIZER: 1,
  CARDS: 2,
  MAGES: 3,
  NEMESES: 4,
  GAMES: 5,
}

/**
 * Main page of App.
 */
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      /** enum value of page to show */
      showPage: PAGES.RANDOMIZER,
      /** all cards from database */
      cards: [],
      /** all mages from database */
      mages: [],
      /** all nemeses from database */
      nemeses: []
    };

    this.fetchCards();
    this.fetchMages();
    this.fetchNemeses();
  }

  /**
   * Api call to fetch all cards from database and sets the data in state.
   */
  fetchCards() {
    fetch("http://localhost:3000/cards").then(response => {
      console.log("FETCH CARDS RESPONSE");
      return response.json();
    }).then(data => {
      console.log("CARDS DATA", data);
      this.setState({ cards: data });
    });
  }

  /**
   * Api call to fetch all mages from database and sets the data in state.
   */
  fetchMages() {
    fetch("http://localhost:3000/mages").then(response => {
      console.log("FETCH MAGES RESPONSE");
      return response.json();
    }).then(data => {
      console.log("MAGES DATA", data);
      this.setState({ mages: data });
    });
  }

  /**
   * Api call to fetch all nemeses from database and sets the data in state.
   */
  fetchNemeses() {
    fetch("http://localhost:3000/nemeses").then(response => {
      console.log("FETCH NEMESES RESPONSE");
      return response.json();
    }).then(data => {
      console.log("NEMESES DATA", data);
      this.setState({ nemeses: data });
    })
  }

  /**
   * On button click, sets the state of the page to render.
   * @param{e} event
   * @param{enum} value
   */
  handleClick(e, value) {
    this.setState({ showPage: value });
  }

  render() {
    return (
      <div>
        <header className="header">
          <button onClick={ (e, value) => this.handleClick(e, PAGES.RANDOMIZER) }>
            Home
          </button>
          <button onClick={ (e, value) => this.handleClick(e, PAGES.CARDS) }>
            Cards
          </button>
          <button onClick={ (e, value) => this.handleClick(e, PAGES.MAGES) }>
            Mages
          </button>
          <button onClick={ (e, value) => this.handleClick(e, PAGES.NEMESES) }>
            Nemeses
          </button>
          <button onClick={ (e, value) => this.handleClick(e, PAGES.GAMES) }>
            Game History
          </button>
        </header>

        <main>
          <img src="/images/aeons_end_title.png" alt="Aeon's End Title" />
          { this.state.showPage === PAGES.RANDOMIZER ? <Randomizer /> : "" }
          { (this.state.showPage === PAGES.CARDS && this.state.cards.length > 0)
              ? <Cards cards={ this.state.cards } /> : "" }
          { (this.state.showPage === PAGES.MAGES && this.state.mages.length > 0)
              ? <Mages mages={ this.state.mages }/> : "" }
          { (this.state.showPage === PAGES.NEMESES && this.state.nemeses.length > 0)
              ? <Nemeses nemeses={ this.state.nemeses }/> : "" }
          { this.state.showPage === PAGES.GAMES ? <GameHistory /> : "" }
        </main>

        <footer className="footer"></footer>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
});
