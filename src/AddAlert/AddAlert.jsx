import React from 'react';
import {connect} from 'react-redux';
import modelData from '../Lib/models';
import {alertActions, userActions} from '../_actions';
import {Form, Button, Col, Table} from 'react-bootstrap';
import {Link} from "react-router-dom";

const years = () => {
    let result = [];
    for (let i = new Date().getFullYear(); i > 1970; i--) {
        result.push(i);
    }
    return result;
};

const hands = () => {
    let result = [];
    for (let i = 0; i < 5; i++) {
        result.push(i);
    }
    return result;
};

class AddAlert extends React.Component {
    constructor(props) {
        super(props);
        this.updateModels("1");
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        let id = event.target[event.target.selectedIndex].id;
        this.updateModels(id);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const alert = {
            manufacturer : event.target[0].selectedOptions[0].id,
            manufacturer_text : `${data.get("manufacturer")}`,
            model :event.target[1].selectedOptions[0].id,
            model_text : `${data.get("model")}`,
            price: `${data.get("priceFrom")}-${data.get("priceTo")}`,
            km : `${data.get("kmFrom")}-${data.get("kmTo")}`,
            hand : `${data.get("handFrom")}-${data.get("handTo")}`,
            year : `${data.get("yearFrom")}-${data.get("yearTo")}`,
            engineval : `${data.get("enginevalFrom")}-${data.get("enginevalTo")}`,
            username : this.props.user.username
        };
        this.props.addAlert(alert);
    }

    updateModels(id) {
        this.props.updateModels(modelData, id);
    }


    render() {
        const {user, models, alert} = this.props;
        return (
            <div className="col">
                {alert.type && alert.type === 'alert-error' && <span className="text-danger">אירעה שגיעה, אין אפשרות להוסיף התראה חדשה</span>}

                <Form onSubmit={this.handleSubmit}>

                    <Form.Row>


                        <Form.Group as={Col} controlId="formManufacturer">
                            <Form.Label>יצרן</Form.Label>
                            <Form.Control id="manufacturer" name="manufacturer" as="select" onChange={(event) => this.handleChange(event)}>
                                {modelData.map((model, index) =>
                                    <option key={model.value} id={model.value}>
                                        {model.text}
                                    </option>
                                )}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formModel">
                            <Form.Label>דגם</Form.Label>
                            <Form.Control id="model" name="model" as="select">
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
                            <Form.Control id="yearFrom" name="yearFrom" as="select">
                                {years().map(y => <option key={y}>{y}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formYearTo">
                            <Form.Label>שנה עד</Form.Label>
                            <Form.Control id="yearTo" name="yearTo" as="select">
                                {years().map(y => <option key={y}>{y}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formPriceFrom">
                            <Form.Label>מחיר מ</Form.Label>
                            <Form.Control id="priceFrom" name="priceFrom" as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fromPriceTo">
                            <Form.Label>מחיר עד</Form.Label>
                            <Form.Control id="priceTo" name="priceTo" as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formKmFrom">
                            <Form.Label>קמ מ</Form.Label>
                            <Form.Control id="kmFrom" name="kmFrom" as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formKmTo">
                            <Form.Label>קמ עד</Form.Label>
                            <Form.Control id="kmTo" name="kmTo" as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fromEngineSize">
                            <Form.Label>נפח מנוע מ</Form.Label>
                            <Form.Control id="enginevalFrom" name="enginevalFrom" as="input">
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="toEngineSize">
                            <Form.Label>נפח מנוע עד</Form.Label>
                            <Form.Control id="enginevalTo" name="enginevalTo" as="input">
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="fromHand">
                            <Form.Label>יד מ</Form.Label>
                            <Form.Control id="handFrom" name="handFrom" as="select">
                                {hands().map(h => <option key={h}>{h}</option>)}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="toHand">
                            <Form.Label>יד עד</Form.Label>
                            <Form.Control id="handTo" name="handTo" as="select">
                                {hands().map(h => <option key={h}>{h}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>


                                <Button className="btn btn-info" type="submit">
                                    הוספה
                                </Button>

                                <Link to="/" className="btn btn-link">חזור</Link>
                </Form>
            </div>

        );

    }
}

function mapState(state) {
    const {alerts, authentication, models,alert } = state;
    const {user} = authentication;
    return {user, alerts, models, alert};
}

const actionCreators = {
    updateModels: userActions.updateModels,
    addAlert : userActions.addAlert
};

const connectedAddAlertPage = connect(mapState, actionCreators)(AddAlert);
export {connectedAddAlertPage as AddAlert};
