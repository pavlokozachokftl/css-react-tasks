import React, {Component} from 'react';
import moment from 'moment';
import {Button, Icon, Form, Grid, Container, Header} from 'semantic-ui-react';
import CheckBoxesAsButtons from '../../generic/inputs/CheckBoxesAsButtons';
import Dropdown from '../../generic/inputs/Dropdown';
import TextInputWithRightLabel from '../../generic/inputs/TextInputWithRightLabel';
import Textarea from '../../generic/inputs/Textarea';
import DatePicker from '../../generic/inputs/DatePicker';
import PlainInput from '../../generic/inputs/PlainInput';

import styles from './index.module.css';

import crops from '../../constants/crops';
import farmStatuses from '../../constants/farmStatuses';

class AddBlockForm extends Component {
    state = {
        crop: null,
        age: '',
        row_spacing: '',
        block_name: '',
        block_size: '',
        rows: '',
        tree_spacing: '',
        no_of_trees: '',
        date_of_planting: '',
        farm_status: '',
        comments: '',

        //errors
        block_name_error: null,
        block_size_error: null,
        crop_error: null,
        rows_error: null,
        row_spacing_error: null,
        tree_spacing_error: null,
        no_of_trees_error: null,
        date_of_planting_error: null,
        farm_status_error: null
    };

    validatePositiveInput = (value) => {
        const valueIsNumber = !Number.isNaN(Number.parseFloat(value));
        const valueIsPositive = valueIsNumber && value > 0;

        if (valueIsNumber && valueIsPositive) return null;

        return 'Value should be a positive float';
    };

    validateRequiredValue = (value) => !!value ? null : 'Required value';

    handleSubmit = () => {
        const errors = {
            block_name_error: this.validateRequiredValue(this.state.block_name),
            block_size_error: this.validatePositiveInput(this.state.block_size),
            crop_error: this.validateRequiredValue(this.state.crop),
            rows_error: this.validatePositiveInput(this.state.rows),
            row_spacing_error: this.validatePositiveInput(this.state.row_spacing),
            tree_spacing_error: this.validatePositiveInput(this.state.tree_spacing),
            no_of_trees_error: this.validatePositiveInput(this.state.no_of_trees),
            date_of_planting_error: this.validateRequiredValue(this.state.date_of_planting),
            farm_status_error: this.validateRequiredValue(this.state.farm_status)
        };

        const numberOfErrors = Object
            .values(errors)
            .reduce((prev, curr) => {
                if (!!curr) {
                    return prev + 1;
                }

                return prev;
            }, 0);

        if (numberOfErrors === 0) {
            //if there is no errors
            alert('hooray! you can get your object from console!');

            const data = {
                block_name: this.state.block_name,
                block_size: this.state.block_size,
                crop: this.state.crop,
                rows: this.state.rows,
                row_spacing: this.state.row_spacing,
                tree_spacing: this.state.tree_spacing,
                no_of_trees: this.state.no_of_trees,
                date_of_planting: this.state.date_of_planting,
                farm_status: this.state.farm_status,
                comments: this.state.comments
            };

            console.log(data);
        } else {
            this.setState(errors);
        }
    };

    handleChange = ({target: {name, value}}) => {
        this.setState({
            [name]: value,
            [`${name}_error`]: null
        });
    };

