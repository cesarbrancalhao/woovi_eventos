import Relay from 'react-relay';

class AddEventMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { addEvent }
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
      description: this.props.description,
      date: this.props.date,
      address: this.props.address
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddEventPayload {
        eventEdge,
        viewer { events }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'events',
      edgeName: 'eventEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
}

export default AddEventMutation;