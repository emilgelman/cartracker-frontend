import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAlerts,
    removeAlert,
    delete: _delete,
    updateModels
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAlerts(id) {
    return dispatch => {
        dispatch(request());

        userService.getAlerts(id)
            .then(
                alerts => dispatch(success(alerts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALERTS_REQUEST } }
    function success(alerts) { return { type: userConstants.GETALERTS_SUCCESS, alerts } }
    function failure(error) { return { type: userConstants.GETALERTS_FAILURE, error } }
}

function updateModels(manufacturers, id) { //todo emilgelm move to model actions
    return dispatch => {
        try {
            let models = manufacturers.filter(manufacturer => manufacturer.value === id)[0].models.model;
            dispatch(success(models));
        }
        catch (err) {
            dispatch(failure(err));
        }
    };

    function success(models) { return { type: userConstants.GETMODELS_SUCCESS, models } }
    function failure(error) { return { type: userConstants.GETMODELS_FAILURE, error } }
}

function removeAlert(id) {
    return dispatch => {
        dispatch(request(id));

        userService.removeAlert(id)
            .then(
                alerts => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.REMOVEALERT_REQUEST, id } }
    function success(id) { return { type: userConstants.REMOVEALERT_SUCCESS, id } }
    function failure(error) { return { type: userConstants.REMOVEALERT_FAILURE, id, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
