import React from 'react';
import ReactDOM from 'react-dom';
import Dropdown from 'react-dropdown';
import { Button, Card, CardActions, CardText, Cell, Grid } from 'react-mdl';
import Relay from 'react-relay';
import styles from './Event.scss';
import Page from '../Page/PageComponent';
import AddEventMutation from './AddEventMutation';
import DeleteEventMutation from './DeleteEventMutation';
import UpdateEventMutation from './UpdateEventMutation';

const inputData = {
  newEvent: { name: '', description: '', date: '', address: '' }
};

export default class Event extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  state = {
    form: {
      errors: ''
    },
    inputs: [
      { name: 'name', type: 'text', placeholder: 'Name', defaultValue: this.name },
      { name: 'description', type: 'text', placeholder: 'Description', defaultValue: this.description },
      { name: 'date', type: 'date', placeholder: 'Date', defaultValue: this.date },
      { name: 'address', type: 'text', placeholder: 'Address', defaultValue: this.address },
    ]
  }

  title = 'Add Event';
  isNew = !this.props.node;
  button = !this.isNew ? 'EDIT' : 'ADD';
  cardClass = !this.isNew ? styles.none : styles.card;

  id = !this.isNew ? this.props.node.id : '';
  name = !this.isNew ? this.props.node.name : '';
  description = !this.isNew ? this.props.node.description : '';
  date = !this.isNew ? this.props.node.date : '';
  address = !this.isNew ? this.props.node.address : '';

  validation = (values, validated) => {
    var isValidated = true;

    this.setState({ form: { errors: '' } });
    
    const hasEmptyFields = ['name', 'description', 'date', 'address'].some(field => values[field].length === 0);
    if (hasEmptyFields) {
      this.setState({ form: { errors: 'Complete all the fields' } });
      isValidated = false;
    }
   
    // Validates only the date.
    const inputDate = (new Date(values.date)).setHours(0, 0, 0, 0);
    const currentDate = (new Date()).setHours(0, 0, 0, 0);
    if (inputDate < currentDate) {
      this.setState({ form: { errors: 'Insert a valid date' } });
      isValidated = false;
    }

    if (this.isNew && this.props.viewer.events.edges.some(event => event.node.name === values.name)) {
      this.setState({ form: { errors: 'Event already exist' } });
      isValidated = false;
    }
   
    validated(isValidated);
   };

  addEvent = () => {
    let self = this;
    this.state.inputs.map((x, i) => { inputData.newEvent[x.name] = self.refs[x.name].value });
    this.validation(inputData.newEvent, (isValidated) => {
      if (isValidated) {
        if (self.isNew) {
          const addEventMutation = new AddEventMutation({ viewerId: self.props.viewer.id, ...inputData.newEvent });
          Relay.Store.commitUpdate(addEventMutation);
        } else {
          inputData.newEvent.id = self.props.node.id;
          inputData.newEvent.oldName = self.name;
          const updateEventMutation = new UpdateEventMutation({ viewerId: self.props.viewer.id, ...inputData.newEvent });
          Relay.Store.commitUpdate(updateEventMutation);
        }
       }
    });
  }

  deleteEvent = (id, name) => {
    const deleteEventMutation = new DeleteEventMutation({ viewerId: this.props.viewer.id, id, name });
    Relay.Store.commitUpdate(deleteEventMutation);
  }

  renderInput = input => {
    return (
        <label key={input.name}>
        {input.placeholder}
          <input className={styles.input}
            id={input.name}
            key={input.name}
            ref={input.name}
            name={input.name}
            type={input.type}
            defaultValue={input.defaultValue} />
        </label> 
      );
  };

  render() {
    return (
      <Card className={this.cardClass}>
        <CardActions className={styles.name}>
          {this.isNew &&
            <Button>{this.title}</Button>
          }
        </CardActions>
        <CardText>
          <ul>
            {this.state.form.errors}
          </ul>
          {this.state.inputs.map(this.renderInput)}
        </CardText>
        <Grid>
          <Cell col={12}>
            <Button raised accent onClick={this.addEvent.bind(this,)}>{this.button}</Button>
          </Cell>
        </Grid>
      </Card>
    );
  }
}