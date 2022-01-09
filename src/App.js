import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';

function App() {
  const [alert, setalert] = useState(null);

  const showalert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container my-3"><Alert alert={alert}/></div>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showalert={showalert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </Router >
      </NoteState>
    </>
  );
}

export default App;
