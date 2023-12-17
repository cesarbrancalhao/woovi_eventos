import Relay from 'react-relay';

class UpdateEventMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { updateEvent }
    `;
  }

  getVariables() {
    return {
      name: this.props.name,
      description: this.props.description,
      date: this.props.date,
      address: this.props.address,
      oldName: this.props.oldName
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateEventPayload {
        event {
          name,
          description,
          date,
          address,
        },
        viewer {
          events,
        },
          
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        event: this.props.id,
        viewer: this.props.viewerId,
      }
    }];
  }
}

export default UpdateEventMutation;