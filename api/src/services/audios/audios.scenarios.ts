import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.AudioCreateArgs>({
  audio: {
    one: { data: { title: 'String', url: 'String' } },
    two: { data: { title: 'String', url: 'String' } },
  },
})

export type StandardScenario = typeof standard
