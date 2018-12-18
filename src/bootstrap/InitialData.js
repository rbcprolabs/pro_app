import Rollout from 'app/bootstrap/Rollout';
import AsyncStorage from 'app/services/AsyncStorage';

export default async (key, set) => {
  let data;

  if ((data = await AsyncStorage.get(key))) {
    set(data)
  }
}