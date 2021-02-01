import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { RemoteUserLogin } from './services/login/RemoteUserLogin';
import { FetchHTTPClient } from './services/http/FetchHTTPClient';

function App() {
  useEffect(() => {
    async function test() {
      // const fetch = window.fetch.bind(window);
      // const sut = new RemoteUserLogin(new URL("https://reqres.in/api/login"),  new FetchHTTPClient(fetch))

      // const result = await sut.login({ email: "eve.holt@reqres.in", password: "pistol" })

      // // console.log(result)
      // localStorage.setItem('myCat', JSON.stringify(result));
      // const user = localStorage.getItem('myCat') as string
      // console.log(JSON.parse(user))

    }
    test()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
