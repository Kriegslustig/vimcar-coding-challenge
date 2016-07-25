/* I obviously don't need a router, but I thought it would make the app more
 * "open for extension".
 */

import { Observable as O } from 'rx'
import { createHashHistory } from 'history'

import * as cartController from './lib/cartController'

import shop from './shop'
import cart from './cart'
import _404 from './404'

/* A simple helper function that creates a stream (that cleans its listeners up
 * after the stream ends) from `history`.
 */
const navigate = first => {
  let unlisten
  return (
    O.create(o => {
      unlisten = history.listen(location => {
        o.onNext(location)
      })
      if (first) o.onNext(history.getCurrentLocation())
    })
    .finally(() => {
      /* clean up. Since `unlisten` just goes out of scope here, I don't need
       * to override it with null or something.
       */
      unlisten()
    })
  )
}

/* This simple router doesn't support dynamic routes, but it could easily be
 * extended to include that feature.
 */
const routes = {
  /* I really like it when dependencies are as "transparent" as possible.
   * So I always try to only depend on modules on the same directory layer or
   * a deeper layer. Here `cart` and `shop` are both more or less independent,
   * so I chose not to put `cart` into the `shop` module. So for `cart` to be
   * available in `shop` without breaking the rule I just described, I need to
   * inject that dep. (also: I love currying)
   */
  '/': shop({ cart: cart({ navigate, cartController }), navigate, cartController }),
  '404': _404({ cart: cart({ navigate, cartController }) })
}

/* I can't use the push API here, since I don't control the server. The app may
 * just as well have been opened as a static HTML file. So if I use the push API
 * and a user reloads, he'd get a 404 when navigating anywhere.
 */
const history = createHashHistory()

export default () =>
  navigate(true).map(location => routes[location.pathname] || routes[404])

