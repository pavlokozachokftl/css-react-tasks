import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from 'react-datepicker';
import {Form, Icon} from 'semantic-ui-react';

//as part of datepicker stylization
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './index.module.css';

const CustomDatePicker = (props) => {
    const {placeholder, onChange, value, name, required, label} = props;

    const handleChange = (value) => onChange({target: {name, value}});

    return (
        <Form.Field
            className={styles.date_picker}
            required={required}
        >
            <label>{label}</label>
            <DatePicker placeholderText={placeholder}
                        onChange={handleChange}
                        selected={value}
                        name={name}
                        dateFormat="dd/mm/yyyy"
            />
            <Icon className={styles.icon} name={'calendar outline'}/>
        </Form.Field>

    );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.any
};
