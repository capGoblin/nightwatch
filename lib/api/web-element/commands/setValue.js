/**
 * Sends some text to an element. Can be used to set the value of a form element or to send a sequence of key strokes to an element. Any UTF-8 character may be specified.
 *
 * <div class="alert alert-warning">From Nightwatch v2, <strong>setValue</strong> also clears the existing value of the element by calling the <strong>clearValue()</strong> beforehand.</div>
 *
 * An object map with available keys and their respective UTF-8 characters, as defined on [W3C WebDriver draft spec](https://www.w3.org/TR/webdriver/#character-types), is loaded onto the main Nightwatch instance as `browser.Keys`.
 *
 * For more info on working with DOM elements in Nightwatch, refer to the <a href="https://nightwatchjs.org/guide/writing-tests/finding-interacting-with-dom-elements.html">Finding & interacting with DOM Elements</a> guide page.
 * @example
 * // send some simple text to an input
 * this.demoTest = function (browser) {
 *   const result = await browser.element('input[type=text]').setValue('nightwatch');
 * };
 *
 * // send some text to an input and hit enter.
 * this.demoTest = function (browser) {
 *   const result = await browser.element('input[type=text]').setValue(['nightwatch', browser.Keys.ENTER]);
 * };
 *
 *
 * @link /session/:sessionId/element/:id/value
 * @method setValue
 * @memberof ScopedWebElement
 * @instance
 * @syntax browser.element(selector).setValue(inputValue)
 * @param {string|array} inputValue The text to send to the element or key strokes.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @link https://www.w3.org/TR/webdriver#element-send-keys
 */
const { Key } = require("selenium-webdriver");

module.exports.command = async function (...args) {
  const keys = args.reduce((prev, key) => {
    const keyList = Array.isArray(key) ? key : [key];
    prev.push(...keyList);

    return prev;
  }, []);
  const actions = [
    {
      type: 'key',
      id: 'press-n-key',
      actions: [
        { type: 'keyDown', value: 'n' }
      ]
    },
    {
      type: 'key',
      id: 'release-n-key',
      actions: [
        { type: 'keyUp', value: 'n' }
      ]
    },
    {
      type: 'key',
      id: 'press-i-key',
      actions: [
        { type: 'keyDown', value: 'i' }
      ]
    },
    {
      type: 'key',
      id: 'release-i-key',
      actions: [
        { type: 'keyUp', value: 'i' }
      ]
    },
    {
      type: 'key',
      id: 'press-g-key',
      actions: [
        { type: 'keyDown', value: 'g' }
      ]
    },
    {
      type: 'key',
      id: 'release-g-key',
      actions: [
        { type: 'keyUp', value: 'g' }
      ]
    },
    {
      type: 'key',
      id: 'press-h-key',
      actions: [
        { type: 'keyDown', value: 'h' }
      ]
    },
    {
      type: 'key',
      id: 'release-h-key',
      actions: [
        { type: 'keyUp', value: 'h' }
      ]
    },
    {
      type: 'key',
      id: 'press-t-key',
      actions: [
        { type: 'keyDown', value: 't' }
      ]
    },
    {
      type: 'key',
      id: 'release-t-key',
      actions: [
        { type: 'keyUp', value: 't' }
      ]
    },
    {
      type: 'key',
      id: 'press-w-key',
      actions: [
        { type: 'keyDown', value: 'w' }
      ]
    },
    {
      type: 'key',
      id: 'release-w-key',
      actions: [
        { type: 'keyUp', value: 'w' }
      ]
    },
    {
      type: 'key',
      id: 'press-a-key',
      actions: [
        { type: 'keyDown', value: 'a' }
      ]
    },
    {
      type: 'key',
      id: 'release-a-key',
      actions: [
        { type: 'keyUp', value: 'a' }
      ]
    },
    {
      type: 'key',
      id: 'press-t-key',
      actions: [
        { type: 'keyDown', value: 't' }
      ]
    },
    {
      type: 'key',
      id: 'release-t-key',
      actions: [
        { type: 'keyUp', value: 't' }
      ]
    },
    {
      type: 'key',
      id: 'press-c-key',
      actions: [
        { type: 'keyDown', value: 'c' }
      ]
    },
    {
      type: 'key',
      id: 'release-c-key',
      actions: [
        { type: 'keyUp', value: 'c' }
      ]
    },
    {
      type: 'key',
      id: 'press-h-key',
      actions: [
        { type: 'keyDown', value: 'h' }
      ]
    },
    {
      type: 'key',
      id: 'release-h-key',
      actions: [
        { type: 'keyUp', value: 'h' }
      ]
    },
    {
      type: 'key',
      id: 'search-key',
      actions: [
        { type: 'keyDown', value: Key.ENTER }
      ]
    }
  ];

  await this.inputInstance.perform(this.context, actions);
  return this.runQueuedCommand('setElementValue', {
    args: [keys]
  });
};
