import { version } from '../package.json';

describe('SettingScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('StartScreen_SettingsButton')).tap();
  });

  it('should show some controls', async () => {
    await expect(element(by.id('SettingsScreen_CheckTtsButton'))).toBeVisible();
    await expect(
      element(by.id('SettingsScreen_ChangeTtsLanguageButton'))
    ).toBeVisible();
    await expect(element(by.id('SettingsScreen_RateAppButton'))).toBeVisible();
    await expect(
      element(by.id('SettingsScreen_ContactUsButton'))
    ).toBeVisible();
    await expect(element(by.id('SettingsScreen_VersionNumber'))).toBeVisible();
    await expect(element(by.id('SettingsScreen_VersionNumber'))).toHaveText(
      `Version ${version}`
    );
  });
});
