describe('SettingScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id('StartScreen_SettingsButton')).tap();
    await element(by.id('SettingsScreen_ChangeTtsLanguageButton')).tap();
  });

  it('should show a list of TTS voices', async () => {
    await expect(
      element(by.id('TtsLanguagesScreen_LanguagesList'))
    ).toBeVisible();

    await expect(element(by.id('TtsLanguagesScreen_LanguageItem_0'))).toExist();
    await expect(
      element(
        by
          .id('TtsLanguagesScreen_LanguageItem_Text')
          .withAncestor(by.id('TtsLanguagesScreen_LanguageItem_0'))
      )
    ).toHaveText('Maged (ar-SA)');
  });
});
