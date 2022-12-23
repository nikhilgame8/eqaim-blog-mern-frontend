import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { BiHome, BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FiUpload } from 'react-icons/fi';
import { AiTwotoneDelete } from 'react-icons/ai';


const BlogDiv = styled.div`
    width: 300px;
    height: 300px;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  `
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
flex-direction: column;
align-items: left;
gap: 10px;
`

const BlogPost = () => {
  const [todo, setTodo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [blog, setBlog] = useState("");
  const [isUpdating, setUpdating] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  })

  const addUpdateTodo = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/update-todo", { _id: isUpdating, text, blog })
      .then((res) => {
        console.log(res.data);
        setText("");
        setBlog("");
        setUpdating("");
      })
      .catch((err) => console.log(err));
  }

  const deleteTodo = (_id) => {
    axios.post("http://localhost:5000/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
      navigate('/');
  }

  const updateTodo = () => {
    todo.map((item) => {
      if (item._id === id) {
        setBlog(item.blog);
        setText(item.text);
        setUpdating(item._id);
      }})
      console.log(text, blog)
  }

  return (
    (isUpdating === "") ?
      <div>
        <AddDiv>
          <div>
            <Button variant="outline-dark"
              onClick={() => navigate('/')}><BiHome /></Button>
          </div>
          <div>
            <Button variant="outline-dark"
              onClick={updateTodo}><BiEditAlt /></Button>
          </div>
        </AddDiv>

        <BlogDiv>
          {todo.map((item) => (id === item._id) &&
            (<Card key={item._id} style={{ width: '18rem', background: "#C8C8C8" }}>
              <Card.Body>
                <Card.Title>{item.text}</Card.Title>
                <Card.Text>{item.blog}</Card.Text>
              </Card.Body>
            </Card>))}
        </BlogDiv>
      </div> : <div>
        <>
          {
            (alert === true) ?
              <Alert variant="secondary">
                Your blog is uploaded
              </Alert> : ""
          }
        </>
        <AddDiv>
          <div>
          <Button variant="outline-dark"
            onClick={() => navigate('/')}><BiHome /></Button></div>
            <div>
            <Button variant="outline-dark"
            onClick={() => deleteTodo(id)}><AiTwotoneDelete /></Button>
            </div>
        </AddDiv>
        <FormDiv>
          <h1>UPDATE BLOG</h1>
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
            <Button type='submit' variant="secondary"><FiUpload /></Button>
          </Form>
        </FormDiv>
      </div>
  )
}

export default BlogPost
