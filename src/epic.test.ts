import { TestScheduler } from 'rxjs/testing'
import { type Observable, map } from 'rxjs'

enum Action {
  Start = 'Start',
  Stop = 'Stop',
  IncreaseSpeed = 'IncreaseSpeed',
  DecreaseSpeed = 'DecreaseSpeed',
  ShiftUp = 'ShiftUp',
  ShiftDown = 'ShiftDown',
}

const epic = () => {
  return (sourceObs: Observable<Action>) => sourceObs.pipe(
    map(value => {
      if (value === Action.Start) return Action.Stop
      return Action.ShiftUp
    }),
  )
}

describe('Playing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  it('should test an epic', () => {
    testScheduler.run((helpers) => {
      const { hot, expectObservable } = helpers

      const inputString = 'ab'
      const expectString = 'ab'

      const inputValues = {
        a: Action.Start,
        b: Action.Stop,
      }

      const expectedValues = {
        a: Action.Stop,
        b: Action.ShiftUp,
      }

      const obsA = hot(inputString, inputValues).pipe(epic())

      expectObservable(obsA).toBe(expectString, expectedValues)
    })
  })
})
