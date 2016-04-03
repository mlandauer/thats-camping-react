import React from 'react'
import Header from './Header'
import revision from 'raw!../public/COMMITHASH'

export default class AboutPage extends React.Component {
  render() {
    // Shorten sha
    var shortRevision = revision.substring(0, 7)
    var githubURL = "https://github.com/mlandauer/thats-camping-react/commit/" + shortRevision

    return (
      <div className="about">
        <Header title="About"/>
        <div className="content">
          <div className="container">
            <h2>About That's Camping</h2>

            <p>
              Find campsites near you in New South Wales, Australia.
              It covers camping on public, common land such as National Parks,
              State Forests and Local Council land.
            </p>

            <p>
              It works <strong>completely offline</strong>, even when you're
              far far away from a mobile phone tower. When does that ever happen
              while camping?
            </p>

            <p>
              Made by <a href="https://twitter.com/matthewlandauer">Matthew Landauer</a> based on an iOS app by Matthew and <a href="https://twitter.com/katska">Katherine Szuminska</a>. It's free and <a href="https://github.com/mlandauer/thats-camping-react">open source</a> because that's the way it ought to be.
            </p>

            <p>
              You're currently using version <a href={githubURL}>{shortRevision}</a>.
            </p>

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
