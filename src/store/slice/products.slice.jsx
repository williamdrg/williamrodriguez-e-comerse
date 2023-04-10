import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProduts: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    axios  
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(resp => dispatch(setProduts(resp.data)))
        .catch(error => console.error(error))
        .finally(dispatch(setIsLoading(false)))
}  

export const filterProdcutsThunk = id => dispatch => {
    dispatch(setIsLoading(true))
    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(resp => dispatch(setProduts(resp.data)))
        .catch(error => console.log(error))
        .finally(dispatch(setIsLoading(false)))
}      

export const filterByNameProductThunk = nameProductInput => dispatch => {
    dispatch(setIsLoading(true))

    axios
    .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${nameProductInput}`)
    .then(resp => dispatch(setProduts(resp.data)))
    .catch(error => console.log(error))
    .finally(dispatch(setIsLoading(false)))
} 

export const { setProduts } = productsSlice.actions;

export default productsSlice.reducer;

