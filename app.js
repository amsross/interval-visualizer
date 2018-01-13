const choo = require('choo')
const html = require('choo/html')
const css = require('sheetify')
const { visualize } = require('./lib')

css('tachyons')

const app = choo()

app.use((state, emitter) => {
  state.interval = 61200
  state.depth = 1
  state.repeats = 5

  emitter.on('change:interval', interval => {
    state.interval = +interval || 1
    emitter.emit('render')
  })
  emitter.on('change:depth', depth => {
    state.depth = +depth || 1
    emitter.emit('render')
  })
  emitter.on('change:repeats', repeats => {
    state.repeats = +repeats || 1
    emitter.emit('render')
  })
})

app.route('/', function view (state, emit) {
  return html`
    <body class="w-100 h-100">
      <main class="w-100 cf helvetica dark-gray bg-white pa3 mw9 center">
        <form>
          <label for="interval" class="f6 b db mb2 lh-copy">Interval <span class="normal black-60">in seconds</span></label>
          <input id="interval" name="interval" class="pa2 input-reset ba bg-transparent measure" type="text" value=${state.interval} onchange=${changeInterval} />
          <label for="depth" class="f6 b db mb2 lh-copy">Depth <span class="normal black-60">max</span></label>
          <input id="depth" name="depth" class="pa2 input-reset ba bg-transparent measure" type="text" value=${state.depth} onchange=${changeDepth} />
          <label for="depth" class="f6 b db mb2 lh-copy">Repeats <span class="normal black-60">max</span></label>
          <input id="depth" name="depth" class="pa2 input-reset ba bg-transparent measure" type="text" value=${state.repeats} onchange=${changeRepeats} />
        </form>
        ${visualize(state)}
      </main>
    </body>
  `

  function changeInterval (evt) {
    emit('change:interval', evt.target.value)
  }
  function changeDepth (evt) {
    emit('change:depth', evt.target.value)
  }
  function changeRepeats (evt) {
    emit('change:repeats', evt.target.value)
  }
})

if (module.parent) module.exports = app
else app.mount('body')
