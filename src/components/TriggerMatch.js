import {
  plainText,
} from './utils';

class TriggerMatch {

  constructor(trigger) {
    this.triggerRegex = new RegExp(`^([${trigger}](\\S*))`);
    this.triggerKeyRegex = new RegExp(`[${trigger}][\\S]*$`);
    // this.triggerKeyRegexEndMatch = new RegExp(`^[${trigger}]$`);
  }

  parseMatchedTag = (value, tagCaretStartIndex, includeTrigger = false) => {
    let currentTag = '';
    if (value && tagCaretStartIndex >= 0) {
      const triggerSubString = plainText(value).substring(tagCaretStartIndex);
      const match = triggerSubString.match(this.triggerRegex);
      if (match && match.length) {
        if (includeTrigger) {
          currentTag = match[1];
        } else {
          currentTag = match[2];
        }
      }
    }
    return currentTag;
  }
  // detect triggerKey is existed in current caret
  // it has to be called after keyup
  // return null if there is no finding
  getTriggerKeyStartIndex = (value, latestCaretPos) => {
    let exist = false;

    // 1. seperate from 0 to caret
    let subStringEndWithCaret = plainText(value).substring(0, latestCaretPos);
    // 2. seperate form Space
    const lastSpace = subStringEndWithCaret.lastIndexOf(' ');
    if (lastSpace >= 0) {
      subStringEndWithCaret = subStringEndWithCaret.substring(lastSpace + 1);
    }
    if (this.triggerKeyRegex.test(subStringEndWithCaret)) {
      exist = true;
    }
    if (exist) {
      const matched = subStringEndWithCaret.match(this.triggerKeyRegex);
      let lastMatched = subStringEndWithCaret;

      if (matched && matched.length) {
        lastMatched = matched[matched.length - 1];
      }

      if (latestCaretPos - lastMatched.length > 0) {
        return latestCaretPos - lastMatched.length;
      }
      return 0;
    }
    return null;
  }
}

export default TriggerMatch;
