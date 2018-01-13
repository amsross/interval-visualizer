const html = require('choo/html')
const css = require('sheetify')
const { DateTime, Duration } = require('luxon')
const { compose, invoke, map, nth, toPairs } = require('./helpers')
const intervals = require('./intervals')

const prefix = css`
  :host { }
  :host .units {
    color: #CCC;
    display: flex;
    flex-wrap: wrap;
  }
  :host .unit {
    border: 1px solid #ccc;
    padding: 0px 5px;
    border-right: 0;
    border-bottom: 0;
    margin-top: 5px;
    margin-right: 5px;
    margin-bottom: 1px;
  }
  :host .unit.on {
    border-color: #DF928E;
    color: #DF928E;
  }

  :host .week { }
  :host .day { }
  :host .hour { }
  :host .minute { }

  :host > .weeks { }
  :host > .weeks .week { }
  :host > .weeks .day { }
  :host > .weeks .hour { }
  :host > .weeks .minute { }

  :host > .days { }
  :host > .days .day { }
  :host > .days .hour { }
  :host > .days .minute { }

  :host > .hours { }
  :host > .hours .hour { }
  :host > .hours .minute { }

  :host > .minutes { }
  :host > .minutes .minute { }
`

const visualize = state => {
  const now = DateTime.local()
  const dur = Duration.fromObject({ seconds: state.repeats * state.interval })
  const end = now.plus(dur)

  const denominator = compose(
    nth(0),
    toPairs,
    invoke('toObject'))(end.diff(now, ['minutes', 'hours', 'days', 'weeks']))

  return html`
    <div>
      <h2>${compose(
        invoke('join'),
        map(([type, count]) => ` ${Math.ceil(count)} ${type}`),
        toPairs)(now.plus(Duration.fromObject({ seconds: state.interval })).diff(now, ['seconds', 'minutes', 'hours', 'days', 'weeks']).toObject())}</h2>
      <section class="${prefix}">
        ${intervals[denominator[0]](Math.ceil(denominator[1]), 0, state.interval, state.depth)}
      </section>
    </div>
    `
}

module.exports.visualize = visualize
