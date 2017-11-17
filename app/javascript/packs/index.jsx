// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Cards from "../components/cards";
import GameHistory from "../components/game_history";
import Mages from "../components/mages";
import Nemeses from "../components/nemeses";
import Randomizer from "../components/randomizer";
import { isEmpty } from "lodash";

/** The url for fetching all the cards. */
const CARDS_URL = "/cards";
/** The url for fetching all the mages. */
const MAGES_URL = "/mages";
/** The url for fetching all the players. */
const PLAYERS_URL = "/players";
/** The url for fetching all the nemeses. */
const NEMESES_URL = "/nemeses";

/**
 * Enumeration of pages.
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
      /** The current page to show to the user. */
      showPage: PAGES.RANDOMIZER,
      /** A hashmap of all the cards in the database.
       * @type {Map<number:object>} a map from card id to the card object.
       */
      cards: {},
      /** A hashmap of all the mages in the database.
       * @type {Map<number:object>} a map from mage id to the mage object.
       */
      mages: {},
      /** A hashmap of all the players in the database.
       * @type {Map<number:object>} a map from player id to the mage object.
       */
      players: {},
      /** A hashmap of all the nemeses in the database.
       * @type {Map<number:object>} a map from nemesis id to the nemesis object.
       */
      nemeses: {}
    };

    this.fetchCards();
    this.fetchMages();
    this.fetchPlayers();
    this.fetchNemeses();
  }

  /**
   * Api call to fetch all cards from the database and set the data in state.
   */
  fetchCards() {
    fetch(CARDS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ cards: data });
    });
  }

  /**
   * Api call to fetch all mages from the database and set the data in state.
   */
  fetchMages() {
    fetch(MAGES_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ mages: data });
    });
  }

  /**
   * Api call to fetch all players from the database and set the data in state.
   */
  fetchPlayers() {
    fetch(PLAYERS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ players: data });
    });
  }

  /**
   * Api call to fetch all nemeses from the database and set the data in state.
   */
  fetchNemeses() {
    fetch(NEMESES_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ nemeses: data });
    })
  }

  /**
   * Sets the state of the page to navigate to upon user click.
   * @param {enum} page - the page to navigate to.
   */
  navigateToPage(page) {
    this.setState({ showPage: page });
  }

  /**
   * Returns a component to render.
   * @return {?component} React component - components include Randomizer,
   * Cards, Mages, Nemeses and GameHistory.
   */
  renderPage() {
    if (isEmpty(this.state.cards) || isEmpty(this.state.mages) ||
        isEmpty(this.state.nemeses)) {
      return null;
    }

    switch (this.state.showPage) {
      case PAGES.RANDOMIZER:
        return <Randomizer cards={ this.state.cards } mages={ this.state.mages }
            nemeses={ this.state.nemeses } players={ this.state.players }/>;
      case PAGES.CARDS:
        return <Cards cards={ this.state.cards } />;
      case PAGES.MAGES:
        return <Mages mages={ this.state.mages }/>;
      case PAGES.NEMESES:
        return <Nemeses nemeses={ this.state.nemeses }/>;
      case PAGES.GAMES:
        return <GameHistory
            cards={ this.state.cards } mages={ this.state.mages }
            nemeses={ this.state.nemeses } players={ this.state.players }/>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        <header className="header">
          <button className="button"
              onClick={ page => this.navigateToPage(PAGES.RANDOMIZER) }>
            Home
          </button>
          <button className="button"
              onClick={ page => this.navigateToPage(PAGES.CARDS) }>
            Cards
          </button>
          <button className="button"
              onClick={ page => this.navigateToPage(PAGES.MAGES) }>
            Mages
          </button>
          <button className="button"
              onClick={ page => this.navigateToPage(PAGES.NEMESES) }>
            Nemeses
          </button>
          <button className="button"
              onClick={ page => this.navigateToPage(PAGES.GAMES) }>
            Game History
          </button>
        </header>

        <main>
          <img src="/images/aeons_end_title.png" alt="Aeon's End Title" />
          { this.renderPage() }
        </main>

        <footer className="footer"></footer>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />,
      document.body.appendChild(document.createElement('div'))
  )
});
