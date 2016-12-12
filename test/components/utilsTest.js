/* eslint-disable max-len*/
/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import {
  plainText,
  getInputValueLength,
  removeStyle,
} from 'components//utils';

const testCase1 = {
  input: '<a href="/market/tse:1236:stock" data-stock-tag="tse:1236:stock">#宏亞</a>&nbsp;<a href="/market/tse:1234:stock" data-stock-tag="tse:1234:stock">#黑松</a>&nbsp;#345',
  output: '#宏亞 #黑松 #345',
};

const testCase2 = {
  input: '<span style="color: rgb(51, 51, 51); font-family: &quot;Segoe UI Emoji&quot;; font-size: 49px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); display: inline !important; float: none;">😬</span>',
  output: '<span>😬</span>',
};

describe('TaggableInp utils test', () => {
  describe('should test plainText', () => {
    it('should be pass plainText', () => {
      expect(plainText(testCase1.input)).to.equal(testCase1.output);
    });
  });

  describe('should test getInputValueLength', () => {
    it('should be pass testCase1 getInputValueLength', () => {
      expect(getInputValueLength(testCase1.input)).to.equal(testCase1.output.length);
    });
  });

  describe('should test removeStyle', () => {
    it('should remove style', () => {
      expect(removeStyle(testCase2.input)).to.equal(testCase2.output);
    });
  });
});
