const tape = require('../../test/tape')
const { qs } = require('qs')

tape('{{checkbox-1}} has correct default state', t => {
  const container = qs('#checkbox-1')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(2)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(input.checked === false, 'the default checkbox is not checked')

  t.end()
})

tape('{{checkbox-2}} has correct label', t => {
  const container = qs('#checkbox-2')
  const component = qs('tonic-checkbox', container)
  const label = qs('label:last-of-type', component)

  t.plan(2)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.equal(component.getAttribute('label'), label.textContent, 'the label attribute matches the label text')

  t.end()
})

tape('{{checkbox-3}} is checked', t => {
  const container = qs('#checkbox-3')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(2)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(input.checked, 'the input is checked')

  t.end()
})

tape('{{checkbox-4}} is disabled', t => {
  const container = qs('#checkbox-4')
  const component = qs('tonic-checkbox', container)
  const input = qs('input[type="checkbox"]', component)

  t.plan(2)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(input.hasAttribute('disabled'), 'the input is disabled')

  t.end()
})

tape('{{checkbox-5}} has size attributes', t => {
  const container = qs('#checkbox-5')
  const component = qs('tonic-checkbox', container)
  const icon = qs('label.tonic--icon', component)
  const size = component.getAttribute('size')

  console.log(size)
  console.log(icon.style.width)

  t.plan(4)

  t.ok(component.firstElementChild, 'the component was constructed')
  t.ok(component.hasAttribute('size'), 'the component has a size attribute')
  t.ok(icon.style.width === size, 'the width equals the size attribute')
  t.ok(icon.style.height === size, 'the height equals the size attribute')

  t.end()
})
