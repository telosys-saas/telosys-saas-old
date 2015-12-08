/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import Avatar from 'material-ui/lib/avatar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FlatButton from 'material-ui/lib/flat-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import Card from 'material-ui/lib/card/card';

import Login from './login';
import AuthStatus from './authstatus';

const containerStyle = {
  textAlign: 'center',
};

const standardActions = [
  {
    text: 'Okay',
  },
];

const Main = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500,
    });

    this.setState({muiTheme: newMuiTheme});
  },

  _handleRequestClose() {
    this.setState({
      open: false,
    });
  },

  _handleTouchTap() {
    this.setState({
      open: true,
    });
  },

  render() {
    let filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' },
    ];
    let iconButtonElement = 
      <FlatButton label="Login" />;
    return (
      <div style={containerStyle}>
        <Toolbar>
          <ToolbarGroup key={1} float="left">
            <ToolbarTitle text="Telosys SaaS" />
          </ToolbarGroup>
          <ToolbarGroup key={2} float="right">
            <AuthStatus />
          </ToolbarGroup>
        </Toolbar>
        <Card>
          <Login onAddClick={(username, password) =>
            login(username, password)
          }></Login>
        </Card>
      </div>
    );
  },
});

export default Main;

function login(username, password) {
  alert('login !!');
}

/*
<div style={containerStyle}>
        <Dialog
          open={this.state.open}
          title="Super Secret Password"
          actions={standardActions}
          onRequestClose={this._handleRequestClose}
        >
          1-2-3-4-5-6
        </Dialog>
        <h1>material-ui</h1>
        <h2>example project</h2>
        <RaisedButton label="Super Secret Password" primary={true} onTouchTap={this._handleTouchTap} />
      </div>
*/