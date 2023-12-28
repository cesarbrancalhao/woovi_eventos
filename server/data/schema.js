/* eslint-disable no-unused-vars, no-use-before-define */
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection
} from 'graphql-relay';

import {
  addEvent,
  updateEvent,
  deleteEvent,
  Event,
  List,
  getEvent,
  getEvents,
  getList
} from './database';

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    const { type, id } = fromGlobalId(globalId);
    if (type === 'List') {
      return getList(id);
    } else if (type === 'Event') {
      return getEvent(id);
    }
    return null;
  },
  (obj) => {
    if (obj instanceof List) {
      return listType;
    } else if (obj instanceof Event) {
      return eventType;
    }
    return null;
  }
);

const listType = new GraphQLObjectType({
  name: 'List',
  description: 'A kind of list',
  fields: () => ({
    id: globalIdField('list'),
    events: {
      type: eventConnection,
      description: 'Events that belongs to this list',
      args: connectionArgs,
      resolve: (_, args) => connectionFromArray(getEvents(), args)
    },
    name: {
      type: GraphQLString,
      description: 'List\'s name'
    }
  }),
  interfaces: [nodeInterface]
});

const eventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Events added by default',
  fields: () => ({
    id: globalIdField('Event'),
    name: {
      type: GraphQLString,
      description: 'Name of event'
    },
    description: {
      type: GraphQLString,
      description: 'Description of the event'
    },
    date: {
      type: GraphQLString,
      description: 'Date of the event'
    },
    address: {
      type: GraphQLString,
      description: 'Address of the event'
    }
  }),
  interfaces: [nodeInterface]
});

const { connectionType: eventConnection, edgeType: eventEdge } = connectionDefinitions({ name: 'Event', nodeType: eventType });

const addEventMutation = mutationWithClientMutationId({
  name: 'AddEvent',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    eventEdge: {
      type: eventEdge,
      resolve: (obj) => {
        const cursorId = cursorForObjectInConnection(getEvents(), obj);
        return { node: obj, cursor: cursorId };
      }
    },
    viewer: {
      type: listType,
      resolve: () => getList(1)
    }
  },

  mutateAndGetPayload: ({ name, description, date, address }) => addEvent(name, description, date, address)
});

const updateEventMutation = mutationWithClientMutationId({
  name: 'UpdateEvent',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    address: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    event: {
      type: eventType,
      resolve: ({ name }) => getEvent(name),
    },
    viewer: {
      type: listType,
      resolve: () => getList(1)
    }
  },

  mutateAndGetPayload: ({ name, description, date, address }) => updateEvent(name, description, date, address)
});

const deleteEventMutation = mutationWithClientMutationId({
  name: 'DeleteEvent',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  },

  outputFields: {
    DeletedEvent: {
      type: GraphQLID,
      resolve: ({ id }) => id,
    },
    viewer: {
      type: listType,
      resolve: () => getList(1)
    }
  },

  mutateAndGetPayload: ({ id, name }) => deleteEvent(id, name)
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: listType,
      resolve: () => getList(1)
    }
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addEvent: addEventMutation,
    deleteEvent: deleteEventMutation,
    updateEvent: updateEventMutation,
  })
});
export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
