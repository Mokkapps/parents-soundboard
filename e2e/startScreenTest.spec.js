describe('StartScreen', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have show sound list and an ad banner', async () => {
    await expect(element(by.id('StartScreen_SoundList'))).toBeVisible();
    await expect(element(by.id('StartScreen_AdBanner'))).toBeVisible();
  });

  it('should show settings screen after tapping settings button', async () => {
    await element(by.id('StartScreen_SettingsButton')).tap();
    await expect(element(by.id('SettingsScreen_Container'))).toBeVisible();
  });

  it('should show default sounds', async () => {
    await expect(element(by.id('StartScreen_SoundListItem_0'))).toExist();
    await expect(
      element(
        by
          .id('StartScreen_SoundListItem_0_Text')
          .withAncestor(by.id('StartScreen_SoundListItem_0'))
      )
    ).toExist();
    await expect(
      element(
        by
          .id('StartScreen_SoundListItem_0_RemoveButton')
          .withAncestor(by.id('StartScreen_SoundListItem_0'))
      )
    ).toNotExist();
    await expect(
      element(
        by
          .id('StartScreen_SoundListItem_0_TextInput')
          .withAncestor(by.id('StartScreen_SoundListItem_0'))
      )
    ).toNotExist();

    await expect(element(by.id('StartScreen_SoundListItem_4'))).toNotExist();
  });

  // FIXME: Test disabled as playing TTS causes errors in Detox...

  // it('should show mute button if sound is played', async () => {
  //   await element(by.id('StartScreen_SoundListItem_0')).tap();
  //   await expect(element(by.id('StartScreen_MuteButton'))).toBeVisible();
  // });

  it('should add new sound in edit mode', async () => {
    await element(by.id('StartScreen_EditModeButton')).tap();
    await expect(
      element(by.id('StartScreen_EditModeDescriptionText'))
    ).toBeVisible();

    // Add new sound
    await element(by.id('StartScreen_AddSoundButton')).tap();

    // Expect new sound to be visible
    await expect(element(by.id('StartScreen_SoundListItem_4'))).toExist();
    await expect(
      element(
        by
          .id('StartScreen_SoundListItem_4_RemoveButton')
          .withAncestor(by.id('StartScreen_SoundListItem_4'))
      )
    ).toExist();
    await expect(
      element(
        by
          .id('StartScreen_SoundListItem_4_TextInput')
          .withAncestor(by.id('StartScreen_SoundListItem_4'))
      )
    ).toHaveText('New text');
  });
});
