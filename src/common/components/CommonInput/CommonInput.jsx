import React from 'react'
import Form from 'react-bootstrap/Form';

function CommonInput(props) {

    return (
        <Form.Group className="mb-3" controlId={props.controlIdName}>
            {props.labelname ? <Form.Label>{props.labelname}</Form.Label> : ''}
            <Form.Control
                type={props.inputtype}
                placeholder={props.placeholder}
                value={props.value}
                className={props.className}
                onChange={props.onChange}
            />
        </Form.Group>
    )
}

export default CommonInput