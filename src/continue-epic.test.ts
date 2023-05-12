import {
  TestScheduler,
} from 'rxjs/testing'
import {
  type Observable, delay, of, concatMap,
} from 'rxjs'

enum Action {
  Continue = 'Continue',
  Await = 'Await',
}

const epic = () => {
  return (action$: Observable<Action>) => action$.pipe(
    concatMap(action => {
      return of(action).pipe(delay(1000))
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

  it('should test the continue epic', () => {
    testScheduler.run((helpers) => {
      const {
        hot, expectObservable,
      } = helpers

      const inputString = 'a'
      const expectString = '1000ms a'

      const inputValues = {
        a: Action.Continue,
        b: Action.Continue,
        c: Action.Await,
        d: Action.Continue,
        e: Action.Continue,
        f: Action.Continue,
        g: Action.Continue,
        h: Action.Continue,
      }

      const expectedValues = {
        a: Action.Continue,
        b: Action.Continue,
        c: Action.Await,
        d: Action.Continue,
        e: Action.Continue,
        f: Action.Continue,
        g: Action.Continue,
        h: Action.Continue,
      }

      const obsA = hot(inputString, inputValues).pipe(epic())

      expectObservable(obsA).toBe(expectString, expectedValues)
    })
  })
})
