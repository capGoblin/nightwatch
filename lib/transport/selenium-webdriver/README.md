# Integrate WebDriver BiDi

here is a short clip of me running the [nightwatch/tests/sampleTest.js](https://github.com/capGoblin/nightwatch/blob/3742f931aa941f26cfc5e51c1cb5f3b6d4b117d2/tests/sampleTest.js) on BiDi protocol, implemented by using the [class](https://github.com/capGoblin/nightwatch/blob/3742f931aa941f26cfc5e51c1cb5f3b6d4b117d2/lib/transport/selenium-webdriver/InputActions.js) encapsulating the `input.performActions` method in the `.perform()` and the BiDi enabled driver instance in this class.
Using the BiDi-enabled Firefox driver instance in `navigateTo` command to navigate to the url passed and the command `setValue` using .perform() to perform the actions.


https://github.com/capGoblin/nightwatch/assets/78524377/1e7dfe42-eaa3-4672-a863-34a4f4eeb257


Obviously, in the video it had the chrome(HTTP instance) running on the side with the firefox (BiDi instance), this is just the example to show the POW, and will be refactored and further refinements will be made following discussions with the mentor.

