import React, { Component } from "react";

/**
 * Displays all the cards.
 * @param {object[]} cards - an array of card objects.
 * @param {int} card.id - the id of the card in the database.
 * @param {string} card.name - the name of the card.
 * @param {string} card.card_type - types are gem, relic, or spell.
 * @param {string} card.category - categories are common, unique, or market.
 * @param {int} card.cost - the cost of the card.
 * @param {string} card.image_name - the image name of the card.
 * @return {html element} <ul> - list of cards.
 */

 // add total wins, total games, win %
class Cards extends Component {
  render() {
    return (
      <ul className="page-list">
        { this.props.cards.map(card => {
          return (
            <li key={ card.id }>
              <article>{ card.name }</article>
              <article>{ card.category }</article>
              <article>{ card.card_type }</article>
              <img className="card-image"
                  src={ card.image_name !== null ?
                      `/images/market_cards/${ card.image_name }` :
                      "/images/nopicture.gif" } />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cards;
