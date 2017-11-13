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
      /** The current page to show to the user. */
      showPage: PAGES.RANDOMIZER,
      /** All the card objects from the database. */
      cards: [],
      /** All the mage objects from the database. */
      mages: [],
      /** All the nemesis objects from the database. */
      nemeses: []
    };

    this.fetchCards();
    this.fetchMages();
    this.fetchNemeses();
  }

  /**
   * Api call to fetch all cards from the database and set the data in state.
   */
  fetchCards() {
    fetch("/cards").then(response => {
      return response.json();
    }).then(data => {
      this.setState({ cards: data });
    });
  }

  /**
   * Api call to fetch all mages from the database and set the data in state.
   */
  fetchMages() {
    fetch("/mages").then(response => {
      return response.json();
    }).then(data => {
      this.setState({ mages: data });
    });
  }

  /**
   * Api call to fetch all nemeses from the database and set the data in state.
   */
  fetchNemeses() {
    fetch("/nemeses").then(response => {
      return response.json();
    }).then(data => {
      this.setState({ nemeses: data });
    })
  }

  /**
   * Sets the state of the page to navigate to upon user click.
   * @param {enum} page - the page to navigate to.
   */
  handlePageNavigation(page) {
    this.setState({ showPage: page });
  }

  /**
   * Returns a component to render.
   * @return {component} React component - components include Randomizer, Cards,
   * Mages, Nemeses and GameHistory.
   */
  renderPage() {
    switch (this.state.showPage) {
      case PAGES.RANDOMIZER:
        return <Randomizer />;
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
          <button onClick={ page => this.handlePageNavigation(PAGES.RANDOMIZER) }>
            Home
          </button>
          <button onClick={ page => this.handlePageNavigation(PAGES.CARDS) }>
            Cards
          </button>
          <button onClick={ page => this.handlePageNavigation(PAGES.MAGES) }>
            Mages
          </button>
          <button onClick={ page => this.handlePageNavigation(PAGES.NEMESES) }>
            Nemeses
          </button>
          <button onClick={ page => this.handlePageNavigation(PAGES.GAMES) }>
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
