const html = require('choo/html')
const raw = require('bel/raw')

const multipliers = {
  week: int => Math.floor(int / 60 / 60 / 24 / 7),
  day: int => Math.floor(int / 60 / 60 / 24),
  hour: int => Math.floor(int / 60 / 60),
  minute: int => Math.floor(int / 60)
}

const descendants = {
  week: 'day',
  day: 'hour',
  hour: 'minute'
}

const divisors = {
  week: 7,
  day: 24,
  hour: 60,
  minute: 60
}

const segment = type => (iterations, first, interval, depth) => {
  const divisor = divisors[type]
  const isOn = i => (((i + first) % multipliers[type](interval)) || 0) === 0

  return html`
    <div class="units ${type}s">
      ${Array(iterations).fill(null).map((x, i) => html`
        <div class="unit ${type} ${isOn(i) ? 'on' : 'off'}">
          ${(!descendants[type] || depth < 1) ? raw('&bullet;') : segment(descendants[type])(divisor,
            (i + first) * divisor,
            interval,
            depth - 1)}
        </div>
        `)}
    </div>
    `
}

module.exports = segment
