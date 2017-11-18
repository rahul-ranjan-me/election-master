import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
		if(nextProps.metadata !== this.state.metadata){
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
				return <Select key={key} field = {fieldType} onChange={this.handleChange}  />
			}else if(fieldType.type === 'subForm'){
				return <Subform key={key} field = {fieldType} onChange={this.handleChange}  />
			}
		};

		return (
			<form className={this.props.cssClassName} onSubmit={this.sendData}>
				{this.state.metadata.map(createForm)}
				<div className="control-group button-primary">
					<div className="controls">
						<RaisedButton label="Submit" primary={true} onClick={this.sendData} fullWidth={true} />
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
					<TextField
						id={this.props.field.id} 
						floatingLabelText={this.props.field.label}
						value = {this.state[this.props.field.id]}
						label={this.props.field.label}
						onChange={this.handleChange}
						defaultValue={this.props.field.value ? this.props.field.value:undefined} 
						ref="textInput"
						fullWidth={true}
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
					<TextField
						id={this.props.field.id} 
						floatingLabelText={this.props.field.label}
						value = {this.state[this.props.field.id]}
						label={this.props.field.label}
						onChange={this.handleChange}
						defaultValue={this.props.field.value ? this.props.field.value:undefined} 
						ref="password"
						type="password" 
						fullWidth={true}
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
					<TextField
						id={this.props.field.id} 
						floatingLabelText={this.props.field.label}
						value = {this.state[this.props.field.id]}
						label={this.props.field.label}
						rowsMax={4}
						multiLine={true}
						onChange={this.handleChange}
						defaultValue={this.props.field.value ? this.props.field.value:undefined} 
						ref="textareainput"
						fullWidth={true}
						/>
				</div>
			</div>
		)
	}
}

export class Select extends Component {
	constructor(props){
		super(props);
		this.state = {
			value: 1
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, index, value){
		this.props.onChange(value, this.props.field);
		this.setState({value})
	}

	render(){
		let createOption = (option, key) => {
			return <MenuItem key={key} value={option.value} primaryText={option.label} />
		};

		return(
			<div className="control-group">
				<div className="controls">
					<SelectField
						floatingLabelText={this.props.field.label}
						value={this.state.value}
						onChange={this.handleChange}
						fullWidth={true}
						>
						{this.props.field.options.map(createOption)}
					</SelectField>
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