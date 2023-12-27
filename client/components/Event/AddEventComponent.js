import React from 'react';
import { Button, Card, CardActions, CardText, Cell, Grid } from 'react-mdl';
import Relay from 'react-relay';
import AddEventMutation from './AddEventComponent';
import DeleteEventMutation from './DeleteEventMutation';
import styles from './Event.scss';
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
    let isValidated = true;
    this.setState({ form: { errors: '' } });
    if (values.name.length === 0
      || values.description.length === 0
      || values.date.length === 0
      || values.address.length === 0) {
      this.setState({ form: { errors: 'Complete all the fields' } });
      isValidated = false;
    } else if (this.isNew) {
      if (this.props.viewer.events.edges.find(w => w.node.name === values.name)) {
        this.setState({ form: { errors: 'Event already exist' } });
        isValidated = false;
      }
    }
    validated(isValidated);
  };

  addEvent = () => {
    const self = this;
    this.state.inputs.forEach((x) => { inputData.newEvent[x.name] = self.refs[x.name].value; });
    this.validation(inputData.newEvent, (isValidated) => {
      if (isValidated) {
        if (self.isNew) {
          if (inputData.newEvent.name && inputData.newEvent.description && inputData.newEvent.date && inputData.newEvent.address) {
            const addEventMutation = new AddEventMutation({ viewerId: self.props.viewer.id, ...inputData.newEvent });
            Relay.Store.commitUpdate(addEventMutation);
          }
        } else {
          inputData.newEvent.id = self.props.node.id;
          const updateEventMutation = new UpdateEventMutation({ viewerId: self.props.viewer.id, ...inputData.newEvent });
          Relay.Store.commitUpdate(updateEventMutation);
        }
       }
    });
  }

  deleteEvent = (id) => {
    const deleteEventMutation = new DeleteEventMutation({ viewerId: this.props.viewer.id, id });
    Relay.Store.commitUpdate(deleteEventMutation);
  }

  renderInput = input => (
    <label htmlFor={input.name} key={input.name}>
      {input.placeholder}
      <input
        className={styles.input}
        id={input.name}
        key={input.name}
        ref={input.name}
        name={input.name}
        type={input.type}
        defaultValue={input.defaultValue}
      />
    </label>
  );

  render() {
    const imageUrl = require('../../assets/team.jpg');
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
            <Button raised accent onClick={this.addEvent.bind(this)}>{this.button}</Button>
          </Cell>
        </Grid>
      </Card>
    );
  }
}
