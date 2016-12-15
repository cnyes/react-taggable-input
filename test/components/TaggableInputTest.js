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

const defaultProps = {
  trigger: '#＃',
  className: 'test',
  placeHolder: 'test placeHolder',
}

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

  render() {
    const props = this.props;
    return (
      <div className="index">
        <TaggableInput
          ref={ (input) => { this.input = input; } }
          { ...props }
          handleChange={ this.handleChange }
        />
      </div>
    );
  }
}

TestComponent.defaultProps = defaultProps;

describe('TaggableInputComponent', () => {
  let subject;
  let element;

  beforeEach(() => {
    subject = TestUtils.renderIntoDocument(<TestComponent />);
    element = TestUtils.findRenderedDOMComponentWithClass(subject, defaultProps.className);
  });

  describe('initial rendering', () => {

    it('should render component', () => {
      expect(TestUtils.isCompositeComponent(subject)).to.equal(true);
    });

    it('should have placeholder class', () => {
      const el = TestUtils.findRenderedDOMComponentWithClass(subject, 'placeholder');
      expect(el).to.not.equal(null);
    });

    it('should have test class', () => {
      const el = TestUtils.findRenderedDOMComponentWithClass(subject, defaultProps.className);
      expect(el).to.not.equal(null);
    });

    it('should have placeHolder', () => {
      expect(element.textContent).to.equal(defaultProps.placeHolder);
    });

  });

});
