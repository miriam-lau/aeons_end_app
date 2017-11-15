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
class Cards extends Component {
  render() {
    if (this.props.cards.empty) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <ul className="page-list">
        { this.props.cards.map(card => {
          return (
            <li key={ card.id }>
              <article>{ card.name }</article>
              <article>Type: { card.card_type}</article>
              <article>Category: { card.category }</article>
              <article>Cost: { card.cost }</article>
              <article>Games played: { card.total_games }</article>
              <article>Win percentage: {
                  Math.round((card.total_games != 0 ?
                    (1.0 * card.total_wins / card.total_games * 100) : 0))
                  + "%" }
              </article>
              { card.image_name !== null ?
                <img className="card-image"
                  src={ `/images/market_cards/${ card.image_name }` } /> :
                <img className="card-image" src="/images/nopicture.gif" />
              }
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Cards;
