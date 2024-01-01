/* eslint-disable global-require */
import React from 'react';
import { Button, Card, CardActions, CardText, CardTitle, Cell, Grid } from 'react-mdl';
import Relay from 'react-relay';
import Page from '../Page/PageComponent';
import AddEvent from './AddEventComponent';
import DeleteEventMutation from './DeleteEventMutation';
import styles from './Event.scss';

export default class Event extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired
  };

  state = {
    filter: true
  }

  deleteEvent = (id, name) => {
    const deleteEventMutation = new DeleteEventMutation({ viewerId: this.props.viewer.id, id, name });
    Relay.Store.commitUpdate(deleteEventMutation);
  };

  filterByName = (bool) => {
    this.setState({ filter: bool });
  }

  render() {
    return (
      <div>
        <Page heading='Event List'>
          <Grid>
            <Cell col={12}>
              <Button colored onClick={this.filterByName.bind(this, true)}>List all Events</Button>
              <Button colored onClick={this.filterByName.bind(this, false)}>List over 30</Button>
            </Cell>
            {this.props.viewer.events.edges.map((edge) => {
              const imageUrl = require('../../assets/team.jpg');
              let toggleForm = (display) => { edge.node.displayForm = !display; this.forceUpdate(); };
              const currentDate = (new Date()).setHours(0, 0, 0, 0);
              const eventDate = (new Date(edge.node.date)).setHours(0, 0, 0, 0);
              if (this.state.filter || edgeDate >= eventDate) {
                return (
                  <Cell col={4} key={edgeNode.id}>
                    <Card className={styles.card}>
                      <CardTitle expand className={styles.image} style={{ backgroundImage: `url(${imageUrl})` }} />
                      <CardActions className={styles.name}>
                        <Button colored>{edgeNode.name}</Button>
                      </CardActions>
                      <CardText>
                        <b>Name:</b> {edgeNode.name} <br />
                        <b>Description:</b> {edgeNode.description} <br />
                        <b>Date:</b> {edgeNode.date} <br />
                        <b>Address:</b> {edgeNode.address}
                      </CardText>
                      <Grid>
                        <Cell col={6}>
                          <Button className={styles.button} onClick={this.deleteEvent.bind(this, edgeNode.id, edgeNode.name)}>Delete</Button>
                        </Cell>
                        <Cell col={6}>
                          <Button className={styles.button} onClick={toggleForm.bind(this, edgeNode.displayForm)}>Edit</Button>
                        </Cell>
                      </Grid>
                      <Cell col={12}>
                        {edgeNode.displayForm &&
                          <AddEvent viewer={this.props.viewer} node={edgeNode} />
                        }
                      </Cell>
                    </Card>
                  </Cell>
                );
              }
            })}
            <AddEvent viewer={this.props.viewer} />
          </Grid>
        </Page>
      </div>
    );
  }
}
