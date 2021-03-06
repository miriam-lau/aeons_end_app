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
 * @param {int} card.total_games - the number of games played for the card.
 * @param {int} card.total_wins - the number of wins for the card.
 * @return {html element} - list of cards (<ul>).
 */
class Cards extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="page-list">
        { Object.values(this.props.cards).map(card => {
          return (
            <section className="card-container" key={ card.id }>
              <img className="card-image"
                  src={ card.image_name !== null ?
                      `/images/market_cards/${ card.image_name }` :
                      "/images/no_picture_card.gif" } />
              <section>
                <li>
                  <article className="card-name">{ card.name }</article>
                  <article>Category: { card.category }</article>
                  <article>Type: { card.card_type }</article>
                  <article>Cost: { card.cost }</article>
                </li>
                <article>Games played: { card.total_games }</article>
                <article>Win rate: {
                  Math.round((card.total_games != 0 ?
                    (1.0 * card.total_wins / card.total_games * 100) : 0))
                    + "%" }
                </article>
              </section>
            </section>
          );
        })}
      </ul>
    );
  }
}

export default Cards;
