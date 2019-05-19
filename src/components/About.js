import React, { Fragment, Component } from 'react';
import autobind from 'class-autobind';

class About extends Component {

  constructor() {
    super();
    autobind(this);

    this.state = {
      isOpen: true, // TODO change
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
            <h2>credits</h2>
          </div>
        )}
      </Fragment>
    );
  }
}

export default About;