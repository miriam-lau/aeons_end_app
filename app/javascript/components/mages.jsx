import React, { Component } from 'react';

/**
 * Displays all mages.
 * @param{object[]} props.mages
 * @param{int} mage.id
 * @param{string} mage.name
 * @param{string} mage.image_name
 * @return{html element} <ul> - list of mages
 */
class Mages extends Component {
  render() {
    return (
      <ul className="page-list">
        { this.props.mages.map(mage => {
          return (
            <li key={ mage.id }>
              <article>{ mage.name }</article>
              <img src={ `/images/mages/${mage.image_name}` } />
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Mages;
