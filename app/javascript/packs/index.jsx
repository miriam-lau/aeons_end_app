// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from "react";
import ReactDOM from "react-dom";

import Cards from "../components/cards";
import GameHistory from "../components/game_history";
import Mages from "../components/mages";
import Nemeses from "../components/nemeses";
import Players from "../components/players";
import Randomizer from "../components/randomizer";
import { isEmpty, merge } from "lodash";

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
  PLAYERS: 5,
  GAMES: 6,
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
   * Update the statistics of total games and total wins for cards, mages,
   * nemesis and players. Updates cards, mages, nemeses, and players in the
   * state.
   * @param {object} game - the game object.
   * @param {object} game.time - the time the game was created.
   * @param {boolean} game.won - the result of the game.
   * @param {int} game.difficulty - the difficulty rating of the game.
   * @param {int} game.nemesis_id - the id of the nemesis in the game.
   * @param {int[]} game.mage_ids - the ids of the mages played in the game.
   * @param {int[]} game.player_ids - the ids of the players in the game.
   * @param {int[]} game.market_card_ids - the ids of the cards used in the game.
   * @param {string} game.notes - comments about the game.
   */
  updateStats(game) {
    /** Update card stats. */
    let updatedCards = merge({}, this.state.cards);

    for (let i = 0; i < game.market_card_ids.length; i++) {
      let card = updatedCards[game.market_card_ids[i]];
      card.total_games += 1;
      card.total_wins += (game.won ? 1 : 0);
    }

    /** Update mage stats. */
    let updatedMages = merge({}, this.state.mages);

    for (let i = 0; i < game.mage_ids.length; i++) {
      let mage = updatedMages[game.mage_ids[i]];
      mage.total_games += 1;
      mage.total_wins += (game.won ? 1 : 0);
    }

    /** Update nemesis stats. */
    let updatedNemeses = merge({}, this.state.nemeses);
    let nemesis = updatedNemeses[game.nemesis_id];
    nemesis.total_games += 1;
    nemesis.total_wins += (game.won ? 1 : 0);

    /** Update player stats. */
    let updatedPlayers = merge({}, this.state.players);

    for (let i = 0; i < game.player_ids.length; i++) {
      let player = updatedPlayers[game.player_ids[i]];
      player.total_games += 1;
      player.total_wins += (game.won ? 1 : 0);
    }

    this.setState({
      cards: updatedCards,
      mages: updatedMages,
      nemesis: updatedNemeses,
      players: updatedPlayers
    });
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
        isEmpty(this.state.nemeses || isEmpty(this.state.players))) {
      return null;
    }

    switch (this.state.showPage) {
      case PAGES.RANDOMIZER:
        return <Randomizer cards={ this.state.cards } mages={ this.state.mages }
            nemeses={ this.state.nemeses } players={ this.state.players }
            updateStats={ game => this.updateStats(game) } />;
      case PAGES.CARDS:
        return <Cards cards={ this.state.cards } />;
      case PAGES.MAGES:
        return <Mages mages={ this.state.mages }/>;
      case PAGES.NEMESES:
        return <Nemeses nemeses={ this.state.nemeses }/>;
      case PAGES.PLAYERS:
        return <Players players={ this.state.players }/>;
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
          <section className="navigation-buttons">
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
                onClick={ page => this.navigateToPage(PAGES.PLAYERS) }>
              Player Stats
            </button>
            <button className="button"
                onClick={ page => this.navigateToPage(PAGES.GAMES) }>
              Game History
            </button>
          </section>

          <img src="/images/aeons_end_title.png" alt="Aeon's End Title" />
        </header>

        <main>
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
