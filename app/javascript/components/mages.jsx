import React, { Component } from "react";

/**
 * Displays all the mages.
 * @param {object[]} mages - an array of mage objects.
 * @param {int} mage.id - the id of the mage in the database.
 * @param {string} mage.name - the name of the mage.
 * @param {string} mage.ability - the description of the mage's special ability.
 * @param {string} mage.image_name - the image name of the mage.
 * @param {int} mage.total_games - the number of games played for the mage.
 * @param {int} mage.total_wins - the number of wins for the mage.
 * @return {html element} - list of mages (<ul>).
 */
class Mages extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <ul className="page-list">
        { Object.values(this.props.mages).map(mage => {
          return (
            <section className="character-container" key={ mage.id }>
              <img className="mage-image"
                  src={ `/images/mages/${mage.image_name}` } />
              <li className="mage-info">
                <article className="character-name">{ mage.name }</article>
                <article className="mage-ability">
                  Ability: { mage.ability }
                </article>
                <section>
                  <article>Games played: { mage.total_games }</article>
                  <article>Win rate: {
                      Math.round((mage.total_games != 0 ?
                        (1.0 * mage.total_wins / mage.total_games * 100) : 0))
                      + "%" }
                  </article>
                </section>
              </li>
            </section>
          );
        })}
      </ul>
    );
  }
}

export default Mages;
