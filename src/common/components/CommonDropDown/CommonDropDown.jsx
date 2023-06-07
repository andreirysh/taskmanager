import React, { useState } from 'react';
import { FormGroup, Form, Dropdown } from 'react-bootstrap';
import './CommonDropDown.css'

function CommonDropDown(props) {
  const [selectedOption, setSelectedOption] = useState(props.name);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    props.onSelect(option);
  };

  return (
    <FormGroup>
      <Form.Label>
        {props.label}
        <span className="required-field">*</span>
      </Form.Label>
      <Dropdown>
        <Dropdown.Toggle variant={props.variant} id={props.id}>
          {selectedOption}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {props.items.map((item) => (
            <Dropdown.Item key={item} onClick={() => handleOptionSelect(item)}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </FormGroup>
  );
}

export default CommonDropDown;
