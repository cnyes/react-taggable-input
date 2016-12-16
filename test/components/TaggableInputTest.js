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
};

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

  describe('initial rendering', function() {

    beforeEach(() => {
      this.subject = TestUtils.renderIntoDocument(<TestComponent />);
      this.element = TestUtils.findRenderedDOMComponentWithClass(this.subject, defaultProps.className);
      this.component = this.subject.input
    });

    it('should have input ref callback', () => {
      expect(this.component).to.not.equal(null);
    });

    it('should render component', () => {
      expect(TestUtils.isCompositeComponent(this.subject)).to.equal(true);
    });

    it('should have placeholder class', () => {
      const el = TestUtils.findRenderedDOMComponentWithClass(this.subject, 'placeholder');
      expect(el).to.not.equal(null);
    });

    it('should have test class', () => {
      const el = TestUtils.findRenderedDOMComponentWithClass(this.subject, defaultProps.className);
      expect(el).to.not.equal(null);
    });

    it('should have placeHolder', () => {
      expect(this.element.textContent).to.equal(defaultProps.placeHolder);
    });
  });

  describe('basic behavior', function() {

    beforeEach(() => {
      this.subject = TestUtils.renderIntoDocument(<TestComponent />);
      this.element = TestUtils.findRenderedDOMComponentWithClass(this.subject, defaultProps.className);
      this.component = this.subject.input
    });

    it('should set empty value when focus', () => {
      TestUtils.Simulate.focus(this.element);
      expect(this.element.textContent).to.equal('');
    });

    it('should set placeholder value when blur', () => {
      TestUtils.Simulate.blur(this.element);
      expect(this.element.textContent).to.equal(defaultProps.placeHolder);
    });

  });

});
