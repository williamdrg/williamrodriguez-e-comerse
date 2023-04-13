import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCartThunk, cartCheckoutThunk } from '../store/slice/cart.slice';
import CartProduct from './CartProduct';
import { Button } from 'react-bootstrap';

const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.cart)
   
   const token = localStorage.getItem("token")

    useEffect(() => {
        if (token) dispatch(getCartThunk())
        
    },[token])

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Shopping cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {
                    products.map(product => (
                        <CartProduct
                            key={product.id}
                            product = { product }
                        />
                    ))
                }

                <Button  
                onClick={() => dispatch(cartCheckoutThunk())}
                className='checkout'
                >
                    Checkout
                </Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSidebar;