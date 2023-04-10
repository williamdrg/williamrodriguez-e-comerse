    import { configureStore } from '@reduxjs/toolkit'
    import  products  from './slice/products.slice'
    import isLoading from './slice/isLoading.slice'

    export default configureStore({
        reducer: {
            products,
            isLoading
        }
    })
