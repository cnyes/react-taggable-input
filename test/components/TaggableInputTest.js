/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import TaggableInput from 'components//TaggableInput.js';

describe('TaggableInputComponent', () => {
  let component;

  beforeEach(() => {
    component = createComponent(TaggableInput, {
      className: 'test-class',
      trigger: '#'
    });
  });

  it('should have its component name as default className', () => {
    expect(component.props.children.props.className).to.equal('test-class placeholder');
  });
});
