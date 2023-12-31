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

  filterByDate = (bool) => {
    this.setState({ filter: bool });
  }

  render() {
    return (
      <div>
        <Page heading='Event List'>
          <Grid>
            <Cell col={12}>
              <Button colored onClick={this.filterByDate.bind(this, true)}>List all events</Button>
              <Button colored onClick={this.filterByDate.bind(this, false)}>List upcoming events</Button>
            </Cell>
            {this.props.viewer.events.edges.map((edge) => {
              const imageUrl = require('../../assets/team.jpg');
              let toggleForm = (display) => { edge.node.displayForm = !display; this.forceUpdate(); };
              const currentDate = (new Date()).setHours(0, 0, 0, 0);
              const edgeDate = (new Date(edge.node.date)).setHours(0, 0, 0, 0);
              if (this.state.filter || edgeDate >= currentDate) {
                return (
                  <Cell col={4} key={edge.node.id}>
                    <Card className={styles.card}>
                      <CardTitle expand className={styles.image} style={{ backgroundImage: `url(${imageUrl})` }} />
                      <CardActions className={styles.name}>
                        <Button colored>{edge.node.name}</Button>
                      </CardActions>
                      <CardText>
                        <b>Description:</b> {edge.node.description} <br />
                        <b>Date:</b> {edge.node.date} <br />
                        <b>Address:</b> {edge.node.address}
                      </CardText>
                      <Grid>
                        <Cell col={6}>
                          <Button className={styles.button} onClick={this.deleteEvent.bind(this, edge.node.id, edge.node.name)}>Delete</Button>
                        </Cell>
                        <Cell col={6}>
                          <Button className={styles.button} onClick={toggleForm.bind(this, edge.node.displayForm)}>Edit</Button>
                        </Cell>
                      </Grid>
                      <Cell col={12}>
                        {edge.node.displayForm &&
                          <AddEvent viewer={this.props.viewer} node={edge.node} />
                        }
                      </Cell>
                    </Card>
                  </Cell>
                );
              }
              return null;
            })}
            <AddEvent viewer={this.props.viewer} />
          </Grid>
        </Page>
      </div>
    );
  }
}
