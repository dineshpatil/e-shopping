import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './components/shop/shop.component';
import Header from "./components/header/header.component";
import AuthPage from "./pages/auth-page/auth-page.component";
import CheckoutPage from './pages/checkout/checkout.component';
import { auth, createUserProfileDocument } from "./utils/firebase.utils";
import { selectCurrentUser } from "../src/redux/user/user.selector"

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/login' render={
            () => this.props.currentUser
              ? (<Redirect to='/' />)
              : (<AuthPage />)
          }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateTpProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateTpProps, mapDispatchToProps)(App);
