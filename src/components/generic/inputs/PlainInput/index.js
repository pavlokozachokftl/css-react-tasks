import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'semantic-ui-react';

const PlainInput = (props) => {
    const {onChange, name, label, placeholder = '', required = false, value, disabled = false, error = null, type = 'text'} = props;

    return (
        <Form.Input required={required}
                    disabled={disabled}
                    label={label}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    error={error}/>
    );
};

export default PlainInput;

PlainInput.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.any,
    type: PropTypes.string
};
