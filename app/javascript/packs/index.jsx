// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cards from '../components/cards';
import GameHistory from '../components/game_history';
import Mages from '../components/mages';
import Nemeses from '../components/nemeses';
import Randomizer from '../components/randomizer';

/**
  Main page of App will have routes to the other components.
*/
class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <Cards />
          <Mages />
          <Nemeses />
          <GameHistory />
        </header>

        <main>
          <h1>Welcome to Aeon's End!</h1>
          <Randomizer />
        </main>

        <footer className="footer"></footer>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.body.appendChild(document.createElement('div')))
});
