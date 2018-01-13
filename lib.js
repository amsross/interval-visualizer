const html = require('choo/html')
const css = require('sheetify')
const { DateTime, Duration } = require('luxon')
const { compose, invoke, map, nth, toPairs } = require('./helpers')
const intervals = require('./intervals')

const visualize = state => {
  const now = DateTime.local()
  const dur = Duration.fromObject({ seconds: state.repeats * state.interval })
  const end = now.plus(dur)

  const denominator = compose(
    nth(0),
    toPairs,
    invoke('toObject'))(end.diff(now, ['minutes', 'hours', 'days', 'weeks']))

  const prefix = css`
    :host {
      min-width: 600px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-content: space-between;
    }
    :host .units {
      color: black;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
    }
    :host .units .unit {
      border: 1px solid black;
      padding: 5px;
      background-color: #FFF;
    }
    :host .units .unit.on {
      border-color: #CCC;
      background-color: #CCC;
      color: #FFF !important;
    }
    :host .units .unit.week {
      margin: 20px auto;
    }
    :host .units .unit.week.on {
      background-color: #DF928E;
    }
    :host > .units.days {
      width: 100%;
    }
    :host > .units.days .day {
      flex-basis: 50%;
      flex-grow: 0;
    }
    :host > .units.days .hours {
    }
    :host > .units.days .hour {
      flex-basis: 15%;
      flex-grow: 1;
    }
    :host .units .unit.day.on {
      background-color: #C58882;
    }
    :host .units .unit.hour.on {
      background-color: #415A77;
    }
    :host .units .unit.minute.on {
      background-color: #208AAE;
    }
    :host .units.minutes .minute:nth-of-type(10) {
      align-self: flex-end;
    }
    :host .units .unit .unit {
      color: black;
    }
  `

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
