// class Input {
//     constructor(driver, bidi) {
//         this._driver = driver;
//         this.bidi = bidi;
//     }

//     async init() {
//         if (!(await this._driver.getCapabilities()).get('webSocketUrl')) {
//             throw Error('WebDriver instance must support BiDi protocol');
//         }
//     }

//     async perform(browsingContextId, actions) {
//         const _actions = await updateActions(actions);

//         const command = {
//             method: 'input.performActions',
//             params: {
//                 context: browsingContextId,
//                 actions: _actions,
//             },
//         };

//         let response = await this.bidi.send(command);

//         return response;
//     }

//     async release(browsingContextId) {
//         const command = {
//             method: 'input.releaseActions',
//             params: {
//                 context: browsingContextId,
//             },
//         };
//         return await this.bidi.send(command);
//     }

//     async setFiles(browsingContextId, element, files) {
//         const command = {
//             method: 'input.setFiles',
//             params: {
//                 context: browsingContextId,
//                 element: element,
//                 files: typeof files === 'string' ? [files] : files,
//             },
//         };
//         await this.bidi.send(command);
//     }
// }

// async function updateActions(actions) {
//     // Implementation of updateActions
// }

// async function getInputInstance(driver, bidi) {
//     let instance = new Input(driver, bidi);
//     await instance.init();
//     return instance;
// }

// module.exports = getInputInstance;
// class Input {
//   constructor(driver, bidi) {
//     this._driver = driver;
//     this.bidi = bidi;
//   }
//
//   async init() {
//     if (!(await this._driver.getCapabilities()).get('webSocketUrl')) {
//       throw Error('WebDriver instance must support BiDi protocol');
//     }
//   }
//
//   async perform(browsingContextId, actions) {
//     const _actions = await updateActions(actions);
//
//     const command = {
//       method: 'input.performActions',
//       params: {
//         context: browsingContextId,
//         actions: _actions,
//       },
//     };
//
//     let response = await this.bidi.send(command);
//
//     return response;
//   }
//
//   async release(browsingContextId) {
//     const command = {
//       method: 'input.releaseActions',
//       params: {
//         context: browsingContextId,
//       },
//     };
//     return await this.bidi.send(command);
//   }
//
//   async setFiles(browsingContextId, element, files) {
//     const command = {
//       method: 'input.setFiles',
//       params: {
//         context: browsingContextId,
//         element: element,
//         files: typeof files === 'string' ? [files] : files,
//       },
//     };
//     await this.bidi.send(command);
//   }
// }
//
// async function updateActions(actions) {
//   // Implementation of updateActions
// }
//
// async function getInputInstance(driver, bidi) {
//   let instance = new Input(driver, bidi);
//   await instance.init();
//   return instance;
// }
//
// module.exports = getInputInstance;

const { Builder, WebElement } = require('selenium-webdriver');
const Input = require('selenium-webdriver/bidi/input');
const firefox = require('selenium-webdriver/firefox');
// class InputActions {
//   constructor() {
//     this._driver = null;
//     this.bidiInput = null;
//   }

//   async init(browserName) {
//     let options;

//     switch (browserName.toLowerCase()) {
//       case 'firefox':
//         options = new firefox.Options().enableBidi();
//         this._driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
//         break;
//       case 'chrome':
//         options = new chrome.Options().enableBidi();
//         this.driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
//         break;
//       // Add cases for other supported browsers as needed
//       default:
//         throw new Error('Unsupported browser');
//     }

//     this.bidiInput = await Input(this._driver);
//   }

//   // async initBidiInput() {
//   // Initialize the WebDriver BiDi input instance
//   // this.bidiInput = ;
//   // }

//   async performActions(browsingContextId, actions) {
//     if (!this.bidiInput) {
//       throw new Error('InputActions not initialized. Call init() first.');
//     }
//     // const updatedActions = await this.updateActions(actions);
//     return await this.bidiInput.perform(browsingContextId, actions);
//   }

//   async releaseActions(browsingContextId) {
//     if (!this.bidiInput) {
//       throw new Error('InputActions not initialized. Call init() first.');
//     }
//     return await this.bidiInput.release(browsingContextId);
//   }

//   async updateActions(actions) {
//     // Implement the updateActions method
//     return actions;
//   }
// }

// module.exports = InputActions;
class InputInstance {
    constructor(driver) {
        this._driver = driver
    }

    async init(browserName) {
        switch (browserName.toLowerCase()) {
            case 'firefox':
                this._driver = await new Builder()
                    .forBrowser('firefox')
                    .setFirefoxOptions(new firefox.Options().enableBidi())
                    .build();
                break;
            case 'chrome':
                this._driver = await new Builder()
                    .forBrowser('chrome')
                    .setFirefoxOptions(new firefox.Options().enableBidi())
                    .build();
                break;
            default:
                throw new Error('Unsupported browser');
        }
        if (!(await this._driver.getCapabilities()).get('webSocketUrl')) {
            throw Error('WebDriver instance must support BiDi protocol')
        }

        this.bidi = await this._driver.getBidi()
    }

    async perform(browsingContextId, actions) {
        const _actions = await updateActions(actions)

        const command = {
            method: 'input.performActions',
            params: {
                context: browsingContextId,
                actions: _actions,
            },
        }

        let response = await this.bidi.send(command)

        return response
    }

    async release(browsingContextId) {
        const command = {
            method: 'input.releaseActions',
            params: {
                context: browsingContextId,
            },
        }
        return await this.bidi.send(command)
    }

    async setFiles(browsingContextId, element, files) {
        if (typeof element !== 'string' && !(element instanceof ReferenceValue)) {
            throw Error(`Pass in a WebElement id as a string or a ReferenceValue. Received: ${element}`)
        }

        const command = {
            method: 'input.setFiles',
            params: {
                context: browsingContextId,
                element:
                    typeof element === 'string'
                        ? new ReferenceValue(RemoteReferenceType.SHARED_ID, element).asMap()
                        : element.asMap(),
                files: typeof files === 'string' ? [files] : files,
            },
        }
        await this.bidi.send(command)
    }
}

async function updateActions(actions) {
    const _actions = []
    for (const action of actions) {
        const sequenceList = action.actions
        let updatedSequenceList = []

        if (action.type === 'pointer' || action.type === 'wheel') {
            for (const sequence of sequenceList) {
                if ((sequence.type === 'pointerMove' || sequence.type === 'scroll') && sequence.origin instanceof WebElement) {
                    const element = sequence.origin
                    const elementId = await element.getId()
                    sequence.origin = {
                        type: 'element',
                        element: { sharedId: elementId },
                    }
                }
                updatedSequenceList.push(sequence)
            }

            const updatedAction = { ...action, actions: updatedSequenceList }
            _actions.push(updatedAction)
        } else {
            _actions.push(action)
        }
    }

    return _actions
}

async function getInputInstance(browserName) {
    let instance = new InputInstance()
    await instance.init(browserName)
    return instance
}

module.exports = getInputInstance
