export const schema = gql`
  type Audio {
    id: Int!
    title: String!
    url: String!
  }

  type Query {
    audios: [Audio!]! @requireAuth
    audio(id: Int!): Audio @requireAuth
  }

  input CreateAudioInput {
    title: String!
    url: String!
  }

  input UpdateAudioInput {
    title: String
    url: String
  }

  type Mutation {
    createAudio(input: CreateAudioInput!): Audio! @requireAuth
    updateAudio(id: Int!, input: UpdateAudioInput!): Audio! @requireAuth
    deleteAudio(id: Int!): Audio! @requireAuth
  }
`
