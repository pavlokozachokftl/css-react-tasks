import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import {Form} from 'semantic-ui-react';

const Dropdown = (props) => {
    const {options, onChange, name, label, error, value} = props;

    const handleChange = (e, {value}) => {
        onChange({
            target: {
                name, value
            }
        });
    };

    return (
        <Form.Dropdown className={styles.rounded_select}
                       required label={label}
                       options={options}
                       name={name}
                       onChange={handleChange}
                       error={error}
                       value={value}
        />
    );
};

export default Dropdown;

Dropdown.propTypes = {
    error: PropTypes.any,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired
};
