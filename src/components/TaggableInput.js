/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PropTypes, PureComponent } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import ContentEditable from 'react-contenteditable';
import ClickOutside from 'react-click-outside';
require('styles//TaggableInput.css');
import TriggerMatch from './TriggerMatch';
import {
  getInputValueLength,
  replaceSelectedNode,
  setSelectionRange,
  getCaretPosition,
  getCaretPixelPos,
} from './utils';

require('keyboardevent-key-polyfill').polyfill();


const IGNORE_KEY = [
  'Delete',
  'Backspace',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
];

const DELETE_KEY = [
  'Delete',
  'Backspace',
];

class TaggableInput extends PureComponent {
  static propTypes = {
    trigger: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    placeHolder: PropTypes.string,
    maxLength: PropTypes.number,
    onKeyDown: PropTypes.func,
    onTrigger: PropTypes.func,
    onTriggerKeyUp: PropTypes.func,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    disabled: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      value: props.defaultValue || props.placeHolder,
      renderValue: '',
      disabled: props.disabled || true,
      placeHolder: true,
    };
    this.latestCaretPos = 0;
    this.triggerPopuped = false;
    this.tagCaretStartIndex = null;
    this.triggerEnter = false;
    this.triggerDel = false;
    this.onComposition = false;
    this.triggerMatch = new TriggerMatch(props.trigger);
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.disabled !== 'undefined') {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  applyTag = (html) => {
    const {
      tagCaretStartIndex,
      content,
      triggerMatch,
    } = this;
    const contentElement = findDOMNode(content);
    const currentTag = triggerMatch.parseMatchedTag(this.state.value, tagCaretStartIndex);
    const tagCaretEndIndex = tagCaretStartIndex + currentTag.length + 1;
    setSelectionRange(contentElement, tagCaretStartIndex, tagCaretEndIndex);
    replaceSelectedNode(html);

    const value = contentElement.innerHTML;
    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
    this.cancelTag(true);
  }

  cancelTag = (alsoResetIndex = false) => {
    this.triggerPopuped = false;
    if (alsoResetIndex) {
      this.tagCaretStartIndex = null;
    }
    if (this.props.onTrigger) {
      this.props.onTrigger('');
    }
  }

  handleChange = (value) => {
    this.updateCaretPosition();
    const {
      tagCaretStartIndex,
      content,
      triggerMatch,
      triggerDel,
    } = this;
    const _currentTag = triggerMatch.parseMatchedTag(value, tagCaretStartIndex, true);
    if (this.isTriggered()) {
      // parse tag include trigger
      // e.g, #2498
      if (_currentTag) {
        const contentElement = findDOMNode(content);
        const caretPos = getCaretPixelPos(contentElement);
        // parse tag not include trigger
        // e.g, 2498
        const currentTag = triggerMatch.parseMatchedTag(value, tagCaretStartIndex, false);
        // currentTag: 2498
        // _currentTag: #2498
        // caretPos: { top: 1, left: 1}
        if (this.props.onTrigger) {
          this.props.onTrigger(currentTag, _currentTag, caretPos);
        }
      } else if (triggerDel) {
        this.cancelTag(true);
      }
    }

    this.setState({ value }, () => {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    });
  }

  isTriggered = () => {
    const {
      tagCaretStartIndex,
      triggerPopuped,
    } = this;
    if (tagCaretStartIndex !== null) {
      return true;
    }
    return triggerPopuped;
  }

  updateCaretPosition = () => {
    const {
      content,
    } = this;
    const contentElement = findDOMNode(content);
    const currentCaretIndex = getCaretPosition(contentElement);
    this.latestCaretPos = currentCaretIndex;
    const triggerKeyStartIndex = this.triggerMatch.getTriggerKeyStartIndex(contentElement.innerHTML, this.latestCaretPos);
    if (triggerKeyStartIndex !== null) {
      this.triggerPopuped = true;
      this.tagCaretStartIndex = triggerKeyStartIndex;
    }
  }

  handleKeyDown = (e) => {
    const key = e.key;

    if (IGNORE_KEY.indexOf(key) < 0) {
      const value = this.state.value;
      const valueLength = getInputValueLength(value);
      if (valueLength > this.props.maxLength) {
        e.preventDefault();
      }
    }

    if (DELETE_KEY.indexOf(key) >= 0) {
      this.triggerDel = true;
    }

    switch (key) {
      case 'Enter': {
        e.preventDefault();
        if (!this.onComposition) {
          if (!this.isTriggered()) {
            // 避免輸入法的 trigger 問題
            // e.g, 注音輸入法按下 enter 會 trigger submit
            this.triggerEnter = true;
          } else {
            this.props.onKeyDown(key);
          }
        }
        break;
      }
      case 'Escape':
      case ' ': {
        if (!this.onComposition) {
          this.cancelTag(true);
        }
        break;
      }
      default: {
        if (this.isTriggered()) {
          this.props.onKeyDown(key);
        }
        break;
      }
    }
  }

  handleKeyUp = () => {
    // Note: triggerEnter is necessary for detecting user trigger
    // Enter or onComposition
    // composition will always return false on keyup event
    const contentElement = findDOMNode(this.content);
    const value = contentElement.innerHTML;
    const {
      tagCaretStartIndex,
    } = this;

    if (this.triggerEnter) {
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
      if (!this.state.disabled) {
        this.clearInput(this.handleFocus);
      }
      this.triggerEnter = false;
    }

    if (this.props.onTriggerKeyUp) {
      const triggerKeyStartIndex = this.triggerMatch.getTriggerKeyStartIndex(value, this.latestCaretPos);
      const _currentTag = this.triggerMatch.parseMatchedTag(value, tagCaretStartIndex, true);
      if (triggerKeyStartIndex !== null && _currentTag.length === 1) {
        const caretPos = getCaretPixelPos(contentElement);
        this.props.onTriggerKeyUp(caretPos);
      } else {
        this.props.onTriggerKeyUp(null);
      }
    }
    this.triggerDel = false;
  }

  handleFocus = () => {
    if (this.state.value === this.props.placeHolder) {
      this.setState({
        value: '',
        placeHolder: false,
      });
    }
  }

  handleBlur = () => {
    if (!this.state.value) {
      this.setState({
        value: this.props.placeHolder,
        placeHolder: true,
      });
    }
  }

  handleClickOutside = () => {
    if (this.isTriggered()) {
      this.cancelTag();
    }
  }

  handleComposition = (e) => {
    if (e.type === 'compositionend') {
      this.onComposition = false;
    } else {
      this.onComposition = true;
    }
  }

  clearInput = (callback) => {
    this.setState({
      value: this.props.placeHolder,
      placeHolder: true,
    }, () => {
      this.cancelTag(true);
      if (callback) {
        callback();
      }
    });
  }

  render() {
    const classNames = [];
    if (this.props.className) {
      classNames.push(this.props.className);
    }
    if (this.state.value === this.props.placeHolder &&  this.state.placeHolder) {
      classNames.push('placeholder');
    }
    return (
      <ClickOutside onClickOutside={ this.handleClickOutside } useCapture={ false }>
        <ContentEditable
          html={ this.state.value }
          className={ cx(classNames) }
          ref={ (content) => (this.content = content) }
          disabled={ false }
          onChange={ this.handleChange }
          onKeyDown={ this.handleKeyDown }
          onFocus={ this.handleFocus }
          onBlur={ this.handleBlur }
          onKeyUp={ this.handleKeyUp }
          onCompositionStart={ this.handleComposition }
          onCompositionUpdate={ this.handleComposition }
          onCompositionEnd={ this.handleComposition }
        />
      </ClickOutside>
    );
  }
}

export default TaggableInput;
