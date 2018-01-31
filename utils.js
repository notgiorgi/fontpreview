function getPixelRatio () {
  const ctx = document.createElement('canvas').getContext('2d')
  const dpr = window.devicePixelRatio || 1
  const bsr =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1

  return dpr / bsr
}

function createCanvas (w, h, ratio = getPixelRatio()) {
  var can = document.createElement('canvas')
  can.width = w * ratio
  can.height = h * ratio
  can.style.width = w + 'px'
  can.style.height = h + 'px'
  can.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0)
  return can
}

const loadFonts = families =>
  new Promise(resolve => {
    WebFont.load({
      classes: false,
      active: resolve,
      google: {
        families
      }
    })
  })

function forEach0 (arr, i, cb, doneCb) {
  cb(arr[i], i, () =>
    requestAnimationFrame(() => {
      if (i >= arr.length - 1) return doneCb()
      forEach0(arr, i + 1, cb, doneCb)
    })
  )
}

function forEachCb (arr, cb, doneCb) {
  return forEach0(arr, 0, cb, doneCb)
}

function forEach (arr, cb) {
  return new Promise(resolve => {
    forEachCb(arr, cb, resolve)
  })
}

window.utils = {
  getPixelRatio,
  createCanvas,
  loadFonts,
  forEach
}
