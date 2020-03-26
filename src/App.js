import React, { Component } from "react";
//import { Link } from "react-router-dom";
import "./App.css";

// MUI
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store"
import themeFile from "./util/theme";

// Other
import Navbar from "./components/Navbar"
import Routes from "./Routes";


const theme = createMuiTheme(themeFile);


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
