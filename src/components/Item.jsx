import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function Item({ blogId, text, blog }) {

    return (
        <Link to={`/blogpost/${blogId}`}
        style={{textDecoration: "none",
        color: "black"}} >
        <Card style={{ width: '18rem', background: "#C8C8C8" }}>
            <Card.Body>
                <Card.Title>{text}</Card.Title>
                <Card.Text>{blog.slice(0, 20)}...</Card.Text>
            </Card.Body>
        </Card>
        </Link>
    )
}