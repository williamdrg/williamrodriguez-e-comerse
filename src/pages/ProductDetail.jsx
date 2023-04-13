import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import { Button, Alert } from "react-bootstrap";
import { createCartThunk } from "../store/slice/cart.slice";
import { useDispatch } from "react-redux";


const ProductDetail = () => {

    // se utiliza para sacar la información de un parametro de una url
    const { id } = useParams()
    const [ detail, setDetail ] = useState({})
    const [counter, setCounter] = useState(1)
    const [showAlert, setShowAlert] = useState(false)
    const dispatch = useDispatch()

   
    useEffect(() => {
        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(resp => setDetail(resp.data))
            .catch(error => console.error(error))
    },[])

    const addProducts = () => {
        const data = {
            quantity: counter,
            productId: id
        }

        dispatch(createCartThunk(data, setShowAlert))
        setCounter(1)
        
    }

    const decrement = () => {
        if (counter > 1) {
            setCounter(counter - 1)
        }
    }

    return (
        <div className="detail_container">
            <Carousel 
                pause='hover'
            >
                {
                    detail.images?.map(image =>(
                        <Carousel.Item key={image.url}>
                        <img
                        className="d-block"
                        src={image.url}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    ))
                }
                </Carousel>

                <div className="info_container">
                    <h3>{detail.brand}</h3>
                    <h3>{detail.title}</h3>
                    <p>{detail.description}</p>
                    <div className="price">
                        <div>
                            <span>Price</span>
                            <span className="price">$ {detail.price}</span>
                        </div>
                        <div>
                            <span>Quantity</span>
                            <div className="counter">
                                <Button className="btn-" onClick={() => decrement()}><i className="fa-solid fa-minus"></i></Button>
                                <h3>{ counter }</h3>
                                <Button className="btn+" onClick={() => setCounter(counter + 1)}><i className="fa-solid fa-plus"></i></Button>
                            </div>
                        </div>
                    </div>

                    <Button onClick={addProducts}> Add to cart</Button>
                    {showAlert && <Alert variant="primary" className="mt-3">This product has been added to your cart!</Alert>}
                </div>
        </div>
    );
};

export default ProductDetail;