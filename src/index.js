import Rx from 'rx'

import layout from './layout'
import router from './router'

const state$ = new Rx.Subject().startWith({ cart: [], items: [] })
const container = document.querySelector('#app')
if (!container) throw new Error('No app container found!')

const content$ =
  router()
    .withLatestFrom(state$)
    .map(([action, state]) => action(state, state$))
layout(container)(content$)

