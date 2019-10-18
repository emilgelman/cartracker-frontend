import React from 'react';
import {connect} from 'react-redux';
import modelData from '../Lib/models';
import {alertActions, userActions} from '../_actions';
import { Form, Button, Col, Table } from 'react-bootstrap';
import {Link} from "react-router-dom";
class AddAlert extends React.Component {
    constructor(props)
    {
        super(props);
        this.updateModels("1");

    }
    // componentDidMount() {
    //     // this.props.getAlerts(this.props.user.username);
    // }

    handleChange(event) {
        let id = event.target[event.target.selectedIndex].id;
        this.updateModels(id);
    }

    updateModels(id) {
        this.props.updateModels(modelData, id);
    }


    render() {
        const { user, models} = this.props;
        return (
            <div className="col-4 col">
                <h1>hi {user.firstName}</h1>
                <Form>

                    <Form.Row>


                        <Form.Group as={Col} controlId="formManufacturer">
                            <Form.Label>Manufacturer</Form.Label>
                            <Form.Control as="select" onChange={(event) => this.handleChange(event)}>
                                {modelData.map((model, index) =>
                                    <option key={model.value} id={model.value}>
                                        {model.text}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control as="select">
                                {models.models && models.models.map((model, index) =>
                                    <option key={model.value} id={model.value}>
                                        {model.text}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formYearFrom">
                            <Form.Label>From year</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYearTo">
                            <Form.Label>To year</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formPriceFrom">
                            <Form.Label>From price</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fromPriceTo">
                            <Form.Label>To price</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formKmFrom">
                            <Form.Label>from KM</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formKmTo">
                            <Form.Label>to KM</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fromEngineSize">
                            <Form.Label>From engine size</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="toEngineSize">
                            <Form.Label>To engine size</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formYearFrom">
                            <Form.Label>From hand</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYearTo">
                            <Form.Label>To hand</Form.Label>
                            <Form.Control as="select">
                                <option>Choose...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Table transparent="true">
                        <tbody>
                        <tr>
                            <td>
                    <Button variant="info" type="submit">
                        Add
                    </Button>
                            </td>
                            <td>
                    <Link to='/'>
                        <button type="button" className="btn btn-info">Back</button>
                    </Link>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Form>
            </div>

        );

    }
}

function mapState(state) {
    const { alerts, authentication, models } = state;
    const { user } = authentication;
    return { user, alerts, models };
}

const actionCreators = {
    updateModels : userActions.updateModels
};

const connectedAddAlertPage = connect(mapState, actionCreators)(AddAlert);
export { connectedAddAlertPage as AddAlert };
