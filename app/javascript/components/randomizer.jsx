import React, { Component } from "react";
import { shuffle } from "lodash";
import axios from "axios";

/** The url for fetching the game market cards. */
const GAME_MARKET_CARDS_URL = "/pages/get_market_cards_for_game";
/** The url for saving the game. */
const SAVE_GAME_URL = "/games";

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

    var mageIds = Object.keys(this.props.mages);
    var playerIds = Object.keys(this.props.players);
    this.state = {
      /**
       * @type {int[]} - the ids of the mages selected for the players.
       * Player one is at index 0 and player two is at index 1.
       */
      mageIds: [mageIds[0], mageIds[1]],
      /** @type {int[]} - the ids of the players */
      playerIds: [playerIds[0], playerIds[1]],
      /** @type {int} - the id of the nemesis selected for the game session */
      nemesisId: this.getRandomKey(this.props.nemeses),
      /** @type {object[]} - the market cards selected for the game session */
      marketCards: [],
      /** @type {boolean} - the result of the game */
      gameWon: false,
      /** @type {int} - the difficulty rating of the game */
      gameDifficulty: 10,
      /** @type {string} - comments or notes about the game */
      gameNotes: "",
      /** @type {boolean} - the result of saving the game */
      gameSaveSuccessful: false,
      /** @type {string} - the errors from saving the game */
      gameSaveErrors: ""
    };

    this.fetchRandomMarketCards();
}

  /**
   * Api call to fetch a random set of market cards from the database and set
   * the data in state. Resets the state of gameSaveSuccessful and gameSaveErrors
   * to default values.
   */
  fetchRandomMarketCards() {
    fetch(GAME_MARKET_CARDS_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        marketCards: data,
        gameSaveSuccessful: false,
        gameSaveErrors: ""
      });
    });
  }

  /**
   * Returns a random key in the given hash.
   * @param {Map} a hash.
   * @return a random key in the hash. The type could be anything used
   *     as a key in the object.
   */
  getRandomKey(object) {
    var keys = Object.keys(object);
    return keys[Math.floor(keys.length * Math.random())];
  };

  /**
   * Randomizes mages, nemeses and market cards and set the data in state.
   * Resets the state of gameSaveSuccessful and gameSaveErrors to default values.
   */
  randomizeAll() {
    if (this.state.mageIds.length < 2) {
      return;
    }

    let mageIds = Object.keys(this.props.mages);
    let shuffledMageIds = shuffle(mageIds);

    this.setState({
      mageIds: [shuffledMageIds[0], shuffledMageIds[1]],
      gameSaveSuccessful: false,
      gameSaveErrors: ""
    });

    this.setRandomNemesis();
    this.fetchRandomMarketCards();
  }

  /**
   * Randomly chooses a mage from the unselected list and sets the id of the
   * mage in state. Resets the state of gameSaveSuccessful and gameSaveErrors
   * to default values.
   * @param {int} index - index position of the mage in magesId array.
   */
  setRandomMageFromUnselected(index) {
    let mages = Object.keys(this.props.mages);
    let selectedMageIds = this.state.mageIds.slice();

    let unselectedMagesId = [];
    for (let i = 0; i < mages.length; i++) {
      let matchFound = false;

      for (let j = 0; j < selectedMageIds.length; j++) {
        if (mages[i] === selectedMageIds[j]) {
          matchFound = true;
          break;
        }
      }

      if (!matchFound) {
        unselectedMagesId.push(mages[i]);
      }
    }

    let randomMageId = this.getRandomKey(unselectedMagesId);
    let newMageIds = selectedMageIds;
    newMageIds[index] = randomMageId;

    this.setState({
      mageIds: newMageIds,
      gameSaveSuccessful: false,
      gameSaveErrors: ""
    });
  }

  /**
   * Randomly chooses a nemesis and sets the new id of the nemesis in state.
   * Resets the state of gameSaveSuccessful and gameSaveErrors to default values.
   */
  setRandomNemesis() {
    this.setState({
      nemesisId: this.getRandomKey(this.props.nemeses),
      gameSaveSuccessful: false,
      gameSaveErrors: ""
    });
  }

  /**
   * Sets the mage id at a given index in state to the selected value in the
   * event.
   * @param {event} e - click event.
   * @param {int} index - the index position in the magesId array to update.
   */
  handleMageDropDownSelection(e, index) {
    let newMageIds = this.state.mageIds.slice();
    newMageIds[index] = parseInt(e.target.value);

    this.setState({ mageIds: newMageIds });
  }

  /**
   * Sets the player id at a given index in state to the selected value in the
   * event.
   * @param {event} e - click event.
   * @param {int} index - the index position in the playersId array to update.
   */
  handlePlayerDropDownSelection(e, index) {
    let newPlayerIds = this.state.playerIds.slice();
    newPlayerIds[index] = parseInt(e.target.value);

    this.setState({ playerIds: newPlayerIds });
  }

  /**
   * Sets the nemeisId in state to the selected value in the event.
   * in state.
   * @param {event} e - click event.
   */
  handleNemesisDropDownSelection(e) {
    this.setState({ nemesisId: parseInt(e.target.value) });
  }

  /**
   * Renders a mage.
   * @param {object} mage - a mage object.
   * @return {html element} <div> - an html element that contains a mage.
   */
  renderMage(mage, index) {
    return (
      <div className="randomizer-mage-container">
        <section className="randomizer-section-options">
          <h2>{ mage.name }</h2>
          <button className="randomizer-button"
              onClick={ i => this.setRandomMageFromUnselected(index) }>
            Randomize
          </button>
          <article>Mage:</article>
          <select className="randomizer-select"
              value={ this.state.mageIds[index] }
              onChange={ (e, i) => this.handleMageDropDownSelection(e, index) }>
            { Object.values(this.props.mages).map(mage => {
              return (
                <option key={ mage.id } value={ mage.id }>{ mage.name }</option>
              );
            })}
          </select>
          <article>Player:</article>
          <select className="randomizer-select-players"
                value={ this.state.playerIds[index] }
                onChange={ (e, i) =>
                    this.handlePlayerDropDownSelection(e, index) }>
            { Object.values(this.props.players).map(player => {
              return (
                <option key={ player.id } value={ player.id }>
                    { player.name }</option>
              );
            })}
          </select>
        </section>

        <section className="randomizer-character">
          <img src={ `/images/mages/${mage.image_name}` } />
          <section className="randomizer-character-info">
            <ul>Starting Cards:
              { Object.keys(mage.starting_cards_to_quantity).map(cardId => {
                return (
                  <li key={ cardId }>
                    { `${mage.starting_cards_to_quantity[cardId]}x
                        ${this.props.cards[cardId].name}` }
                  </li>
                );
              })}
            </ul>
            <article>Special Ability:
              <article className="randomizer-mage-ability">
                { mage.ability }
              </article>
            </article>
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
          <img className="randomizer-card-image"
            key={ card.id }
            src={ `/images/market_cards/${card.image_name}` } />
        );
      })}
      </section>
    );
  }

  /**
   * Toggles the state of the gameWon property and updates the state.
   */
  toggleGameWon() {
    this.setState({ gameWon: !this.state.gameWon });
  }

  /**
   * Updates the game difficulty level and set the new value in state.
   * @param {event} e - the click event.
   */
  changeGameDifficulty(e) {
    this.setState({ gameDifficulty: e.target.value })
  }

  /**
   * Updates the game notes in state with the new comment.
   * @param {event} e - the click event.
   */
  handleCommentChange(e) {
    this.setState({ gameNotes: e.target.value });
  }

  /**
   * Saves a game to the games table, each mage played to the games_mages table
   * and each market card to the games_market_cards table. Set the state of
   * gameSaveSuccessful and gameSaveErrors.
   */
  saveGame() {
    this.setState({ gameSaveSuccessful: false, gameSaveErrors: "" });

    let game = {
      time: new Date(),
      won: this.state.gameWon,
      difficulty: this.state.gameDifficulty,
      nemesis_id: this.state.nemesisId,
      notes: this.state.gameNotes,
      mage_ids: this.state.mageIds.slice(),
      player_ids: this.state.playerIds.slice(),
      market_card_ids: this.getMarketCardIds()
    }

    axios.post(SAVE_GAME_URL, { game }).then(result => {
      this.setState({ gameSaveSuccessful: true });
    }).catch(err => {
      this.setState({
          gameSaveSuccessful: false,
          gameSaveErrors: "Save Was Unsuccessful" });
    });
  }

  /**
   * Return an array containing the ids of the market cards used in the game.
   */
  getMarketCardIds() {
    let result = [];

    Object.values(CARD_TYPE).forEach(type => {
      let cards = this.state.marketCards[type];

      for (let i = 0; i < cards.length; i++) {
        result.push(cards[i].id);
      }
    });

    return result;
  }

  /**
   * Renders the result of clicking the save game button.
   */
  renderSaveGameStatus() {
    let className = this.state.gameSaveSuccessful ? "successful" : "errors";
    return (
      <article className={`randomizer-save-game-${className}`}>
        { this.state.gameSaveSuccessful ? "Game Saved" :
            this.state.gameSaveErrors }
      </article>
    );
  }

  render() {
    if (this.state.marketCards.length === 0) {
      return (
        <div>Loading...</div>
      );
    }

    let mageOne = this.props.mages[this.state.mageIds[0]];
    let mageTwo = this.props.mages[this.state.mageIds[1]];
    let nemesis = this.props.nemeses[this.state.nemesisId];

    return (
      <div className="randomizer-container">
        <div className="randomizer-main-button-container">
          <button className="randomizer-main-button"
              onClick={ () => this.randomizeAll() }>
            Randomize All
          </button>
        </div>

        <div>
          <h1>Mages</h1>
          <div className="randomizer-mages-container">
            { this.renderMage(mageOne, 0) }
            { this.renderMage(mageTwo, 1) }
          </div>
        </div>

        <div>
          <h1>Nemesis</h1>
          <div className="randomizer-section-container">
            <section className="randomizer-section-options">
              <h2>{ nemesis.name }</h2>
              <button className="randomizer-button"
                  onClick={ () => this.setRandomNemesis() }>
                Randomize</button>
              <article>Nemesis:</article>
              <select className="randomizer-select"
                    value={ this.state.nemesisId }
                    onChange={ e => this.handleNemesisDropDownSelection(e) }>
                { Object.values(this.props.nemeses).map(nemesis => {
                  return (
                    <option key={ nemesis.id } value={ nemesis.id }>
                      { nemesis.name }
                    </option>
                  );
                })}
              </select>
            </section>
            <section className="randomizer-character">
              <img src={ `/images/nemeses/${nemesis.image_name}` } />
              <section className="randomizer-character-info">
                <section>
                  <article>Difficulty: { nemesis.difficulty }</article>
                  <article>Total Games: { nemesis.total_games }</article>
                  <article>Total Wins: { nemesis.total_wins }</article>
                </section>
              </section>
            </section>
          </div>
        </div>

        <div>
          <h1>Market Cards</h1>
          <div className="randomizer-section-container">
            <section className="randomizer-section-card-options">
              <article className="randomizer-card-heading">
                  Gems, Relics and Spells
              </article>
              <button className="randomizer-button"
                  onClick={ () => this.fetchRandomMarketCards() }>
                Randomize
              </button>
            </section>
            <section className="randomizer-cards-container">
              { this.renderMarketCardsByType(CARD_TYPE.GEM) }
              { this.renderMarketCardsByType(CARD_TYPE.RELIC) }
              { this.renderMarketCardsByType(CARD_TYPE.SPELL) }
            </section>
          </div>
        </div>

        <div className="randomizer-game-data">
          <h1>Game Session</h1>
          <div className="randomizer-game-options">
            <section>
              <label>Difficulty Level:</label>
              <input className="randomizer-select-difficulty"
                  type="number"
                  min="1"
                  max="10"
                  placeholder="10"
                  onChange={ e => this.changeGameDifficulty(e) }/>
            </section>
            <section>
              <label>Did you save the world?</label>
              <input className="randomizer-checkbox"
                  type="checkbox"
                  name="gameWon"
                  value={ this.state.gameWon }
                  onClick={ () => this.toggleGameWon() }/>
            </section>
            <textarea
                rows="5"
                placeholder="Comments or Notes"
                value={ this.state.value }
                onChange={ e => this.handleCommentChange(e) } />
          </div>
          <div className="randomizer-main-button-container">
            <button className="randomizer-main-button"
                onClick={ () => this.saveGame() }>
              Save Game Session
            </button>
          </div>
          { this.renderSaveGameStatus() }
        </div>

      </div>
    );
  }
}

export default Randomizer;
