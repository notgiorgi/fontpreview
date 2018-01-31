/* global utils, fontFamilies */

const FONT_SIZE = 16
const TEXT_PADDING_X = FONT_SIZE / 2
const TEXT_PADDING_Y = FONT_SIZE / 2
const CANVAS_MAX_W = 29400

const PIXEL_RATIO = utils.getPixelRatio()

$(document).ready(function () {
  utils.loadFonts(fontFamilies).then(run)
})

function run () {
  let width = 0
  let height = 0
  let widthCache = {
    PIXEL_RATIO,
    CANVAS_MAX_W
  }
  const $measurer = $('#measurer')

  utils.forEach(fontFamilies, (f, i, done) => {
    $measurer.css('font-family', f)
    $measurer.text(f)

    const measured = $measurer.innerWidth()

    if (measured + width + TEXT_PADDING_X >= (CANVAS_MAX_W / PIXEL_RATIO)) {
      width = 0
      height += FONT_SIZE + TEXT_PADDING_Y
    }

    widthCache[f] = {
      x: width,
      y: height,
      w: measured
    }

    width += measured + TEXT_PADDING_X
    done()
  })
    .then(() => {
      const canvas = utils.createCanvas(
        CANVAS_MAX_W / PIXEL_RATIO,
        FONT_SIZE + height + TEXT_PADDING_Y,
        PIXEL_RATIO
      )

      $(canvas).hide()
      const ctx = canvas.getContext('2d')
      $(document.body).append(canvas)

      utils.forEach(fontFamilies, (f, i, done) => {
        const { x, y } = widthCache[f]

        simulateFont(ctx, f, FONT_SIZE, x, y)

        done()
      })
        .then(() => {
          console.log(JSON.stringify(widthCache, null, 2))
          publish(capture(canvas))
        })
    })
}

function simulateFont (ctx, family, size, x, y) {
  ctx.font = `${size}px ${family}`
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillText(family, x, y + size)
}

function capture (canvas) {
  return canvas.toDataURL('image/png')
}

function publish (src) {
  $('#images').append($('<img>').attr('src', src))
}

function drawLine (x, y, ctx) {
  ctx.beginPath()
  ctx.strokeStyle = 'red'
  ctx.moveTo(x, y + FONT_SIZE)
  ctx.lineTo(x, y - 16)
  ctx.stroke()
}
