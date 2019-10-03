import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

const TextArea = (props) => {
    const {onChange, name, label, required = false, value, error = null} = props;

    return (
        <Form.TextArea
            required={required}
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            error={error}
        />
    );
};


export default TextArea;

TextArea.propTypes = {
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string
};
