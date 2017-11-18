import React, { Component } from "react";

/**
 * Displays all the mages.
 * @param {object[]} mages - an array of mage objects.
 * @param {int} mage.id - the id of the mage in the database.
 * @param {string} mage.name - the name of the mage.
 * @param {string} mage.ability - the description of the mage's special ability.
 * @param {string} mage.image_name - the image name of the mage.
 * @return {html element} <ul> - list of mages.
 */

class Mages extends Component {
  render() {
    return (
      <ul className="page-list">
        { Object.values(this.props.mages).map(mage => {
          return (
            <li key={ mage.id }>
              <article>{ mage.name }</article>
              <article className="mage-ability">
                Ability: { mage.ability }
              </article>
              <article>Games played: { mage.total_games }</article>
              <article>Win percentage: {
                  Math.round((mage.total_games != 0 ?
                    (1.0 * mage.total_wins / mage.total_games * 100) : 0))
                  + "%" }
              </article>
              <img src={ `/images/mages/${mage.image_name}` } />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Mages;
