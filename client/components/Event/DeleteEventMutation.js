import Relay from 'react-relay';

class DeleteEventMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`
      mutation { deleteEvent }
    `;
  }

  getVariables() {
    return {
      id: this.props.id,
      name: this.props.name
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on DeleteEventPayload {
        viewer { events },
        DeletedEvent,
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewerId,
      connectionName: 'events',
      pathToConnection: ['viewer', 'events'],
      deletedIDFieldName: 'DeletedEvent'
    }];
  }
}

export default DeleteEventMutation;
