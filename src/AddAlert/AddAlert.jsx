import React from 'react';
import {connect} from 'react-redux';
import modelData from '../Lib/models';
import {alertActions, userActions} from '../_actions';
import { Form, Button, Col, Table } from 'react-bootstrap';
import {Link} from "react-router-dom";

const years = () => {
    let result = [];
    for (let i=new Date().getFullYear();i>1970;i--)
    {
        result.push(i);
    }
    return result;
};

const hands = () => {
    let result = [];
    for (let i=0;i<5;i++)
    {
        result.push(i);
    }
    return result;
};

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
                            <Form.Label>יצרן</Form.Label>
                            <Form.Control as="select" onChange={(event) => this.handleChange(event)}>
                                {modelData.map((model, index) =>
                                    <option key={model.value} id={model.value}>
                                        {model.text}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formModel">
                            <Form.Label>דגם</Form.Label>
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
                            <Form.Label>שנה מ</Form.Label>
                            <Form.Control as="select">
                                {years().map(y => <option key={y}>{y}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYearTo">
                            <Form.Label>שנה עד</Form.Label>
                            <Form.Control as="select">
                                {years().map(y => <option key={y}>{y}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formPriceFrom">
                            <Form.Label>מחיר מ</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fromPriceTo">
                            <Form.Label>מחיר עד</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formKmFrom">
                            <Form.Label>קמ מ</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formKmTo">
                            <Form.Label>קמ עד</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fromEngineSize">
                            <Form.Label>נפח מנוע מ</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="toEngineSize">
                            <Form.Label>נפח מנוע עד</Form.Label>
                            <Form.Control as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fromHand">
                            <Form.Label>יד מ</Form.Label>
                            <Form.Control as="select">
                                {hands().map(h => <option key={h}>{h}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="toHand">
                            <Form.Label>יד עד</Form.Label>
                            <Form.Control as="select">
                                {hands().map(h => <option key={h}>{h}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Table transparent="true">
                        <tbody>
                        <tr>
                            <td>
                    <Button variant="info" type="submit">
                        הוספה
                    </Button>
                            </td>
                            <td>
                    <Link to='/'>
                        <button type="button" className="btn btn-info">חזור</button>
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
