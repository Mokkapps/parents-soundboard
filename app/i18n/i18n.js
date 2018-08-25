import I18n, { getLanguages } from 'react-native-i18n';

import en from './en';
import de from './de';

I18n.fallbacks = true;

I18n.translations = {
  en,
  de
};

getLanguages().then(languages => {
  console.log('Preferred Languages', languages);
});

export default I18n;
