
const { Builder, WebElement } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
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
