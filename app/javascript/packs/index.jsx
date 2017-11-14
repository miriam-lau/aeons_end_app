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

/** The url for fetching all the cards. */
const CARDS_URL = "/cards";
/** The url for fetching all the mages. */
const MAGES_URL = "/mages";
/** The url for fetching all the starting cards for all the mages. */
const STARTING_CARDS_URL = "/mages/starting_cards";
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
      /** All the card objects from the database. */
      cards: [],
      /** All the mage objects from the database. */
      mages: [],
      /** All the starting cards for each mage from the database. */
      startingCards: [],
      /** All the nemesis objects from the database. */
      nemeses: []
    };

    this.fetchCards();
    this.fetchMages();
    this.fetchStartingCards();
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
   * Api call to fetch all starting cards for each mages from the database and
   * set the data in state.
   */
  fetchStartingCards() {
    fetch(STARTING_CARDS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ startingCards: data });
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
   * Generates a mage list with their starting cards.
   * @return {object[]} result - an array of mage objects in state with starting
   * cards added as a property.
   */
  generateMagesWithStartingCards() {
    let mages = this.state.mages;
    let startingCards = this.state.startingCards;
    let result = [];

    let allCards = this.state.cards;
    let allCardsMap = new Map();
    for (let i = 0; i < allCards.length; i++) {
      allCardsMap.set(allCards[i].id, allCards[i]);
    }

    for (let i = 0; i < mages.length; i++) {
      let starting_cards = [];
      for (let j = 0; j < startingCards.length; j++) {
        if (startingCards[j].mage_id === mages[i].id) {
          let cardId = startingCards[j].card_id;
          let cardQuantity = startingCards[j].quantity;
          let card = allCardsMap.get(cardId);

          starting_cards.push({ id: cardId, quantity: cardQuantity, card: card });
        }
      }

      let newMage = Object.assign(mages[i], { starting_cards } );
      result.push(newMage);
    }

    return result;
  }

  /**
   * Returns a component to render.
   * @return {?component} React component - components include Randomizer, Cards,
   * Mages, Nemeses and GameHistory.
   */
  renderPage() {
    if (this.state.cards.length === 0 || this.state.mages.length === 0 ||
        this.state.nemeses.length === 0) {
      return null;
    }

    switch (this.state.showPage) {
      case PAGES.RANDOMIZER:
        let mages = this.generateMagesWithStartingCards();
        return <Randomizer cards={ this.state.cards } mages={ mages }
            nemeses={ this.state.nemeses } />;
      case PAGES.CARDS:
        return <Cards cards={ this.state.cards } />;
      case PAGES.MAGES:
        return <Mages mages={ this.state.mages }/>;
      case PAGES.NEMESES:
        return <Nemeses nemeses={ this.state.nemeses }/>;
      case PAGES.GAMES:
        return <GameHistory />;
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
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
});
