import React from 'react';
import SingleSheet from './SingleSheet';
import MultipleSheets from './MultipleSheets';
import GraphSheet from './GraphSheet';
import GoogleSheetsProvider from '../../dist';
import './App.css';

/**
 *
 * the below is for running the example in the context of this repo.
 *
 * for your app, use:
 *
 * import GoogleSheetsProvider from 'react-db-google-sheets';
 *
 */

const App = () => (
  <GoogleSheetsProvider>
    <div className="container">
      <h1>Trackers</h1>
      <div className="section">
        <h2>Own Phone Logs statistic graphic (x: hours, y: notification number)</h2>
        <GraphSheet />
      </div>
      <div className="section">
        <h2>Own Phone Logs</h2>
        <SingleSheet />
      </div>
    </div>
  </GoogleSheetsProvider>
);

export default App;
