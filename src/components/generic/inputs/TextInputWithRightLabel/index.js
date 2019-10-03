import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const TextInputWithRightLabel = (props) => {
    const {onChange, name, label, placeholder, content, error = null, required = false, type = 'text', value} = props;

    const isRequired = required ? 'required' : '';
    const isErrored = error ? 'error' : '';

    const errorTooltip = error
        ? <div className="ui pointing above prompt label">{error}</div>
        : null;

    return (
        <div className={[isRequired, isErrored, 'field', styles.icon_input].join(' ')}>
            <label>{label}</label>
            <div className="ui input">
                <input onChange={onChange}
                       placeholder={placeholder}
                       name={name}
                       type={type}
                       value={value}/>
                <div className={[styles.label].join(' ')}>{content}</div>
            </div>
            {errorTooltip}
        </div>
    );
};


export default TextInputWithRightLabel;

TextInputWithRightLabel.propTypes = {
    content: PropTypes.string.isRequired,
    error: PropTypes.any,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.any.isRequired
};
