import React from 'react';
import './App.css';
import {Survey} from './UserPage/components/Survey'

function App() {

  let temp = 1

  return (
    <div className="App">
      <Survey surveyId={temp}></Survey>
    </div>
  );
}

export default App;
