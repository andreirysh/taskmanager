import React from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import './CommonTextArea.css'

function CommonTextArea(props) {
  return (
    <FormGroup>
      <Form.Label>{props.label}<span className="required-field">*</span></Form.Label>
      <Form.Control
        as="textarea"
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
      />
    </FormGroup>
  );
}

export default CommonTextArea;
