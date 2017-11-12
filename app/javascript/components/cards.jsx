import React, { Component } from 'react';

/**
 * Displays all cards.
 * @param{object[]} props.cards
 * @param{int} card.id
 * @param{string} card.name
 * @param{string} card.card_type - types are gem, relic, or spell
 * @param{string} card.category - categories are common, unique, or market
 * @param{int} card.cost
 * @param{string} card.image_name
 * @return{html element} <ul> - list of cards
 */
class Cards extends Component {
  render() {
    return (
      <ul className="page-list">
        { this.props.cards.map(card => {
          return (
            <li key={ card.id }>
              <article>{ card.name }</article>
              <article>Type: { card.card_type}</article>
              <article>Category: { card.category }</article>
              <article>Cost: { card.cost }</article>
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
