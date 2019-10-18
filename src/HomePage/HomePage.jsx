import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Form, Button, Col, Table} from 'react-bootstrap';

import {userActions} from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getAlerts(this.props.user.username);
    }



    handleRemoveSpecificRow = (alert) => {
        this.props.removeAlert(alert._id);
    };

    render() {
        const {user, alerts} = this.props;
        return (
            <div className="col-md-12">
                <h2>Welcome {user.firstName}!</h2>
                {alerts.loading && <em>Loading users...</em>}
                {alerts.error && <span className="text-danger">ERROR: {alerts.error}</span>}
                {alerts.alerts &&
                /* <ul>
                     {alerts.alerts.map((alert, index) =>
                         <li key={alert.manufacturer}>
                             {alert.manufacturer}
                         </li>
                     )}
                 </ul>*/
                <table
                    className="table table-bordered table-hover"
                    id="tab_logic"
                >
                    <thead>
                    <tr>
                        <th className="text-center"> #</th>
                        <th className="text-center"> Manufacturer</th>
                        <th className="text-center"> Price</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {alerts.alerts.map((item, idx) => (
                        <tr id="addr0" key={idx}>
                            <td>{idx}</td>
                            <td>
                                <input
                                    type="text"
                                    name="manufacturer"
                                    value={alerts.alerts[idx].manufacturer}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="price"
                                    value={alerts.alerts[idx].price}
                                    className="form-control"
                                    readOnly
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => this.handleRemoveSpecificRow(item, idx)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                }

                <Link to='/add'>
                    <button type="button" className="btn btn-info">Add</button>
                </Link>
            </div>

        );

    }
}

function mapState(state) {
    const {alerts, authentication} = state;
    const {user} = authentication;
    return {user, alerts};
}

const actionCreators = {
    getAlerts: userActions.getAlerts,
    deleteUser: userActions.delete,
    removeAlert: userActions.removeAlert
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
