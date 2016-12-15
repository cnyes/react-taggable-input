require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import TaggableInput from './TaggableInput';

class AppComponent extends Component {

  constructor() {
    super();
    this.state = {
      triggerValue: '',
      value: '',
    }
  }

  handleKeyDown = (key) => {
    console.log('keydown', key);
    if (key === 'Enter') {
      const triggerValue = this.state.triggerValue;
      const html = `<a href="#" data-tag="${triggerValue}">#${triggerValue}</a>&nbsp`;
      this.input.applyTag(html);
    }
  }

  handleTrigger = (value) => {
    console.log('handleTrigger', value);
    const triggerValue = value;
    this.setState({ triggerValue });
  }

  handleTriggerKeyUp = (pos) => {
    console.log('handleTriggerKeyUp', pos);
  }

  handleChange = (value) => {
    console.log(value);
    this.setState({ value });
  }

  handleSubmit = (e) => {
    console.log(e);
    console.log('handleSubmit', this.state.value);
  }

  applyTag = (e) => {
    console.log('applyTag');
    const { target } = e;
    const tag = target.innerHTML;
    const html = `<a href="#" data-tag="${tag}">#${tag}</a>&nbsp`;
    this.input.applyTag(html);
  }

  render() {
    const defaultValue = '<a href="#" data-tag="react-taggable-input">#react-taggableinput</a>&nbsp;<a href="#" data-tag="鉅亨網">#鉅亨網</a>&nbsp;made with ♥';
    return (
      <div className="index">
        <TaggableInput
          ref={ (input) => (this.input = input) }
          disabled={ this.props.disabled }
          defaultValue={ defaultValue }
          className="submit-input"
          placeHolder="輸入 #"
          trigger="#＃"
          maxLength={ 100 }
          onKeyDown={ this.handleKeyDown }
          onTrigger={ this.handleTrigger }
          onTriggerKeyUp={ this.handleTriggerKeyUp }
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
        />
        <ul>
          <li onClick={ this.applyTag }>{this.state.triggerValue || 'no result' }</li>
        </ul>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
