import Rx from 'rx'

import layout from './layout'
import router from './router'
import storage from './storage.json'

/* I was too lazy to add an ID to every item manually. So this "stubs" IDs for
 * the items in `storage`
 */
const items = storage.map((s, i) => {
  s.id = i
  return s
})

/* `state$` contains all (or most) state of the application. It's a Rx.Subject,
 * which is basically an observable observer. So it's comparable to a event-
 * emitter. It could easily be extended so it would synch the storage to a
 * server or Local-/SessionStorage.
 */
const state$ = new Rx.Subject()
const container = document.querySelector('#app')
if (!container) throw new Error('No app container found!')

const content$ =
  state$
    .withLatestFrom(router())
    /* Used for debugging */
    .map(([state, action]) => action(state, state$))
layout(container)(content$)
state$.onNext({ cart: [], items })

