import React, { Component } from "react";
import { shuffle } from "lodash";

/** The url for fetching the game market cards. */
const GAME_MARKET_CARDS_URL = "/pages/get_market_cards_for_game";
/** The url for fetching all the players. */
const PLAYERS_URL = "/players";

/**
 * Hash of card types mapping to the string representing it in the database.
 */
const CARD_TYPE = {
  GEM: "gem",
  RELIC: "relic",
  SPELL: "spell"
}

/**
 * Randomizes market cards, mages, and nemeses for a game session.
 */
class Randomizer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * @type {int[]} - the ids of the mages selected for the players.
       * Player one is at index 0 and player two is at index 1.
       */
      mageIds: [this.props.mages[0].id, this.props.mages[1].id],
      /** @type {int[]} - the ids of the players */
      playerIds: [],
      players: [],
      /** @type {int} - the id of the nemesis selected for the game session */
      nemesisId: this.props.nemeses[0].id,
      /** @type {object[]} - the market cards selected for the game session */
      marketCards: [],
    };

    this.fetchMarketCards();
    this.fetchPlayers();
  }

  /**
   * Api call to fetch a random set of market cards from the database and set
   * the data in state.
   */
  fetchMarketCards() {
    fetch(GAME_MARKET_CARDS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ marketCards: data });
    });
  }

  /**
   * Api call to fetch all players from the database and set the data in state.
   */
  fetchPlayers() {
    fetch(PLAYERS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ players: data }, () => {
        this.setState({ playerIds: [this.state.players[0].id, this.state.players[1].id] })
      });
    });
  }

  /**
   * Get the object in the array with 'id' property equal to the given 'id'.
   * Returns null if none are found.
   * @param {int} id - the id of an object.
   * @param {object[]} objs - an array of objects.
   * @return {?object} - the object in the array matching the given id.
   */
  getObjectWithId(id, objs) {
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
   * Generates a random number between 1 and max (inclusive).
   * @param {int} max - the maximum number in the range.
   * @return {int} - number between 1 and the max (inclusive).
   */
  generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  /**
   * Randomizes mages, nemeses and market cards and set the data in state.
   */
  randomizeAll() {
    if (this.state.mageIds.length < 2) {
      return;
    }

    let mageIds = [];
    for (let i = 0; i < this.props.mages.length; i++) {
      mageIds.push(this.props.mages[i].id);
    }

    let shuffledMageIds = shuffle(mageIds);
    let nemesisId = this.generateRandomNumber(this.props.nemeses.length);

    this.setState({
      mageIds: [shuffledMageIds[0], shuffledMageIds[1]],
      nemesisId: nemesisId,
    });

    this.fetchMarketCards();
  }

  /**
   * Randomly chooses a mage and set the new id of the mage in state.
   * @param {int} index - index position of the mage in magesId array.
   */
  getRandomMage(index) {
    let mages = this.props.mages;
    let selectedMageIds = this.state.mageIds;
    let mageIds = [];

    for (let i = 0; i < mages.length; i++) {
      let matchFound = false;

      for (let j = 0; j < selectedMageIds.length; j++) {
        if (mages[i].id === selectedMageIds[j]) {
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        mageIds.push(mages[i].id);
      }
    }

    let newMageIds = selectedMageIds;
    newMageIds[index] = shuffle(mageIds)[0];

    this.setState({ mageIds: newMageIds });
  }

  /**
   * Randomly chooses a nemesis and set the new id of the nemesis in state.
   */
  getRandomNemesis() {
    let num = this.generateRandomNumber(this.props.nemeses.length);
    this.setState({ nemesisId: num });
  }

  /**
   * Sets the mage id at a given index in state to the selected value in the event.
   * @param {event} e - click event.
   * @param {int} index - the index position in the magesId array to update.
   */
  handleMageDropDownSelection(e, index) {
    let newMageIds = this.state.mageIds;
    newMageIds[index] = parseInt(e.target.value);

    this.setState({ mageIds: newMageIds });
  }

  /**
   * Sets the player id at a given index in state to the selected value in the event.
   * @param {event} e - click event.
   * @param {int} index - the index position in the playersId array to update.
   */
  handlePlayerDropDownSelection(e, index) {
    let newPlayerIds = this.state.playerIds;
    newPlayerIds[index] = parseInt(e.target.value);

    this.setState({ playerIds: newPlayerIds });
  }

  /**
   * Sets the nemeisId in state to the selected value in the event.
   * in state.
   * @param {event} e - click event.
   */
  handleNemesisDropDownSelection(e) {
    this.setState({ nemesisId:  parseInt(e.target.value) });
  }

  /**
   * Renders a mage.
   * @param {object} mage - a mage object.
   * @return {html element} <div> - an html element that contains a mage.
   */
  renderMage(mage, index) {
    return (
      <div>
        <section className="randomizer-section-options">
          <h2>Mage: { mage.name }</h2>
          <button className="randomizer-button"
              onClick={ i => this.getRandomMage(index) }>
            Randomize
          </button>
          <article>Select a Mage:</article>
          <select value={ this.state.mageIds[index] }
              onChange={ (e, i) => this.handleMageDropDownSelection(e, index) }>
            { this.props.mages.map(mage => {
              return (
                <option key={ mage.id } value={ mage.id }>{ mage.name }</option>
              );
            })}
          </select>
          <article>Player Name:</article>
          <select value={ this.state.playerIds[index] }
                onChange={ (e, i) => this.handlePlayerDropDownSelection(e, index) }>
            { this.state.players.map(player => {
              return (
                <option key={ player.id } value={ player.id }>{ player.name }</option>
              );
            })}
          </select>
        </section>

        <section className="randomizer-selected-detail">
          <img src={ `/images/mages/${mage.image_name}` } />
          <section className="randomizer-selected-detail-info">
            <ul>Starting Cards:
              { mage.starting_cards.map(card => {
                return (
                  <li key={ card.id }>{ `${card.quantity}x ${card.card.name}` }</li>
                );
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
   * @param {hash} type - the type of market card to render.
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

  /**
   * Saves a game session to the games table.
   */
  saveGame() {
    console.log("IN SAVE GAME");
    /**
      let newGame = {
        time: ,
        won: ,
        difficulty: ,
        nemesis_id: this.state.nemesisId
      }

    */
    let gameId = 1000;

    this.saveGameMage(gameId, this.state.mageIds[0], this.state.playerIds[0]);
    this.saveGameMage(gameId, this.state.mageIds[1], this.state.playerIds[1]);

    this.saveGameMarketCards(gameId, CARD_TYPE.GEM);
    this.saveGameMarketCards(gameId, CARD_TYPE.RELIC);
    this.saveGameMarketCards(gameId, CARD_TYPE.SPELL);
  }

  /**
   * Saves a mage to the game_mages table.
   * @param {int} gameId - id of the associated game.
   * @param {int} mageId - id of the mage in the associated game.
   * @param {int} playerId - id of the player in the associated game.
   */
  saveGameMage(gameId, mageId, playerId) {
    console.log("IN SAVE GAME MAGE");
    /**
    let newGameMage = {
      game_id: gameId,
      mages_id: mageId;
      players_id: playerId;
    }

    API call to save
    */
  }

  /**
   * Saves a market card to the games_market_cards table.
   * @param {int} gameId - id of the associated game.
   * @param {hash} type - the type of market card can be a gem, relic or spell.
   */
  saveGameMarketCards(gameId, type) {
    console.log("IN SAVE GAME MARKET CARDS");
    /**
    let cards = this.state.market_cards[type]
    for (let i = 0; i < cards.length; i++) {
    let newGameMarketCard = {
      game_id: gameId,
      card_id: cards[i].id
    }

    API call to save
    */
  }

  render() {
    if (this.state.marketCards.length === 0 || this.state.players.length === 0) {
      return (
        <div>Loading...</div>
      );
    }

    let mageOne = this.getObjectWithId(this.state.mageIds[0], this.props.mages);
    let mageTwo = this.getObjectWithId(this.state.mageIds[1], this.props.mages);
    let nemesis = this.getObjectWithId(this.state.nemesisId, this.props.nemeses);

    // if remove callback from button RandomizeAll, generateRandomNumber error
    // cannot read property of undefined. does it have to do with the arrow
    // function passing down 'this'?

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
          { this.renderMage(mageOne, 0) }
          { this.renderMage(mageTwo, 1) }
        </div>

        <div>
          <section className="randomizer-section-options">
            <h2>Nemesis: { nemesis.name }</h2>
            <button className="randomizer-button"
                onClick={ () => this.getRandomNemesis() }>
              Randomize</button>
            <article>Select a Nemesis:</article>
            <select value={ this.state.nemesisId }
                  onChange={ () => this.handleNemesisDropDownSelection() }>
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
