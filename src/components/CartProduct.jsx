import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProductQuantity, deleteProductThunk } from '../store/slice/cart.slice';


const CartProduct = ({product}) => {

    const [counter, setCounter] = useState(product.quantity)
    const dispatch = useDispatch()

    const decrement = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            dispatch(updateProductQuantity({ id: product.id, quantity: counter - 1 }))
        }
    }

    const increment = () => {
        setCounter(counter + 1);
        dispatch(updateProductQuantity({ id: product.id, quantity: counter + 1 }))
    }

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProductThunk(productId))
      }


    return (
        <div className='productCart'>
            <img className='imgProduct' src={product.product.images[0].url} alt="" />
            <div className='delete'><i onClick={() => handleDeleteProduct(product.id)} className="fa-solid fa-trash"></i></div>
            <h5>{product.product.title}</h5>
            <h5>$ {product.product.price*counter}</h5>
            <div className="counter">
                <Button onClick={() => decrement()} className="btn-"><i className="fa-solid fa-minus"></i></Button>
                <h3>{ counter }</h3>
                <Button onClick={() => increment()} className="btn+"><i className="fa-solid fa-plus"></i></Button>
            </div>
        </div>
    );
};

export default CartProduct;