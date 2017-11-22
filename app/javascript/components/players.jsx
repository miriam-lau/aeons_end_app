import React, { Component } from "react";

/**
 * Displays all the players.
 * @param {object[]} players - an array of player objects.
 * @param {int} player.id - the id of the player in the database.
 * @param {string} player.name - the name of the player.
 * @param {string} player.image_name - the image name of the player.
 * @param {int} player.total_games - the number of games played for the player.
 * @param {int} player.total_wins - the number of wins for the player.
 * @return {html element} - list of players (<ul>).
 */
class Players extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="page-list">
        { Object.values(this.props.players).map(player => {
          return (
            <section className="character-container" key={ player.id }>
              <img className="player-image"
                  src={ player.image_name !== null ?
                      `/images/players/${ player.image_name }` :
                      "/images/no_picture_character.jpg" } />
              <li className="player-info">
                <article className="character-name">{ player.name }</article>
                <article>Games played: { player.total_games }</article>
                <article>Win rate: {
                    Math.round((player.total_games != 0 ?
                      (1.0 * player.total_wins / player.total_games * 100) : 0))
                    + "%" }
                </article>
              </li>
            </section>
          );
        })}
      </ul>
    );
  }
}

export default Players;
