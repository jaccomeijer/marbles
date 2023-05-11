import { TestScheduler } from 'rxjs/testing'
import { throttleTime, map } from 'rxjs'

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})

it('generates the stream correctly', () => {
  testScheduler.run((helpers) => {
    const { cold, time, expectObservable, expectSubscriptions } = helpers
    const e1 = cold(' -a--b--c---|')
    const e1subs = '  ^----------!'
    const t = time('   ---|       ') // t = 3
    const expected = '-a-----c---|'

    expectObservable(e1.pipe(throttleTime(t))).toBe(expected)
    expectSubscriptions(e1.subscriptions).toBe(e1subs)
  })
})

it('logs the test correctly', () => {
  testScheduler.run((helpers) => {
    const { hot, expectObservable } = helpers

    const marblesString = 'ab'
    const expectedString = 'ab'
    const marbles = {
      a: 1,
      b: 2,
    }

    const outputValues = {
      a: 2,
      b: 3,
    }

    const obsA = hot(marblesString, marbles).pipe(
      map(value => value + 1),
    )

    expectObservable(obsA).toBe(expectedString, outputValues)
  })
})
