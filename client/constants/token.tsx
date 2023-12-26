import * as SecureStore from "expo-secure-store";

// Used for storing the token in the device's secure storage for authentications
export const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      console.log({ error });
      return;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.log({ error });
      return;
    }
  },
};
