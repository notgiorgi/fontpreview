$.getJSON('./font_sheet.json')
  .done(config => {
    config.FONTS.reverse().forEach(f => {
      render(createPreview(config, f))
    })
  })

function createPreview (config, fontName) {
  return $('<div/>')
    .addClass('preview')
    .css({
      'background-size': config.CANVAS_MAX_W / config.PIXEL_RATIO,
      'background-position': `-${fontX(config, fontName) - 4}px -${fontY(config, fontName)}px`,
      'width': `${config[fontName].x_end + 8}px`
    })
}

function render ($node) {
  $('#previews').append($node)
}

function font (config, name) {
  return config[name]
}

function fontX (config, name) {
  return font(config, name).x
}

function fontY (config, name) {
  return font(config, name).y
}
