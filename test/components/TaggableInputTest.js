/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';
// Uncomment the following lines to use the react test utilities
import React, { Component } from 'react';
import TestUtils, {
  // findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import TaggableInput from 'components//TaggableInput.js';

class TestComponent extends Component {

  constructor() {
    super();
    this.state = {
      triggerValue: '',
      value: '',
    }
  }

  handleChange = (value) => {
    this.setState({ value });
  }

  input() {
    return this.refs.tagsinput.refs.input;
  }

  render() {
    const props = this.props;
    return (
      <div className="index">
        <TaggableInput
          ref={ (input) => (this.input = input) }
          { ...props }
          handleChange={ this.handleChange }
        />
      </div>
    );
  }
}

TestComponent.defaultProps = {
  trigger: '#＃',
  className: 'test',
};


/*
function keyDown(comp, code) {
  TestUtils.Simulate.keyDown(comp.input(), {keyCode: code});
}

function keyUp(comp, code) {
  TestUtils.Simulate.keyUp(comp.input(), {keyCode: code});
}

function blur(comp) {
  TestUtils.Simulate.blur(comp.input());
}

function focus(comp) {
  TestUtils.Simulate.focus(comp.input());
}

function click(comp) {
  TestUtils.Simulate.click(comp);
}
*/

describe('TaggableInputComponent', () => {
  describe('basic', () => {
    let subject;

    beforeEach(() => {
      subject = TestUtils.renderIntoDocument(<TestComponent />);
    });

    it('should render exist', () => {
      expect(TestUtils.isCompositeComponent(subject)).to.equal(true);
    });
  });
});
