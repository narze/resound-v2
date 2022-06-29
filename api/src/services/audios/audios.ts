import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const audios: QueryResolvers['audios'] = () => {
  return db.audio.findMany()
}

export const audio: QueryResolvers['audio'] = ({ id }) => {
  return db.audio.findUnique({
    where: { id },
  })
}

export const createAudio: MutationResolvers['createAudio'] = ({ input }) => {
  return db.audio.create({
    data: input,
  })
}

export const updateAudio: MutationResolvers['updateAudio'] = ({
  id,
  input,
}) => {
  return db.audio.update({
    data: input,
    where: { id },
  })
}

export const deleteAudio: MutationResolvers['deleteAudio'] = ({ id }) => {
  return db.audio.delete({
    where: { id },
  })
}
