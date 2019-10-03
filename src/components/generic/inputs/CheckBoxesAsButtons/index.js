import PropTypes from 'prop-types';
import React from 'react';

import styles from './index.module.css';
import {Form} from 'semantic-ui-react';

const CheckBoxesAsButtons = (props) => {
    const {options = [], name, value, error = null, required = false, onChange, label} = props;

    const handleClick = (item) =>
        () => onChange({
            target: {
                name: name,
                value: item.value
            }
        });

    const errorTooltip = error
        ? <div className="ui pointing above prompt label">{error}</div>
        : null;

    return (
        <Form.Field required={required}>
            <label>{label}</label>
            <div className={styles.placeholder}>
                {
                    options.map((item, i) => {
                        const checked = item.value === value;

                        const className = checked
                            ? `${styles.button} ${styles.checked}`
                            : styles.button;

                        return <span key={`c_${i}`}
                                     onClick={handleClick(item)}
                                     className={className}>{item.title}</span>;
                    })
                }
            </div>
            {errorTooltip}
        </Form.Field>
    );
};

export default CheckBoxesAsButtons;

CheckBoxesAsButtons.propTypes = {
    error: PropTypes.any,
    label: PropTypes.any,
    name: PropTypes.any,
    onChange: PropTypes.any,
    options: PropTypes.array,
    required: PropTypes.bool,
    value: PropTypes.any
};
