import { userConstants } from '../_constants';

export function alerts(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALERTS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALERTS_SUCCESS:
      return {
        alerts: action.alerts
      };
    case userConstants.ADDALERT_FAILURE:
      return {
        error: action.error
      };
    case userConstants.GETALERTS_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.REMOVEALERT_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        alerts: state.alerts.map(alert =>
            alert._id === action._id
                ? { ...alert, deleting: true }
                : alert
        )
      };
    case userConstants.REMOVEALERT_SUCCESS:
      // remove deleted user from state
      return {
        alerts: state.alerts.filter(alert => alert._id !== action.id)
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}
