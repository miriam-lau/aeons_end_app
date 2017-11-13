import React, { Component } from "react";

/**
 * Enumeration of card types.
 */
const CARD_TYPE = {
  GEM: "gem",
  RELIC: "relic",
  SPELL: "spell"
}

/**
 * Randomizes market cards, mages, and nemeses for a game session. The current
 * list displays notes of what the randomizer page will contain and the
 * options available to pass into the randomizer.
 */
class Randomizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      /** The id of the mage selected for player one */
      mageIdOne: 1,
      /** The id of the mage selected for player two */
      mageIdTwo: 2,
      /** The id of the nemesis selected for the game session */
      nemesisId: 1,
      /** The array of market cards selected for the game session */
      marketCards: []
    };

    this.fetchMarketCards();
  }

  /**
   * Api call to fetch a random set of market cards from the database and set
   * the data in state.
   */
  fetchMarketCards() {
    fetch("/pages/get_market_cards_for_game").then(response => {
      return response.json();
    }).then(data => {
      this.setState({ marketCards: data });
    });
  }

  /**
   * Get the mage or nemesis that matches the id.
   * @param {int} id - the id of an object.
   * @param {object[]} objs - an array of objects, either mages or nemeses.
   * @return {?object} - either a mage or nemesis object.
   */
  getMatch(id, objs) {
    if (objs.length === 0) {
      return;
    }

    for (let i = 0; i < objs.length; i++) {
      if (objs[i].id === id) {
        return objs[i];
      }
    }
    return null;
  }

  /**
   * Renders an array of starting cards for a mage.
   * @param {object} mage - a mage object.
   * @return {string[]} result - each string is the number of cards and the
   * card name.
   */
  renderStartingCards(mage) {
    let cards = this.props.cards;
    let result = [];

    mage.starting_cards.forEach( (value, key, map) => {
      for (let i = 0; i < cards.length; i++) {
        if (key === cards[i].id) {
          let str = `${value}x ${cards[i].name}`;
          result.push(str)
        }
      }
    });

    return result;
  }

  /**
   * Handles a selection in the drop down options and set the new option in state.
   * @param {event} e - click event.
   * @param {string} property - name of a property in state.
   */
  handleChange(e, property) {
    this.setState({ [property]:  parseInt(e.target.value) });
  }

  /**
   * Generate a random number.
   * @param {int} max - the maximum number in the range.
   * @return {int} - number between 1 and the max (exclusive).
   */
  randomNumberGenerator(max) {
    return Math.floor(Math.random() * (max - 1)) + 1;
  }

  /**
   * Randomizes mages, nemeses and market cards and set the data in state.
   */
  randomizeAll() {
    let nemesisId = this.randomNumberGenerator(this.props.nemeses.length + 1);

    let mageIdOne = this.randomNumberGenerator(this.props.mages.length + 1);
    let mageIdTwo = this.randomNumberGenerator(this.props.mages.length + 1);
    while (true) {
      if (mageIdTwo === mageIdOne) {
        mageIdTwo = this.randomNumberGenerator(this.props.mages.length + 1);
      } else {
        break;
      }
    }

    this.setState({
      mageIdOne: mageIdOne,
      mageIdTwo: mageIdTwo,
      nemesisId: nemesisId,
      market_cards: this.fetchMarketCards()
    });
  }

  saveGame() {
    console.log("IN SAVE GAME");
    // save Game first to get game_id
    /**
      save to game_mages table:
        for mageOne: game_id, mages_id, players_id
        for mageTwo: game_id, mages_id, players_id
      save to game_nemeses table:
        game_id, nemeses_id
      save to games_market_cards (for each card) table:
        game_id, cards_id
    */
  }

  /**
   * Handles randomizing a set of objects, either mages or nemeses, and set the
   * new id of an object in state.
   * @param {object[]} list - list of objects.
   * @param {string} property - a property in state.
   */
  handleRandomize(list, property) {
    let num = this.randomNumberGenerator(list.length + 1);
    this.setState({ [property]: num });
  }

  /**
   * Renders a mage.
   * @param {object} mage - a mage object.
   * @param {string} propertyName - a property in state.
   * @return {html element} <div> - an html element that contains a mage.
   */
  renderMage(mage, propertyName) {
    return (
      <div>
        <section className="randomizer-section-options">
          <h2>Mage: { mage.name }</h2>
          <button className="randomizer-button"
              onClick={ () => this.handleRandomize(this.props.mages, propertyName) }>
            Randomize
          </button>
          <article>Select a Mage:</article>
          <select value={ this.state[propertyName] }
              onChange={ (e, property) => this.handleChange(e, propertyName) }>
            { this.props.mages.map(mage => {
              return (
                <option key={ mage.id} value={ mage.id }>{ mage.name }</option>
              );
            })}
          </select>
          <article>Player Name:</article>
          <select>
            <option value="James">James</option>
            <option value="Miriam">Miriam</option>
          </select>
        </section>

        <section className="randomizer-selected-detail">
          <img src={ `/images/mages/${mage.image_name}` } />
          <section className="randomizer-selected-detail-info">
            <ul>Starting Cards:
              { this.renderStartingCards(mage).map( (card, idx) => {
                return <li key={ idx }>{ card }</li>
              })}
            </ul>
            <article>Special Ability:</article>
          </section>
        </section>
      </div>
    );
  }

  /**
   * Renders all cards for a type of market card.
   * @param {enum} type - the type of market card to render.
   * @return {html element} <section> - an html element containing all market
   * cards of a type.
   */
  renderMarketCardsByType(type) {
    return (
      <section className="randomizer-market-card-type">
      { this.state.marketCards[type].map(card => {
        return (
          <img className="card-image"
            key={ card.id }
            src={ `/images/market_cards/${card.image_name}` } />
        );
      })}
      </section>
    );
  }

  render() {
    if (this.props.mages.length === 0 || this.props.nemeses.length === 0 ||
        this.props.cards.length == 0 || this.state.marketCards.length === 0) {
      return (
        <div>Loading...</div>
      );
    }

    let mageOne = this.getMatch(this.state.mageIdOne, this.props.mages);
    let mageTwo = this.getMatch(this.state.mageIdTwo, this.props.mages);
    let nemesis = this.getMatch(this.state.nemesisId, this.props.nemeses);

    return (
      <div className="randomizer-container">
        <div className="randomizer-main-button-container">
          <button className="randomizer-main-button" onClick={ () => this.randomizeAll() }>
            Randomize All
          </button>
          <button className="randomizer-main-button" onClick={ () => this.saveGame() }>
            Save Game Session
          </button>
        </div>

        <div>
          { this.renderMage(mageOne, "mageIdOne") }
          { this.renderMage(mageTwo, "mageIdTwo") }
        </div>

        <div>
          <section className="randomizer-section-options">
            <h2>Nemesis: { nemesis.name }</h2>
            <button className="randomizer-button"
                onClick={ () => this.handleRandomize(this.props.nemeses, "nemesisId") }>
              Randomize</button>
            <article>Select a Nemesis:</article>
            <select value={ this.state.nemesisId }
                  onChange={ (e, property) => this.handleChange(e, "nemesisId") }>
              { this.props.nemeses.map(nemesis => {
                return (
                  <option key={ nemesis.id } value={ nemesis.id }>{ nemesis.name }</option>
                );
              })}
            </select>
          </section>
          <section className="randomizer-selected-detail">
            <img src={ `/images/nemeses/${nemesis.image_name}` } />
            <section className="randomizer-selected-detail-info">
              <article>Difficulty: { nemesis.difficulty }</article>
            </section>
          </section>
        </div>

        <div>
          <section className="randomizer-section-options">
            <h2>Market Cards</h2>
            <button className="randomizer-button"
                onClick={ () => this.fetchMarketCards() }>
              Randomize
            </button>
          </section>
          <section>
            { this.renderMarketCardsByType(CARD_TYPE.GEM) }
            { this.renderMarketCardsByType(CARD_TYPE.RELIC) }
            { this.renderMarketCardsByType(CARD_TYPE.SPELL) }
          </section>
        </div>
      </div>
    );
  }
}

export default Randomizer;
