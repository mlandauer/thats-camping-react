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

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({picnicTables: false, drinkingWater: true}))
      .toEqual("Has drinking water but no picnic tables")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({barbecues: "wood", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables, wood BBQs and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({barbecues: "wood_supplied", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables, wood BBQs and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({barbecues: "wood_bring_your_own", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables, wood BBQs and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({barbecues: "gas_electric", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables, gas/electric BBQs and drinking water")
  })

  it('facilitiesText', () => {
    var c = new CampsiteDetail
    expect(c.facilitiesText({barbecues: "none", picnicTables: true, drinkingWater: true}))
      .toEqual("Has picnic tables and drinking water but no BBQs")
  })
})
