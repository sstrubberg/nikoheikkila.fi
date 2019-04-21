import React from 'react'
import { Link } from 'gatsby';
import { slide as Menu } from 'react-burger-menu'

import Hero from './hero'
import Banner from './banner'
import Toggle from './toggle'
import Footer from './footer'
import Pages from './pages'

import '../styles/main.scss'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

class Layout extends React.Component {
  state = {
    theme: null
  }

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    }
  }

  render() {
    const { title, children, cover = null } = this.props
    const { theme } = this.state

    const header = (
      <section className="banner">
        <Link to="/">
        {cover
          && <Hero data={cover} alt={title} />
          || <Banner />
        }
        </Link>
      </section>
    )

    const toggle = (
      <Toggle
        icons={{
          checked: (
            <img
              className="toggle-icon"
              src={moon}
              alt="checked"
            />
          ),
          unchecked: (
            <img
              className="toggle-icon"
              src={sun}
              alt="unchecked"
            />
          ),
        }}
        checked={theme === 'dark'}
        onChange={e =>
          window.__setPreferredTheme(
            e.target.checked ? 'dark' : 'light'
          )
        }
      />
    )

    const links = [{
      slug: '/',
      title: 'Blog'
    }]

    const sideMenu = (
      <Menu
        className="site-menu"
        pageWrapId="content"
        outerContainerId="container"
      >
        <Pages links={links} />
        {toggle}
      </Menu>
    )

    return (
      <div id="container">
        {sideMenu}
        <section id="content">
          <header>{header}</header>
          <main>
            {children}
          </main>
          <Footer />
        </section>
      </div>
    )
  }
}

export default Layout
