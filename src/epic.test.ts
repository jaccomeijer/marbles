import {
  TestScheduler,
} from 'rxjs/testing'
import {
  type Observable, map,
} from 'rxjs'

enum Action {
  Start = 'Start',
  Stop = 'Stop',
  IncreaseSpeed = 'IncreaseSpeed',
  DecreaseSpeed = 'DecreaseSpeed',
  ShiftUp = 'ShiftUp',
  ShiftDown = 'ShiftDown',
}

const epic = () => {
  return (action$: Observable<Action>) => action$.pipe(
    map(action => {
      if (action === Action.ShiftUp) return Action.ShiftDown
      return action
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
      const {
        hot, expectObservable,
      } = helpers

      const inputString = 'abcd'
      const expectString = 'abcd'

      const inputValues = {
        a: Action.Start,
        b: Action.ShiftUp,
        c: Action.ShiftDown,
        d: Action.Stop,
      }

      const expectedValues = {
        a: Action.Start,
        b: Action.ShiftDown,
        c: Action.ShiftDown,
        d: Action.Stop,
      }

      const obsA = hot(inputString, inputValues).pipe(epic())

      expectObservable(obsA).toBe(expectString, expectedValues)
    })
  })
})
