import layoutView from './view.pug'

export default container => content$ => {
  content$.subscribe(
    /* Whenever something is sent through `content$` I throw it into the DOM.
     * This could easily be replaced with some virtual-dom implementation. But
     * since this is such a small app, I don't think it's really necessary.
     */
    content => { container.innerHTML = layoutView({ content }) },
    err => {
      console.error('An unexpected error occured!')
      console.error(err)
    },
    /* This is called when `content$` completes, which should never happen. */
    () => console.log('This should never happen')
  )
}

