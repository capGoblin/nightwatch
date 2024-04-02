// const firefox = require('selenium-webdriver/firefox');
// const { Builder } = require('selenium-webdriver');
// const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');
//
// async function openGoogle() {
//     let driver = await new Builder()
//         .forBrowser('firefox')
//         .setFirefoxOptions(new firefox.Options().enableBidi())
//         .build();
//
//     try {
//         const browsingContext = await BrowsingContext(driver, {
//             type: 'window',
//         });
//
//         if (browsingContext.id) {
//             await driver.switchTo().window(browsingContext.id);
//             await driver.get('https://www.google.com');
//         }
//     } finally {
//         await driver.quit();
//     }
// }
//
// openGoogle();
// const getInputInstance = require('./InputActions');
// const BrowsingContext = require('selenium-webdriver/bidi/browsingContext');
// const { Builder } = require('selenium-webdriver');
// async function main() {
//     // Create a WebDriver instance
//     let driver = await new Builder().forBrowser('chrome').build();
//
//     // Initialize the bidi input
//     let bidiInput = await driver.getBidi();
//
//     // Create a BrowsingContext
//     let browsingContext = await BrowsingContext(driver, {
//         type: 'window',
//     });
//
//     // Use the BrowsingContext
//     if (browsingContext.id) {
//         await driver.switchTo().window(browsingContext.id);
//
//         // Create an instance of Input
//         let inputActions = await getInputInstance(driver, bidiInput);
//
//         // Define your action to navigate to Google
//         const actions = [{
//             type: 'navigate',
//             url: 'https://www.google.com'
//         }];
//
//         try {
//             await inputActions.perform(browsingContext.id, actions);
//             console.log('Actions performed successfully!');
//         } catch (error) {
//             console.error('Error performing actions:', error);
//         }
//
//         // Release actions (optional)
//         try {
//             await inputActions.release(browsingContext.id);
//             console.log('Actions released successfully!');
//         } catch (error) {
//             console.error('Error releasing actions:', error);
//         }
//     }
//
//     // Close the WebDriver instance
//     await driver.quit();
// }
//
// main();
const InputActions = require('./InputActions');
// const assert = require("assert");
// const firefox = require('selenium-webdriver/firefox');
const { By, Key, Builder, Actions, until } = require("selenium-webdriver");
// const Input = require('selenium-webdriver/bidi/input');
// const { BrowsingContext, getElementLocation, getLocation, WebElement } = require("selenium-webdriver");
(async function () {
    let driver;

    try {
        // Initialize WebDriver with BiDi enabled

        // driver = await new Builder()
        //     .forBrowser('firefox')
        //     .setFirefoxOptions(new firefox.Options().enableBidi())
        //     .build();
        driver = await InputActions('firefox');



        // Navigate to Ecosia
        console.log("Navigating to Ecosia...");
        await driver._driver.get('https://www.ecosia.org/');

        // Find the search input field
        console.log("Finding the search input field...");
        // const searchInput = await driver.findElement(By.xpath("//input[@placeholder='Search the web...']"));
        // const input = await Input(driver._driver);
        const browsingContextId = await driver._driver.getWindowHandle();

        // Construct the sequence of actions
        console.log("Constructing the sequence of actions...");
        // await driver.sleep(5000);
        // const location = await getElementLocation(searchInput);
        // console.log("Location: ", location)

        const actions = [
            // {
            //     type: 'pointer',
            //     id: 'move-pointer',
            //     actions: [
            //         { type: 'pointerMove', x: location.x, y: location.y, origin: searchInput } // Move pointer to start of input field
            //     ]
            // },
            // {
            //     type: 'pointer',
            //     id: 'press-left-button',
            //     actions: [
            //         { type: 'pointerDown', button: 0 }
            //     ]
            // },
            // {
            //     type: 'pointer',
            //     id: 'release-left-button',
            //     actions: [
            //         { type: 'pointerUp', button: 0 }
            //     ]
            // },
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
                    { type: 'keyDown', value: Key.ENTER } // Press Enter to perform the search
                ]
            }
        ];

        // Perform the actions on the search input field
        console.log("Performing the actions on the search input field...");
        await driver.perform(browsingContextId, actions);
        // await input.perform(browsingContextId, actions);
        // Wait for a brief moment (optional)
        await driver._driver.sleep(2000);
        // const resultElement = await driver._driver.findElement(By.css('.search-form__input'));
        // const searchValue = await resultElement.getAttribute('value');

        // let resultElement = await driver._driver.findElement(By.className('search-form__input'))
        // await resultElement.getText().then(function (text) {
        // assert(text.includes('nightwatch'))
        // })

        // if (searchValue === 'nightwatch') {
        // console.log('The search input value is "nightwatch".');
        //     // assert.strictEqual(searchValue, 'nightwatch', 'Search input value does not match expected value');

        // } else {
        // console.log('The search input value is not "nightwatch".');
        // }

    } finally {
        // Close the WebDriver session
        console.log("Closing the WebDriver session...");
        if (driver) {
            await driver._driver.quit();
        }
    }
})();

// async function navigateToGoogle() {
//     // Create an instance of InputActions
//     let inputActions = new InputActions();

//     // Initialize the InputActions instance with the desired browser
//     await inputActions.init('firefox'); // Replace 'firefox' with your desired browser

//     // Define your action to navigate to Google
//     // const actions = [{
//     //     type: 'navigate',
//     //     url: 'https://www.google.com'
//     // }];
//     const actions = await inputActions._driver.actions().keyDown('a').keyDown('b').getSequences()


//     // Get the window handle of the current browsing context
//     const browsingContextId = await inputActions._driver.getWindowHandle();

//     // Perform the action
//     try {
//         await inputActions.performActions(browsingContextId, actions);
//         console.log('Navigated to Google successfully!');
//     } catch (error) {
//         console.error('Error navigating to Google:', error);
//     }

//     // Close the WebDriver instance
//     await inputActions._driver.quit();
// }

// navigateToGoogle();
