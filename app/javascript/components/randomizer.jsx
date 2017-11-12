import React, { Component } from 'react';

/**
  * Randomizes market cards, mages, and nemeses for a game session. The list
      displayed are notes of what the randomizer page will contain and the
      options available to the user.
*/
class Randomizer extends Component {
  render() {
    return (
      <div>
        <h2>Randomizer Button</h2>
        <section>
          <ul>
            <li>Select Nemesis</li>
            <li>Select Mages with number of players option</li>
            <li>Select Gems with default settings</li>
            <li>Select Relics with default settings</li>
            <li>Select Spells with default settings</li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Randomizer;
