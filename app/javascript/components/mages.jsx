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

 // add total wins, total games, win %
class Mages extends Component {
  render() {
    return (
      <ul className="page-list">
        { this.props.mages.map(mage => {
          return (
            <li key={ mage.id }>
              <article>{ mage.name }</article>
              <article>Ability: { mage.ability }</article>
              <img src={ `/images/mages/${mage.image_name}` } />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Mages;
