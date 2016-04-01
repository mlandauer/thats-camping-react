import expect from 'expect'
import shortenName from '../../libs/shortenName'

describe('shortenName', () => {
  it('should do nothing to a short name', () => {
    expect(shortenName("Something short")).toEqual("Something short")
  })

  it('should remove unneccessary words', () => {
    expect(shortenName("Abercrombie Caves campground")).toEqual("Abercrombie Caves")
    expect(shortenName("Gap Creek camping ground")).toEqual("Gap Creek")
    expect(shortenName("Youngville camping area")).toEqual("Youngville")
    expect(shortenName("Washpools picnic and camping area")).toEqual("Washpools")
    expect(shortenName("Pebbly Beach campground and picnic area")).toEqual("Pebbly Beach")
    expect(shortenName("O'Hares rest area")).toEqual("O'Hares")
    // Not actually sure that this is a sensible shortening to be making
    expect(shortenName("Lane Cove River tourist park")).toEqual("Lane Cove River")
    expect(shortenName("Lake Arragan and Red Cliff campgrounds")).toEqual("Lake Arragan and Red Cliff")
    expect(shortenName("Kosciuszko camping grounds")).toEqual("Kosciuszko")
    expect(shortenName("Berlang Camping Area")).toEqual("Berlang")
    expect(shortenName("Blatherarm camping and picnic area")).toEqual("Blatherarm")
    expect(shortenName("Blue Gums large group campground")).toEqual("Blue Gums")
    expect(shortenName("Abercrombie Karst Conservation Reserve")).toEqual("Abercrombie KCR")
    expect(shortenName("Watagans National Park")).toEqual("Watagans NP")
    expect(shortenName("The Glen Nature Reserve")).toEqual("The Glen NR")
    expect(shortenName("Arakoon State Conservation Area")).toEqual("Arakoon SCA")
    expect(shortenName("Hill End Historic Site")).toEqual("Hill End")
    expect(shortenName("Euroka campground - Appletree Flat campervan and camper trailer area")).toEqual("Euroka - Appletree Flat")
  })
})
