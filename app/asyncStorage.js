import { AsyncStorage } from 'react-native';

const BASE_STORAGE_KEY = '@ParentSoundboardStore';

export const AVAILABLE_SOUNDS_STORAGE_KEY = `${BASE_STORAGE_KEY}:AVAILABLE_SOUNDS`;

export const storeData = async (data, key) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    throw Error(`Failed setting item ${data} with key ${key}`);
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return Promise.resolve(JSON.parse(value));
    }
  } catch (error) {
    throw Error(`Failed retrieving data from key ${key}`);
  }
};
