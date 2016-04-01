import expect from 'expect'
import CampsiteDetail from '../../components/CampsiteDetail'

describe('<CampsiteDetail />', () => {
  describe("access", () => {
    it('accessText', () => {
      var c = new CampsiteDetail
      expect(c.accessText({caravans: true})).toEqual("For caravans")
    })

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

    it('caravans', () => {
      var c = new CampsiteDetail
      expect(c.caravans(true)).toEqual({"have": "caravans"})
      expect(c.caravans(false)).toEqual({"notHave": "caravans"})
      expect(c.caravans(undefined)).toEqual({})
    })

    it('trailers', () => {
      var c = new CampsiteDetail
      expect(c.trailers(true)).toEqual({"have": "trailers"})
      expect(c.trailers(false)).toEqual({"notHave": "trailers"})
      expect(c.trailers(undefined)).toEqual({})
    })

    it('car', () => {
      var c = new CampsiteDetail
      expect(c.car(true)).toEqual({"have": "car camping"})
      expect(c.car(false)).toEqual({"notHave": "car camping"})
      expect(c.car(undefined)).toEqual({})
    })
  })

  describe("facilities", () => {
    it('facilitiesText', () => {
      var c = new CampsiteDetail
      expect(c.facilitiesText({toilets: "flush", picnicTables: true, drinkingWater: true}))
        .toEqual("Has flush toilets, picnic tables and drinking water")
    })

    it('facilitiesText', () => {
      var c = new CampsiteDetail
      expect(c.facilitiesText({toilets: "flush", picnicTables: false, drinkingWater: true}))
        .toEqual("Has flush toilets and drinking water but no picnic tables")
    })

    it('facilitiesText', () => {
      var c = new CampsiteDetail
      expect(c.facilitiesText({toilets: "flush", picnicTables: false, drinkingWater: false}))
        .toEqual("Has flush toilets but no picnic tables and drinking water")
    })

    it('facilitiesText', () => {
      var c = new CampsiteDetail
      expect(c.facilitiesText({toilets: "none", picnicTables: false, drinkingWater: false}))
        .toEqual("No toilets, picnic tables and drinking water")
    })

    it('toilets', () => {
      var c = new CampsiteDetail
      expect(c.toilets("flush")).toEqual({"have": "flush toilets"})
      expect(c.toilets("non_flush")).toEqual({"have": "non-flush toilets"})
      expect(c.toilets("none")).toEqual({"notHave": "toilets"})
      expect(c.toilets(undefined)).toEqual({})
    })

    it('picnicTables', () => {
      var c = new CampsiteDetail
      expect(c.picnicTables(true)).toEqual({"have": "picnic tables"})
      expect(c.picnicTables(false)).toEqual({"notHave": "picnic tables"})
      expect(c.picnicTables(undefined)).toEqual({})
    })

    it('barbecues', () => {
      var c = new CampsiteDetail
      expect(c.barbecues("wood")).toEqual({"have": "wood BBQs"})
      expect(c.barbecues("wood_supplied")).toEqual({"have": "wood BBQs"})
      expect(c.barbecues("wood_bring_your_own")).toEqual({"have": "wood BBQs"})
      expect(c.barbecues("gas_electric")).toEqual({"have": "gas/electric BBQs"})
      expect(c.barbecues("none")).toEqual({"notHave": "BBQs"})
      expect(c.barbecues(undefined)).toEqual({})
    })

    it('showers', () => {
      var c = new CampsiteDetail
      expect(c.showers("hot")).toEqual({"have": "hot showers"})
      expect(c.showers("cold")).toEqual({"have": "cold showers"})
      expect(c.showers("none")).toEqual({"notHave": "showers"})
      expect(c.showers(undefined)).toEqual({})
    })

    it('drinkingWater', () => {
      var c = new CampsiteDetail
      expect(c.drinkingWater(true)).toEqual({"have": "drinking water"})
      expect(c.drinkingWater(false)).toEqual({"notHave": "drinking water"})
      expect(c.drinkingWater(undefined)).toEqual({})
    })
  })

  it('merge', () => {
    var c = new CampsiteDetail
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    c.merge(original, {})
    expect(original).toEqual({"have": ["foo", "bar"], "notHave": ["squiggle"]})
  })

  it('merge', () => {
    var c = new CampsiteDetail
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    c.merge(original, {"have": "a"})
    expect(original).toEqual({"have": ["foo", "bar", "a"], "notHave": ["squiggle"]})
  })

  it('merge', () => {
    var c = new CampsiteDetail
    var original = {"have": ["foo", "bar"], "notHave": ["squiggle"]}
    c.merge(original, {"notHave": "b"})
    expect(original).toEqual({"have": ["foo", "bar"], "notHave": ["squiggle", "b"]})
  })

  describe('capitaliseFirstLetter', () => {
    it("shouldn't do anything to an empty string", () => {
      var c = new CampsiteDetail
      expect(c.capitaliseFirstLetter("")).toEqual("")
    })

    it("should capitalise the first letter", () => {
      var c = new CampsiteDetail
      expect(c.capitaliseFirstLetter("a book")).toEqual("A book")
    })

    it("shouldn't do anything if the first letter is already capitalised", () => {
      var c = new CampsiteDetail
      expect(c.capitaliseFirstLetter("Hello World")).toEqual("Hello World")
    })
  })

})
