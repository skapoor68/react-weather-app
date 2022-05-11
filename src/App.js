import React from 'react';

const api = {
  key: "ac7e9009effe6d900738463e7f8eb303",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
      </main>
    </div>
  );
}

export default App;
