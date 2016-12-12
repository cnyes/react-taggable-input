# react-taggable-input [![npm package][npm-badge]][npm] [![Travis][build-badge]][build] [![codecov][codecov-badge]][codecov]

tag or mention in input element when keydown # or @ or any other character. This component is a div with `conteneditable` so you can apply any style on it if you want. It is also possible to paste `html` directly.

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
## trigger

which character would be trigger. e.g, `'#＃'`. it will only trigger *one* `character`.

## defaultValue

defaultValue is a html string. if you want to set the initial value for it.

## placeHolder

placeHolder is text only. It provides placeHolder function like `<input />` element.

## onTrigger

onTrigger will return a triggered value. it will return null if there is no trigger.

e.g, 
* `#` -> `''`
* `#123` -> `'123'`
* `123` -> `null`

## onTriggerKeyUp

onTriggerKeyUp will return the caret position of trigger. If you need to hint user how to use this trigger, it is very useful. here is an example.

![react-taggable-input-onTriggerKeyUp](http://bingo.d.pr/1gIzU.png)

## onChange

`onChange` will return the value when user change the value.

## onSubmit

`onSubmit` will be fired if user is not in trigger mode and click `Enter`. This behavior is similar to the original input element. 


# More Detail

please checkout [Main.js](https://github.com/blackbing/react-taggable-input/blob/master/src/components/Main.js) if you want to see more detail.

Note: [Main.js](https://github.com/blackbing/react-taggable-input/blob/master/src/components/Main.js) is the example to demonstrate how to use [react-taggable-input](https://github.com/blackbing/react-taggable-input). I make it simple in the behavior after triggered callback.

[npm-badge]: https://img.shields.io/npm/v/react-taggable-input.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-taggable-input

[build-badge]: https://img.shields.io/travis/blackbing/react-taggable-input/master.svg?style=flat-square
[build]: https://travis-ci.org/blackbing/react-taggable-input

[codecov-badge]: https://codecov.io/gh/blackbing/react-taggable-input/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/blackbing/react-taggable-input


