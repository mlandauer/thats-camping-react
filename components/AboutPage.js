import React from 'react'
import Header from './Header'

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="about">
        <Header title="About"/>
        <div className="content">
          <div className="container">
            <h2>
              About That's Camping
            </h2>

            <p>
              Find campsites near you in New South Wales, Australia.
              It covers camping on public, common land such as National Parks,
              State Forests and Local Council land.
            </p>

            <p>
              It works completely offline, even when you're out in the middle of
              nowhere (when does that ever happen camping?) and you have no
              phone signal.
            </p>

            <p>Made by <a href="https://twitter.com/matthewlandauer">Matthew Landauer</a></p>

            <h2>Things you might want to do</h2>
            <p>
              <a href="https://github.com/mlandauer/thats-camping-react/issues">
                Suggest a <strong>feature</strong> or report an <strong>issue</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
