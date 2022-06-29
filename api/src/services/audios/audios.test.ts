import { audios, audio, createAudio, updateAudio, deleteAudio } from './audios'
import type { StandardScenario } from './audios.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('audios', () => {
  scenario('returns all audios', async (scenario: StandardScenario) => {
    const result = await audios()

    expect(result.length).toEqual(Object.keys(scenario.audio).length)
  })

  scenario('returns a single audio', async (scenario: StandardScenario) => {
    const result = await audio({ id: scenario.audio.one.id })

    expect(result).toEqual(scenario.audio.one)
  })

  scenario('creates a audio', async () => {
    const result = await createAudio({
      input: { title: 'String', url: 'String' },
    })

    expect(result.title).toEqual('String')
    expect(result.url).toEqual('String')
  })

  scenario('updates a audio', async (scenario: StandardScenario) => {
    const original = await audio({ id: scenario.audio.one.id })
    const result = await updateAudio({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a audio', async (scenario: StandardScenario) => {
    const original = await deleteAudio({ id: scenario.audio.one.id })
    const result = await audio({ id: original.id })

    expect(result).toEqual(null)
  })
})
