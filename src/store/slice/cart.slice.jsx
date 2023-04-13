import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig'
import { setIsLoading } from './isLoading.slice';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            return action.payload
        }, 

        updateProductQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const productIndex = state.findIndex(product => product.id === id);
            if (productIndex !== - 1) {
                state[productIndex].quantity = quantity;
            }
        }
    }

})

export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
        .then(resp => dispatch(setCart(resp.data)))
        .catch(error => console.error(error))
        .finally(dispatch(setIsLoading(false)))
}

export const createCartThunk = (data, setShowAlert) => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
        .then(() => dispatch(getCartThunk()))
        .catch(error => { 
            if (error.response.status === 403) {
                setShowAlert(true)
            } else {
                console.error(error)
            }
        })
        .finally(dispatch(setIsLoading(false)))
}

export const deleteProductThunk = productId => dispatch => {
    dispatch(setIsLoading(true))
    axios
      .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${productId}`, getConfig())
      .then(() => dispatch(getCartThunk()))
      .catch((error) => console.error(error))
      .finally(() => dispatch(setIsLoading(false)))
}

export const cartCheckoutThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios
      .post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases',{} ,getConfig())
      .then(() => dispatch(getCartThunk()))
      .catch((error) => console.error(error))
      .finally(() => dispatch(setIsLoading(false)))

}


export const { setCart, updateProductQuantity } = cartSlice.actions;

export default cartSlice.reducer;
