import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getAlerts(this.props.user.username);
    }


    handleRemoveSpecificRow = (alert) => {
        this.props.removeAlert(alert._id);
    };

    render() {
        const {user, alerts, alert} = this.props;
        return (
            <div className="container-fluid">
                <h2>שלום {user.firstName}!</h2>
                {alerts.loading && <em>טוען התראות...</em>}
                {alert.type && alert.type === 'alert-error' &&
                <span className="text-danger">שגיאה: אין אפשרות להציג התראות</span>}
                {alerts.alerts &&
                <div className="table-responsive">
                    <table
                        className="table table-bordered table-hover w-auto"
                        id="tab_logic"
                    >
                        <thead>
                        <tr>
                            <th className="w-auto"> #</th>
                            <th className="text-center"> יצרן</th>
                            <th className="text-center"> דגם</th>
                            <th className="text-center"> שנה</th>
                            <th className="text-center"> מחיר</th>
                            <th className="text-center"> יד</th>
                            <th className="text-center"> קמ</th>
                            <th className="text-center"> מנוע</th>
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
                                        value={alerts.alerts[idx].manufacturer_text}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="model"
                                        value={alerts.alerts[idx].model_text}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="year"
                                        value={alerts.alerts[idx].year}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="price"
                                        value={alerts.alerts[idx].price}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="hand"
                                        value={alerts.alerts[idx].hand}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="km"
                                        value={alerts.alerts[idx].km}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        name="engineval"
                                        value={alerts.alerts[idx].engineval}
                                        className="form-control w-auto"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => this.handleRemoveSpecificRow(item, idx)}
                                    >
                                        הסר
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                }

                <Link to='/add'>
                    <button type="button" className="btn btn-info">הוסף התראה</button>
                </Link>
            </div>

        );

    }
}

function mapState(state) {
    const {alerts, authentication, alert} = state;
    const {user} = authentication;
    return {user, alerts, alert};
}

const actionCreators = {
    getAlerts: userActions.getAlerts,
    deleteUser: userActions.delete,
    removeAlert: userActions.removeAlert
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export {connectedHomePage as HomePage};
