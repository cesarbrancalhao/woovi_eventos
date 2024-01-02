import Relay from 'react-relay';
import Event from './EventComponent';

export default Relay.createContainer(Event, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on List {
        id,
        events(first: 50) {
          edges {
            node {
              id
              name
              description
              date
              address
            }
          }
        }
      }`
  }
});