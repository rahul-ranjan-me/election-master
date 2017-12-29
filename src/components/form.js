import React, {Component} from 'react'
import _ from 'lodash'
import { Button, Input, Select, DatePicker } from 'antd/dist/antd.min'

const 	{ TextArea } = Input
	,	Option = Select.Option
	,	{ MonthPicker, RangePicker, WeekPicker } = DatePicker;

export default class Form extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.sendData = this.sendData.bind(this);
		this.state = {
			metadata : this.props.metadata
		};
		this.valueToSend = this.props.dataFormat;
	}

	componentWillReceiveProps(nextProps){
		var isEqual = _.isEqual(nextProps.metadata, this.state.metadata)
		nextProps.metadata.forEach((node) => {
			this.valueToSend[node.id] = node.value
		})
		if(!isEqual){
			
			this.setState({
				metadata : nextProps.metadata
			})
			
		}
	}

	sendData(event){
		event.preventDefault();
		this.props.onSubmitData(this.valueToSend);
	}

	handleChange(value, field){
		this.valueToSend[field.id] = value;
	}

	render(){
		let createForm = (fieldType, key) => {
			if(fieldType.type === 'text'){
				return <TypeText key={key} field = {fieldType} onChange={this.handleChange} />
			}else if(fieldType.type === 'password'){
				return <TypePassword key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'textarea'){
				return <TypeTextarea key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'select'){
				return <SelectField key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'date'){
				return <DateSelector key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'subForm'){
				return <Subform key={key} field = {fieldType} onChange={this.handleChange}  />
			}
		};

		return (
			<form className={this.props.cssClassName} onSubmit={this.sendData}>
				<div className="form-field-container">
					{this.state.metadata.map(createForm)}
				</div>
				<div className="control-group button-primary">
					<div className="controls">
						<Button type="primary" shape="shape" size="large" onClick={this.sendData}>Submit</Button>
					</div>
				</div>
			</form>
		)
		
	}
}

export class TypeText extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	handleChange(event){
		this.setState({[this.props.field.id]: event.target.value})
		this.props.onChange(event.target.value, this.props.field);
	}

	render(){
		return(
			<div className="control-group">
				<div className="controls">
					<label htmlFor={this.props.field.id}>{this.props.field.label}</label>
					<Input
						id={this.props.field.id} 
						value = {this.state[this.props.field.id]}
						onChange={this.handleChange}
						placeholder={this.props.field.value ? this.props.field.value:undefined} 
						ref="textInput"
						size="large"
						/>
				</div>
			</div>
		)
	}
}

export class TypePassword extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	handleChange(event){
		this.setState({[this.props.field.id]: event.target.value})
		this.props.onChange(event.target.value, this.props.field);
	}

	render(){
		return(
			<div className="control-group">
				<div className="controls">
					<label htmlFor={this.props.field.id}>{this.props.field.label}</label>
					<Input
						id={this.props.field.id} 
						value = {this.state[this.props.field.id]}
						onChange={this.handleChange}
						placeholder={this.props.field.value ? this.props.field.value:undefined} 
						ref="password"
						type="password" 
						size="large"
						/>
				</div>
			</div>
		)
	}
}

export class TypeTextarea extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	handleChange(event){
		this.setState({[this.props.field.id]: event.target.value})
		this.props.onChange(event.target.value, this.props.field);
	}

	render(){
		return(
			<div className="control-group">
				<div className="controls">
					<label htmlFor={this.props.field.id}>{this.props.field.label}</label>
					<TextArea
						id={this.props.field.id} 
						value = {this.state[this.props.field.id]}
						rows={4}
						onChange={this.handleChange}
						placeholder={this.props.field.value ? this.props.field.value:undefined} 
						ref="textareainput"
						size="large"
						/>
				</div>
			</div>
		)
	}
}

export class SelectField extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: 1
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value){
		this.props.onChange(value, this.props.field);
		this.setState({value})
	}

	render(){
		let createOption = (option, key) => {
			return <Option key={key} value={option.value}>{option.label}</Option>
		};

		return(
			<div className="control-group">
				<div className="controls">
					<label htmlFor={this.props.field.id}>{this.props.field.label}</label>
					<Select
						id={this.props.field.id}
						floatingLabelText={this.props.field.label}
						defaultValue={this.props.field.value}
						onChange={this.handleChange}
						>
						{this.props.field.options.map(createOption)}
					</Select>
				</div>
			</div>
		)
	}
}

export class DateSelector extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {}
	}

	handleChange(date, dateString){
		this.setState({[this.props.field.id]: dateString})
		this.props.onChange(dateString, this.props.field);
	}

	render(){
		return(
			<div className="control-group">
				<div className="controls">
					<label htmlFor={this.props.field.id}>{this.props.field.label}</label>
					<DatePicker
						id={this.props.field.id} 
						onChange={this.handleChange}
						format="DD/MM/YYYY"
						ref="textInput"
						size="large"
						/>
				</div>
			</div>
		)
	}
}

export class Subform extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.subFormArray = {};
	}

	handleChange(value, field){
		this.subFormArray[field.id] = value;
		this.props.onChange(this.subFormArray, this.props.field);
	}

	render(){

		let createForm = (fieldType, key) => {
			if(fieldType.type === 'text'){
				return <TypeText key={key} field = {fieldType} onChange={this.handleChange} />
			}else if(fieldType.type === 'textarea'){
				return <TypeTextarea key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'select'){
				return <Select key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'subForm'){
				return <Subform key={key} field = {fieldType} onChange={this.handleChange}  />
			}
		};

		return(
			<div>
				<h5>{this.props.field.label}</h5>
				<div className="nestedForm">
					{this.props.field.formField.map(createForm)}				
				</div>
			</div>
		)
	}
}