    render() {
        const {
            row_spacing: rowSpacing,
            tree_spacing: treeSpacing,
            block_size: blockSize
        } = this.state;

        const treesHa = rowSpacing && treeSpacing
            ? Number(10000 / rowSpacing / treeSpacing).toFixed(2)
            : '';

        const treesVines = blockSize && treesHa
            ? Number(blockSize * treesHa).toFixed(2)
            : '';

        const date = moment(this.state.date_of_planting);

        let age = moment(Date.now()).diff(date, 'year');

        age = Number.isNaN(age) ? '' : age;

        const FormInputs = {
            blockName: <PlainInput required
                                   label={'Block Name'}
                                   name={'block_name'}
                                   onChange={this.handleChange}
                                   value={this.state.block_name}
                                   error={this.state.block_name_error}/>,
            blockSize: <TextInputWithRightLabel
                required
                placeholder={''}
                onChange={this.handleChange}
                label={'Block\'s Size'}
                content={'Ha'}
                name={'block_size'}
                type={'number'}
                value={this.state.block_size}
                error={this.state.block_size_error}
            />,
            crop: <CheckBoxesAsButtons
                required
                name={'crop'}
                value={this.state.crop}
                onChange={this.handleChange}
                options={crops}
                label={'Select your crop'}
                error={this.state.crop_error}
            />,
            rows: <PlainInput
                required
                name={'rows'}
                label={'No. rows'}
                type={'number'}
                onChange={this.handleChange}
                error={this.state.rows_error}
                value={this.state.rows}
            />,
            rowSpacing: <TextInputWithRightLabel
                required
                placeholder={'in meters'}
                onChange={this.handleChange}
                label={'Row Spacing'}
                content={'m'}
                name={'row_spacing'}
                type={'number'}
                value={this.state.row_spacing}
                error={this.state.row_spacing_error}
            />,
            treeSpacing: <TextInputWithRightLabel
                required
                placeholder={'in meters'}
                onChange={this.handleChange}
                label={'Tree Spacing'}
                content={'m'}
                type={'number'}
                name={'tree_spacing'}
                value={this.state.tree_spacing}
                error={this.state.tree_spacing_error}
            />,
            treesHa: <PlainInput
                disabled
                label={'Trees / Ha'}
                value={treesHa}/>,
            treesVines: <PlainInput
                disabled
                label={'Trees / Vines'}
                value={treesVines}/>,
            age: <PlainInput label={'Age'} value={age} disabled/>,
            noOfTrees: <PlainInput
                required
                label={'Actual No. of Trees'}
                value={this.state.no_of_trees}
                name={'no_of_trees'}
                type={'number'}
                onChange={this.handleChange}
                error={this.state.no_of_trees_error}
            />,
            dateOfPlanting: <DatePicker name={'date_of_planting'}
                                        label={'Date of Planting'}
                                        placeholder={'DD / MM / YYYY'}
                                        value={this.state.date_of_planting}
                                        onChange={this.handleChange}
                                        error={this.state.date_of_planting_error}
            />,
            farmStatus: <Dropdown onChange={this.handleChange}
                                  label={'Farm Status'}
                                  name={'farm_status'}
                                  options={farmStatuses}
                                  value={this.state.farm_status}
                                  error={this.state.farm_status_error}
            />,
            comments: <Textarea name={'comments'}
                                onChange={this.handleChange}
                                label={'Comments and Notes'}
                                value={this.state.comments}
            />
        };

        return (
            <Container>
                <div className={styles.header}>
                    <div>
                        <a href='#'>
                            <Icon name={'angle left'}/>
                        </a>
                        <span>Add Block</span>
                    </div>
                    <Button size={'big'} secondary onClick={this.handleSubmit}>Add</Button>
                </div>
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column computer={8} mobile={8} tablet={11}>
                                {FormInputs.blockName}
                            </Grid.Column>
                            <Grid.Column computer={8} mobile={8} tablet={5}>
                                {FormInputs.blockSize}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {FormInputs.crop}
                            </Grid.Column>
                        </Grid.Row>

                        <Header as='h3' textAlign='left' content={'Block\'s Structure'}/>

                        <Grid.Row only={'mobile'}>
                            <Grid.Column>
                                {FormInputs.rows}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row only={'mobile'}>
                            <Grid.Column>
                                {FormInputs.rowSpacing}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row only={'mobile'}>
                            <Grid.Column>
                                {FormInputs.treeSpacing}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only={'computer tablet'} columns={3}>
                            <Grid.Column>
                                {FormInputs.rows}
                            </Grid.Column>
                            <Grid.Column>
                                {FormInputs.rowSpacing}
                            </Grid.Column>
                            <Grid.Column>
                                {FormInputs.treeSpacing}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column>
                                {FormInputs.treesHa}
                            </Grid.Column>
                            <Grid.Column>
                                {FormInputs.treesVines}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={1}>
                            <Grid.Column>
                                {FormInputs.noOfTrees}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only={'mobile'} columns={2}>
                            <Grid.Column mobile={12}>
                                {FormInputs.dateOfPlanting}
                            </Grid.Column>
                            <Grid.Column mobile={4}>
                                {FormInputs.age}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only={'mobile'}>
                            <Grid.Column floated='left' computer={16} mobile={16}>
                                {FormInputs.farmStatus}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row only={'computer tablet'} columns={3}>
                            <Grid.Column>
                                {FormInputs.dateOfPlanting}
                            </Grid.Column>
                            <Grid.Column>
                                <PlainInput label={'Age'} value={age} disabled/>
                            </Grid.Column>
                            <Grid.Column>
                                {FormInputs.farmStatus}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row colums={1}>
                            <Grid.Column>
                                {FormInputs.comments}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>
        );
    }
}

export default AddBlockForm;
