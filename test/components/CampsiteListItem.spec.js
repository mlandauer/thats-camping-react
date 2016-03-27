import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import CampsiteListItem from '../../components/CampsiteListItem'

describe('<CampsiteListItem />', () => {
  it('renders the name of the campsite', () => {
    const wrapper = shallow(<CampsiteListItem campsiteName="A Campsite"/>)
    expect(wrapper.contains(<div className="name">A Campsite</div>)).toEqual(true)
  })

  it('renders the name of the park', () => {
    const wrapper = shallow(<CampsiteListItem parkName="A Park"/>)
    expect(wrapper.contains(<div className="park">A Park</div>)).toEqual(true)
  })

  it('renders the bearing 0 as north', () => {
    const wrapper = shallow(<CampsiteListItem distance={1} bearing={0}/>)
    expect(wrapper.find('.distance').text()).toEqual('1 m N')
  })

  it('renders the bearing 90 as east', () => {
    const wrapper = shallow(<CampsiteListItem distance={1} bearing={90}/>)
    expect(wrapper.find('.distance').text()).toEqual('1 m E')
  })

  it('renders the bearing 45 as east', () => {
    const wrapper = shallow(<CampsiteListItem distance={1} bearing={45}/>)
    expect(wrapper.find('.distance').text()).toEqual('1 m NE')
  })

  it('renders larger distances in km', () => {
    const wrapper = shallow(<CampsiteListItem distance={2345} bearing={0}/>)
    expect(wrapper.find('.distance').text()).toEqual('2 km N')
  })

  it('does not render distance when not given', () => {
    const wrapper = shallow(<CampsiteListItem/>)
    expect(wrapper.find('.distance').text()).toEqual(' ')
  })

  it('renders the star', () => {
    const wrapper = shallow(<CampsiteListItem starred={true}/>)
    expect(wrapper.find('Star').prop("starred")).toEqual(true)
  })

  it('renders the star', () => {
    const wrapper = shallow(<CampsiteListItem starred={false}/>)
    expect(wrapper.find('Star').prop("starred")).toEqual(false)
  })
})