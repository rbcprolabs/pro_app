import Rox from 'rox-react-native';
import { roxToken } from 'app/config/api';


export default async setSettings => {
  const flags = {
    depositTurnedOn: new Rox.Flag(),
    colorsVariant: new Rox.Variant('red', ['green', 'blue']),
    useCDN: new Rox.Configuration(true),
  }

  Rox.register('BankerFlags', flags)

  await Rox.setup(roxToken, {
    freeze: Rox.FreezeOptions.freezeOptionNone,
    impressionHandler: (reportingValue, experiment) => {
      console.log('flag impression', reportingValue, experiment);
    }
  });
  
  const color = flags.colorsVariant.getValue();
  const depositTurnedOn = flags.depositTurnedOn.isEnabled();

  console.log('depositTurnedOn ', depositTurnedOn)
  console.log('colorsVariant ', color)
 
  setSettings({
    color,
    depositTurnedOn
  })
}