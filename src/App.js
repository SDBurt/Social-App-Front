import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./App.css";
import { Auth } from "aws-amplify";

// MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store"
import themeFile from "./util/theme";
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

// Other
import Navbar from "./components/Navbar"
import Routes from "./Routes";


const theme = createMuiTheme(themeFile);

Auth.currentAuthenticatedUser()
  .then(res => {
    console.log(res);
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserData());
  })
  .catch((err) => {
    console.error(err);
  })


export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store} >
          <div className="App container">
            <Navbar />
            <Routes />
          </div>
        </Provider>
      </MuiThemeProvider>
    );

  }
}


export default App;
