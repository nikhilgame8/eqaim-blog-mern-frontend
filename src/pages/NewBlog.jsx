import React, { useState } from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FiUpload } from 'react-icons/fi';
import { BiHome } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const FormDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
h1{
    font-size: 20px;
}
`
const AddDiv = styled.div`
display: flex;
justify-content: left;
margin-left: 30px;
position: sticky;
  top: 80px;
`

const NewBlog = () => {
    const [text, setText] = useState("");
    const [blog, setBlog] = useState("");
    const [selectedFile, setFile] = useState(null);
    const [alert, setAlert] = useState(false);
    const navigate = useNavigate();

    const addUpdateTodo = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/save-todo", { text, blog })
            .then((res) => {
                console.log(res.data);
                setText("");
                setBlog("");
                setFile(null);
                setAlert(true);
                setTimeout(()=>{
                    setAlert(false);
                }, 2000)
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <>
            {
                (alert===true) ?
            <Alert variant="secondary">
                Your blog is uploaded
            </Alert>: ""
            }
            </>
            <AddDiv>
                <Button variant="outline-dark" 
                onClick={()=>navigate('/')}><BiHome /></Button>
            </AddDiv>
            <FormDiv>
                <h1>POST NEW BLOG</h1>
                <Form onSubmit={addUpdateTodo} style={{ width: '40%' }}>
                    <Form.Group className="mb-3" controlId="textForm.ControlInput1">
                        <Form.Control
                            type="text"
                            placeholder='Blogpost Title...'
                            value={text}
                            onChange={(e) => setText(e.target.value)} />
                        <Form.Control as="textarea" rows={10}
                            placeholder='Add your blog...'
                            value={blog}
                            onChange={(e) => setBlog(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFileSm" className="mb-3">
                        <Form.Control type="file" size="sm" onChange={(e)=>setFile(e.target.files[0])}/>
                    </Form.Group>
                    <Button type='submit' variant="secondary"><FiUpload /></Button>
                </Form>
            </FormDiv>
        </div>
    )
}

export default NewBlog
