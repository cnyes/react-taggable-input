/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
import TriggerMatch from 'components//TriggerMatch';

const parseMatchedTagTestCase = [
  {
    input: ['#123', 0, true],
    output: '#123',
  },
  {
    input: ['#123', 0, false],
    output: '123',
  },

  {
    input: ['123#', 3, true],
    output: '#',
  },
  {
    input: ['123#', 3, false],
    output: '',
  },
  {
    input: ['123#4', 3, true],
    output: '#4',
  },
  {
    input: ['123#4', 3, false],
    output: '4',
  },
  {
    input: ['123#456', 3, true],
    output: '#456',
  },
  {
    input: ['123#456', 3, false],
    output: '456',
  },
];

const triggerKeyStartIndexTestCase = [
  {
    input: ['', 0],
    output: null,
  },
  {
    input: ['#123', 1],
    output: 0,
  },
  {
    input: ['#123', 2],
    output: 0,
  },
  {
    input: ['123#123', 4],
    output: 3,
  },
  {
    input: ['123#123', 5],
    output: 3,
  },
  {
    input: ['123#123', 6],
    output: 3,
  },
  {
    input: ['test 123#123', 9],
    output: 8,
  },
];

describe('TriggerMatch unit test', function TriggerMatchTest() {
  beforeEach(() => {
    this.subject = new TriggerMatch('#＃');
  });
  describe('should test getTriggerKeyStartIndex', () => {
    triggerKeyStartIndexTestCase.forEach((tester, index) => {
      const args = tester.input;
      it(`should be pass triggerKeyStartIndexTestCase[${index}](${args.toString()})`, () => {
        const matchedTag = this.subject.getTriggerKeyStartIndex(args[0], args[1]);
        expect(matchedTag).to.equal(tester.output);
      });
    });
  });
  describe('should test parseMatchedTag', () => {
    parseMatchedTagTestCase.forEach((tester, index) => {
      const args = tester.input;
      it(`should be pass testCase parseMatchedTagTestCase[${index}](${args.toString()})`, () => {
        const matchedTag = this.subject.parseMatchedTag(args[0], args[1], args[2]);
        expect(matchedTag).to.equal(tester.output);
      });
    });
  });
});
