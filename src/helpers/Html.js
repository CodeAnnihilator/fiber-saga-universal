/* eslint-disable */
import React, { Component } from 'react'
import ReactDOM from 'react-dom/server'
import serialize from 'serialize-javascript'
import Helmet from 'react-helmet'
import config from '../../config/app.config'

export default class Html extends Component {
  render() {
    const { assets, component, store } = this.props
    const content = component ? ReactDOM.renderToStaticMarkup(component) : ''
    const head = Helmet.rewind()
    return (
      <html lang='en-us'>
        <head>
          { head.base.toComponent() }
          { head.title.toComponent() }
          { head.meta.toComponent() }
          { head.link.toComponent() }
          { head.script.toComponent() }
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          {
            Object.keys(assets.styles).map((style, key) =>
              <link key={key}
                href={assets.styles[style]}
                media='screen, projection'
                rel='stylesheet'
                type='text/css'
                charSet='UTF-8'
              />
            )
          }
        </head>
        <body>
          <div id='content' dangerouslySetInnerHTML={{ __html: content }} />
          <script src='https://cdn.polyfill.io/v2/polyfill.min.js'></script>
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())}` }} charSet='UTF-8' />
          <script src={assets.javascript.main} charSet='UTF-8' />
        </body>
      </html>
    )
  }
}
