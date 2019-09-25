import * as actionTypes from './actions'

const initialState = {
    cart: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.payload]
            }
        case actionTypes.UPDATE_CART:
            return {
                ...state,
                cart: []
            }
        default: 
    }

    return state;
}

export default reducer;