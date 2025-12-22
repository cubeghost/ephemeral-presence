import React, { Fragment, Component } from 'react';
import autobind from 'class-autobind';

import Link from './Link';

class About extends Component {

  constructor() {
    super();
    autobind(this);

    this.state = {
      isOpen: false,
    };
  }

  handleClick() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <Fragment>
        <button className="box about-button" onClick={this.handleClick}>
          about
        </button>
        {isOpen && (
          <div className="box about">
            <h3>what is this</h3>
            <p>
              <Link href="https://twitter.com/cubeghost/status/949801647617822720">
                https://twitter.com/cubeghost/status/949801647617822720
              </Link>
            </p>
            <p>
              it's like a liminal space but in cyber...space
            </p>
            <h3>how</h3>
            <p>websockets, <s><Link href="https://glitch.com">glitch.com</Link></s> RIP, redis</p>
            <p><Link href="https://github.com/cubeghost/ephemeral-presence">source on github</Link></p>
            <h3>credits</h3>
            <ul>
              <li>
                cursors are from <Link href="https://web.archive.org/web/20120120140355/http://www.webfetti.com:80/MySpace/Cursors/Animals.jhtml?pageNumber=3">webfetti</Link> (h/t internet archive)
              </li>
              <li>
                see <Link href="https://github.com/cubeghost/ephemeral-presence/blob/main/src/components/World.jsx">components/World.jsx</Link> for
                gif sources
              </li>
            </ul>
            <button className="box close-about-button" onClick={this.handleClick}>close</button>
          </div>
        )}
      </Fragment>
    );
  }
}

export default About;