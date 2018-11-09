import AsincStorage from 'app/services/AsincStorage';

export default async (key, set) => {
  let data;
  
  if ((data = await AsincStorage.get(key))) {
    set(data)
  }
}