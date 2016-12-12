# react-taggable-input [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![codecov][codecov-badge]][codecov]

tag or mention in input element when keydown # or @ or any other character.

[![react-taggable-input](http://bingo.d.pr/LG6X.gif)](http://blog.blackbing.net/react-taggable-input/)


# Install 

```
npm i react-taggable-input
```

# Usage
```js
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
```

# props

```
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
```

# More Detail

please checkout [Main.js](https://github.com/blackbing/react-taggable-input/blob/master/src/components/Main.js) if you want to see more detail.

[npm-badge]: https://img.shields.io/npm/v/react-taggable-input.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-taggable-input

[build-badge]: https://img.shields.io/travis/blackbing/react-taggable-input/master.svg?style=flat-square
[build]: https://travis-ci.org/blackbing/react-taggable-input

[codecov-badge]: https://codecov.io/gh/blackbing/react-taggable-input/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/blackbing/react-taggable-input


