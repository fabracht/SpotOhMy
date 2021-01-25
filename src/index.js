import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import Routes from "./Routes"
import reportWebVitals from './reportWebVitals';
import { AppContext } from "./Utils/context";
import appReducer from "./reducer";
import './index.scss';


const App = () => {
  const initialState = useContext(AppContext);
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (<AppContext.Provider value={{ state, dispatch }}>
    <Routes />
  </AppContext.Provider>)
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
