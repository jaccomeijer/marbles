import {
  TestScheduler,
} from 'rxjs/testing'
import {
  map,
} from 'rxjs'

describe('Playing with marbles', () => {
  let testScheduler: TestScheduler

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected)
    })
  })

  it('should test a simple map', () => {
    testScheduler.run((helpers) => {
      const {
        hot, expectObservable,
      } = helpers

      const inputString = 'ab'
      const expectString = 'ab'

      const inputValues = {
        a: 1,
        b: 2,
      }

      const expectedValues = {
        a: 2,
        b: 3,
      }

      const obsA = hot(inputString, inputValues).pipe(
        map(value => value + 1),
      )

      expectObservable(obsA).toBe(expectString, expectedValues)
    })
  })
})
