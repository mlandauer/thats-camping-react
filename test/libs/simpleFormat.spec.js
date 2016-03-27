import expect from 'expect'
import simpleFormat from '../../libs/simpleFormat'

describe('simpleFormat', () => {
  it('should pass through a simple bit of text and turn it into a paragraph', () => {
    expect(simpleFormat("A simple paragraph")).toEqual("<p>A simple paragraph</p>")
  })

  it('should split multiple paragraphs', () => {
    expect(simpleFormat("A paragraph.\n\nAnd another.\n\nAnd one more.")).toEqual("<p>A paragraph.</p><p>And another.</p><p>And one more.</p>")
  })

  it('should use breaks for single carriage return', () => {
    expect(simpleFormat("A paragraph.\nSplit in two.\n\nAnd another paragraph.")).toEqual("<p>A paragraph.<br />Split in two.</p><p>And another paragraph.</p>")
  })

  it('should trim the ends', () => {
    expect(simpleFormat("   A paragraph.   ")).toEqual("<p>A paragraph.</p>")
  })
})
