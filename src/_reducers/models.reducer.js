import { userConstants } from '../_constants';

export function models(state = {}, action) {
    switch (action.type) {
        case userConstants.GETMODELS_SUCCESS:
            return {
               models : action.models
            };
        default:
            return state
    }
}
