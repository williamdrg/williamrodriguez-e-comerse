import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


const ProductDetail = () => {

    // se utiliza para sacar la información de un parametro de una url
    const { id } = useParams()
    const [ detail, setDetail ] = useState({})

    useEffect(() => {
        axios
            .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(resp => setDetail(resp.data))
            .catch(error => console.error(error))
    },[])

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
                    <span>Price</span>
                    <span className="price">$ {detail.price}</span>
                </div>
        </div>
    );
};

export default ProductDetail;