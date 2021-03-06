import React, { Component } from "react";

/**
 * Displays all the nemeses.
 * @param {object[]} nemeses - an array of nemesis objects.
 * @param {int} nemesis.id - the id of the nemesis in the database.
 * @param {string} nemesis.name - the name of the nemesis.
 * @param {int} nemesis.difficulty - the difficulty level of the nemesis.
 * @param {string} nemesis.image_name - the image name of the nemesis.
 * @param {int} nemesis.total_games - the number of games played for the nemesis.
 * @param {int} nemesis.total_wins - the number of wins for the mages against
 * the nemesis.
 * @return {html element} - list of nemeses (<ul>).
 */
class Nemeses extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="page-list">
        { Object.values(this.props.nemeses).map(nemesis => {
          return (
            <section className="character-container" key={ nemesis.id }>
              <img className="nemesis-image"
                  src={ `/images/nemeses/${nemesis.image_name}` } />
              <li>
                <article className="character-name">{ nemesis.name }</article>
                <article>Difficulty: { nemesis.difficulty }</article>
                <article>Games played: { nemesis.total_games }</article>
                <article>Mage win rate: {
                    Math.round((nemesis.total_games != 0 ?
                      (1.0 * nemesis.total_wins / nemesis.total_games * 100) : 0))
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

export default Nemeses;
