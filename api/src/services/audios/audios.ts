import * as Filestack from 'filestack-js'
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

export const deleteAudio: MutationResolvers['deleteAudio'] = async ({ id }) => {
  const client = Filestack.init(process.env.REDWOOD_ENV_FILESTACK_API_KEY)

  const audio = await db.audio.findUnique({ where: { id } })

  // The `security.handle` is the unique part of the Filestack file's url.
  const handle = audio.url.split('/').pop()

  const security = Filestack.getSecurity(
    {
      // We set `expiry` at `now() + 5 minutes`.
      expiry: new Date().getTime() + 5 * 60 * 1000,
      handle,
      call: ['remove'],
    },
    process.env.REDWOOD_ENV_FILESTACK_SECRET
  )

  await client.remove(handle, security)

  return db.audio.delete({ where: { id } })
}
