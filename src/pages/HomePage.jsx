import { useState, useEffect } from 'react';
import axios from "axios";
import Item from '../components/Item'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AiOutlineFileAdd } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const AddDiv = styled.div`
display: flex;
justify-content: right;
position: sticky;
  bottom: 30px;
  right: 50px;
`


const HomePage = () => {
    const [todo, setTodo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/get-todo")
            .then((res) => setTodo(res.data))
            .catch((err) => console.log(err));
    })

    return (
        <Container style={{marginTop: "20px"}}>
            <h1>Blog Posts</h1>
            <Row style={{ gap: "20px" }}>
                {todo.map((item) => (
                    <Col key={item._id} >
                        <Item
                            blogId={item._id}
                            text={item.text}
                            blog={item.blog} /></Col>))}
            </Row>
            <AddDiv>
                <Button variant="outline-dark" 
                onClick={()=>navigate('/newblog')}><AiOutlineFileAdd /></Button>
            </AddDiv>
        </Container>
    )
}

export default HomePage
