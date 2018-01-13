const html = require('choo/html')
const { mathMod, max } = require('./helpers')

const weeks = (iterations, first, interval, depth) => {
  const count = max(Math.ceil(iterations - first), iterations)
  const isOn = i => mathMod(first + i, Math.floor(interval / 60 / 60 / 24 / 7) || 1) === 0

  return html`
    <div class="units weeks">
      ${Array(count).fill(null).map((x, i) => html`
        <div class="unit week ${isOn(i) ? 'on' : 'off'}">
          ${(depth < 1) ? i + 1 : days(7,
            mathMod(Math.floor((interval / 60 / 60 / 24) - (i * 60)) || 1, Math.floor(interval / 60 / 60 / 24) || 1),
            interval,
            depth - 1)}
        </div>
        `)}
    </div>
    `
}

const days = (iterations, first, interval, depth) => {
  const count = max(Math.ceil(iterations - first), iterations)
  const isOn = i => mathMod(first + i, Math.floor(interval / 60 / 60 / 24) || 1) === 0

  return html`
    <div class="units days">
      ${Array(count).fill(null).map((x, i) => html`
        <div class="unit day ${isOn(i) ? 'on' : 'off'}">
          ${(depth < 1) ? (i + 1).toString().padStart(2, 0) : hours(24,
            mathMod(Math.floor((interval / 60 / 60) - (i * 60)) || 1, Math.floor(interval / 60 / 60) || 1),
            interval,
            depth - 1)}
        </div>
        `)}
    </div>
    `
}

const hours = (iterations, first, interval, depth) => {
  const count = max(Math.ceil(iterations - first), iterations)
  const isOn = i => mathMod(first + i, Math.floor(interval / 60 / 60) || 1) === 0

  return html`
    <div class="units hours">
      ${Array(count).fill(null).map((x, i) => html`
        <div class="unit hour ${isOn(i) ? 'on' : 'off'}">
          ${(depth < 1) ? (i + 1).toString().padStart(2, 0) : minutes(60,
            mathMod(Math.floor((interval / 60) - (i * 60)) || 1, Math.floor(interval / 60) || 1),
            interval,
            depth - 1)}
        </div>
        `)}
    </div>
    `
}

const minutes = (iterations, first, interval, depth) => {
  const count = max(Math.ceil(iterations - first), iterations)
  const isOn = i => mathMod(first + i, Math.floor(interval / 60) || 1) === 0

  return html`
    <div class="units minutes db normal">
      ${Array(count).fill(null).map((x, i) => html`
        <div class="unit minute ${isOn(i) ? 'on' : 'off'}">
            ${(i + 1).toString().padStart(2, 0)}
        </div>
      `)}
    </div>
    `
}

module.exports = {
  weeks,
  days,
  hours,
  minutes
}
