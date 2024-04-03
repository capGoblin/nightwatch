
describe('Ecosia.org Demo', function () {
  before(browser => browser.navigateTo('https://www.ecosia.org/'));

  it('Demo test ecosia.org', async function (browser) {
    browser
      .element('.search-form__input')
      .setValue(['nightwatch', browser.Keys.ENTER])

  });
});

