import Rx from 'rx'

import './styles.css'
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

const navigation = [
  /* The active property is static, to save some work */
  { name: 'Shop', url: '#/', active: true },
  { name: 'Journal', url: '#/journal' },
  { name: 'About', url: '#/about' },
  { name: 'More', url: '#/more' }
]

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
layout(container, navigation)(content$)

state$.onNext({ cart: [], items })

