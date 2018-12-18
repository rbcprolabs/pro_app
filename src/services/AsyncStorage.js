import { AsyncStorage } from "react-native"

export default {
    set(key, data) {
        // AsyncStorage.getAllKeys().then(res => {
        //     console.log('keys ', res)
        // });
        return AsyncStorage.setItem(key, JSON.stringify(data));
    },

    async get(key) {
        return JSON.parse(await AsyncStorage.getItem(key));
    },
    async multiGet(keys) {
        return JSON.parse(await AsyncStorage.multiGet(keys));
    },
    clear() {
        console.log('clear asinc')
        return AsyncStorage.clear()
    },

    removeItem(key) {
        console.log('remove item asinc')
        return AsyncStorage.removeItem(key)
    }
}