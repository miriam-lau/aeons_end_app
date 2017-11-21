import React, { Component } from "react";

/**
 *
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
              <img className="player-image" src="/images/no_picture_character.jpg" />
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
