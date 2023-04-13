import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { filterProdcutsThunk, getProductsThunk, filterByNameProductThunk } from '../store/slice/products.slice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';   
import { Link } from 'react-router-dom'; 

const Home = () => {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [inputSearch, setInputShearh] = useState('')

    useEffect(() => {
       dispatch(getProductsThunk()) 
        
       axios
        .get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        .then(resp => setCategories(resp.data))
        .catch(error => console.error(error))

    },[])

    return (
        <div>
            <Container>
                <Row className='py-3'>
                    {
                    categories.map(category => (
                    <Col key={category.id}>
                        <Button className='w-100' onClick={() => dispatch(filterProdcutsThunk(category.id))}>{category.name}</Button>
                    </Col>
                        ))   
                    }
                    <Col>
                        <Button className='w-100'
                                onClick={()=>dispatch(getProductsThunk()) }
                        >
                            All Products
                        </Button>
                    </Col>
                </Row>

                <Row className='py-3'>
                    <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Buscar producto"
                        aria-label="produt name"
                        aria-describedby="basic-addon2"
                        value={inputSearch}
                        onChange={e => setInputShearh(e.target.value)}
                        />
                        <Button variant="outline-secondary" 
                        id="button-addon2"
                        onClick={()=> dispatch(filterByNameProductThunk(inputSearch))}
                        >
                        Search
                        </Button>
                    </InputGroup>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3} className='py-3'>
                    {
                        products.map( product => (
                            <Col key={product.id} className='mb-3'>
                            <Card style={{ width: '18rem' }}>
                            <Card.Img 
                            variant="top" 
                            src={product.images[0].url} 
                            // style={{height: 200, objectFit: "cover"}}
                            />
                            <Card.Body>
                                <Card.Title>{product.brand}</Card.Title>
                                <Card.Text>
                                {product.title}
                                </Card.Text>
                                <Button 
                                variant="primary"
                                as={ Link }
                                to={`/product/${product.id}`}
                                >
                                    Ver detalle
                                </Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))
                    }
                   
                </Row>
            </Container>
        </div>
    );
};

export default Home;