import React, { Component } from 'react';

/**
 * Displays all the nemeses.
 * @param{object[]} nemeses - an array of nemesis objects
 * @param{int} nemesis.id - the id of the nemesis in the database
 * @param{string} nemesis.name - the name of the nemesis
 * @param{int} nemesis.difficulty - the difficulty level of the nemesis
 * @param{string} nemesis.image_name - the image name of the nemesis
 * @return{html element} <ul> - list of nemeses
 */
class Nemeses extends Component {
  render() {
    if (this.props.nemeses.length < 1) {
      return (
        <div>Loading...</div>
      );
    }

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
