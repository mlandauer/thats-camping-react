import expect from 'expect'
import CampsiteDetail from '../../components/CampsiteDetail'

describe('<CampsiteDetail />', () => {
  it('accessText', () => {
    var c = new CampsiteDetail
    expect(c.accessText({caravans: true, trailers: true, car: true}))
      .toEqual("For caravans, trailers and car camping")
  })

  it('accessText', () => {
    var c = new CampsiteDetail
    expect(c.accessText({caravans: false, trailers: true, car: true}))
      .toEqual("For trailers and car camping but not for caravans")
  })

  it('accessText', () => {
    var c = new CampsiteDetail
    expect(c.accessText({caravans: false, trailers: true, car: false}))
      .toEqual("For trailers but not for caravans and car camping")
  })

  it('accessText', () => {
    var c = new CampsiteDetail
    expect(c.accessText({caravans: false, trailers: false, car: false}))
      .toEqual("Not for caravans, trailers and car camping")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({toilets: "flush", picnicTables: true, drinkingWater: true}))
      .toEqual("Has flush toilets, picnic tables and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({toilets: "flush", picnicTables: true, drinkingWater: true}))
      .toEqual("Has flush toilets, picnic tables and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({toilets: "non_flush", picnicTables: true, drinkingWater: true}))
      .toEqual("Has non-flush toilets, picnic tables and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({toilets: "none", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables and drinking water but no toilets")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({toilets: undefined, picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables and drinking water")
  })
})
