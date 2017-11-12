import React, { Component } from 'react';

/**
 * Displays all nemeses.
 * @param{object[]} props.nemeses
 * @param{int} nemesis.id
 * @param{string} nemesis.name
 * @param{int} nemesis.difficulty
 * @param{string} nemesis.image_name
 * @return{html element} <ul> - list of nemeses
 */
class Nemeses extends Component {
  render() {
    return (
      <ul className="page-list">
        { this.props.nemeses.map(nemesis => {
          return (
            <li key={ nemesis.id }>
              <article>{ nemesis.name }</article>
              <article>Difficulty: { nemesis.difficulty }</article>
              <img src={ `/images/nemeses/${nemesis.image_name}` } />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Nemeses;
