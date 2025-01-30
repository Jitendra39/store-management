import { PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';

const filePath = `${RNFS.DocumentDirectoryPath}/data.json`;
console.log('filePath:', filePath);

export const saveData = async (data) => {
  try {
    await RNFS.writeFile(filePath, JSON.stringify(data), 'utf8');
    console.log('Data saved successfully');
  } catch (error) {
    console.error(error);
  }
};

export const loadData = async () => {
  try {
    const data = await RNFS.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const requestStoragePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to save data.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
};