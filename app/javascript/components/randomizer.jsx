import React, { Component } from 'react';

class Randomizer extends Component {
  render() {
    return(
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
