import React, { Component } from "react";
import axios from "axios";

/** The url for fetching all the games. */
const GAMES_URL = "/games";
/** The url for deleting a game. */
const DELETE_GAME_URL = "/games/delete";

/**
 * Displays all the past games.
 */
class GameHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      /*
       * @type {Map<number:object>} a map from game id to the game object.
       */
      games: {}
    }
    this.fetchGames();
  }

  /**
   * Api call to fetch all games from the database and set the data in state.
   */
  fetchGames() {
    fetch(GAMES_URL).then(response => {
      return response.json();
    }).then(data => {
      this.setState({ games: data });
    });
  }

  /**
   * Deletes a game with the given id from the games table.
   * @param {number} id the game id.
   */
  deleteGame(id) {
    let games = Object.assign({}, this.state.games);
    delete games[id];
    this.setState({ games });

    axios.post(DELETE_GAME_URL, { id });
  }

  render() {
    return (
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <th className="table-title">Date</th>
              <th className="table-title">Won</th>
              <th className="table-title">Difficulty</th>
              <th className="table-title">Nemesis</th>
              <th className="table-title">Player 1</th>
              <th className="table-title">Mage 1</th>
              <th className="table-title">Player 2</th>
              <th className="table-title">Mage 2</th>
              <th className="table-market-card">Market Card Gem 1</th>
              <th className="table-market-card">Market Card Gem 2</th>
              <th className="table-market-card">Market Card Gem 3</th>
              <th className="table-market-card">Market Card Relic 1</th>
              <th className="table-market-card">Market Card Relic 2</th>
              <th className="table-market-card">Market Card Spell 1</th>
              <th className="table-market-card">Market Card Spell 2</th>
              <th className="table-market-card">Market Card Spell 3</th>
              <th className="table-market-card">Market Card Spell 4</th>
              <th className="table-notes">Notes</th>
              <th>Delete</th>
            </tr>
            { Object.values(this.state.games).slice().reverse().map(game => {
              let players = Object.keys(game.players_to_mages);
              var dateOptions = {
                weekday: 'short',
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
                hour12: true,
                hour: '2-digit',
                minute: '2-digit'
              };

              return (
                <tr key={ game.id }>
                  <td>
                    { new Date(game.time).toLocaleTimeString(
                          'en-US', dateOptions) }
                  </td>
                  <td>{ game.won ? "True" : "False" }</td>
                  <td>{ game.difficulty }</td>
                  <td>{ this.props.nemeses[game.nemesis_id].name }</td>
                  <td>
                    { this.props.players[players[0]].name }
                  </td>
                  <td>
                    { this.props.mages[game.players_to_mages[players[0]]].name }
                  </td>
                  <td>
                    { this.props.players[players[1]].name }
                  </td>
                  <td>
                    { this.props.mages[game.players_to_mages[players[1]]].name }
                  </td>
                  <td>{ this.props.cards[game.market_cards[0]].name }</td>
                  <td>{ this.props.cards[game.market_cards[1]].name }</td>
                  <td>{ this.props.cards[game.market_cards[2]].name }</td>
                  <td>{ this.props.cards[game.market_cards[3]].name }</td>
                  <td>{ this.props.cards[game.market_cards[4]].name }</td>
                  <td>{ this.props.cards[game.market_cards[5]].name }</td>
                  <td>{ this.props.cards[game.market_cards[6]].name }</td>
                  <td>{ this.props.cards[game.market_cards[7]].name }</td>
                  <td>{ this.props.cards[game.market_cards[8]].name }</td>
                  <td>{ game.notes }</td>
                  <td>
                    <button className="delete-game-button"
                        onClick={ () => this.deleteGame(game.id) }>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GameHistory;
