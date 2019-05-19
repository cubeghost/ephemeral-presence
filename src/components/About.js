import React, { Component } from 'react';
import autobind from 'class-autobind';

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
        <button className="box about-button">
          about
        </button>
      
      </Fragment>
    );
  }
}

export default About;