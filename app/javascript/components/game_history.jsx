import React, { Component } from "react";

/** The url for fetching all the games. */
const GAMES_URL = "/games";

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

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Date</th>
              <th>Won</th>
              <th>Difficulty</th>
              <th>Player 1</th>
              <th>Mage 1</th>
              <th>Player 2</th>
              <th>Mage 2</th>
              <th>Market Card 1</th>
              <th>Market Card 2</th>
              <th>Market Card 3</th>
              <th>Market Card 4</th>
              <th>Market Card 5</th>
              <th>Market Card 6</th>
              <th>Market Card 7</th>
              <th>Market Card 8</th>
              <th>Market Card 9</th>
              <th>Notes</th>
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
