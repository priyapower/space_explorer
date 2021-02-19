// Fetch a list of all upcoming rocket launches
// Fetch a specific launch by its ID
// Log in the user
// Book a launch for a logged-in user
// Cancel a previously booked launch for a logged-in user

const { gql } = require('apollo-server');

const typeDefs = gql`
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches( # replace the current launches query with this one.
      """
      The number of results to show. Must be >= 1. Default = 20
      """

      pageSize: Int

      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """

  type LaunchConnection { # add this below the Query type as an additional type.
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

// ! = An exclamation point after a declared field's type means this field's value can never be nul
// [] = Square brackets on a declared fields type means it is an array. If you add !, the array cannot be null but it can be empty

module.exports = typeDefs;
