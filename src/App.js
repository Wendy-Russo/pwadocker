import React, { useState } from 'react';
import Location from './features/Location';
import Notifications from './features/Notifications';
import Voice from './features/Voice';

function App() {
  return (
    <div className="App">
      <Location/>
      <Notifications/>
      <Voice/>

    </div>
  );
}

export default App;
