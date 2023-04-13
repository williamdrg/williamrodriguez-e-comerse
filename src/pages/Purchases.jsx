import axios from "axios";
import { useEffect, useState } from "react";
import getConfig from "../utils/getConfig";



const Purchases = () => {

    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        axios
            .get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
            .then(resp => setPurchases(resp.data))
            .catch(error => console.error(error))
        
    },[])

    
    return (
        <div className="purchases-container">
            { purchases.map(item => {
                const date = new Date(item.updatedAt)
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                return(
                 <div key={item.id} className="purchases">
                    <div><img src={item.product?.images[0].url} alt="imagen del producto" /></div>
                    <div><h3>{item.product?.title}</h3></div>
                    <div><p>{formattedDate}</p></div>
                    <div>{item.quantity}</div>
                    <div><p>$ {item.product.price*item.quantity}</p></div>            
                </div>
            )})
           
            }
        </div>
    );
};

export default Purchases;