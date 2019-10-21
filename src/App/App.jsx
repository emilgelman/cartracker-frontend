import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { AddAlert } from '../AddAlert';
import { Container, Navbar, Nav, NavDropdown, Button, FormControl, Form, Jumbotron } from 'react-bootstrap';
class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert, user } = this.props;
        return (
                <div className="w-auto" >
                        <Navbar expand="lg" fixed="top" bg="info" variant="light">
                            <Navbar.Brand href="/">בית</Navbar.Brand>
                            <Navbar.Brand>|</Navbar.Brand>
                            <Navbar.Brand href="/login">
                                {user ?
                                    <span>התנתק</span>
                                    :
                                    <span>התחבר</span>
                                }
                            </Navbar.Brand>
                        </Navbar>
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    <Jumbotron style={{"height": "100vh"}}>

                    <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/add" component={AddAlert} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </Jumbotron>

                    <Navbar expand="lg" fixed="bottom" bg="info" variant="light">
                        <Navbar.Brand href="https://www.linkedin.com/in/emil-gelman-653787105">2019 Emil Gelman © </Navbar.Brand>
                    </Navbar>


                </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    const { alert } = state;
    return { alert, user };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
