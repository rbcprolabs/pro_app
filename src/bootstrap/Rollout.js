import Rox from 'rox-react-native';
import { roxToken } from 'app/config/api';
import AsyncStorage from 'app/services/AsyncStorage';


export default async () => {
  const flags = {
    BusketCardShowLead: new Rox.Flag(false),
    BusketCardForceToTop: new Rox.Flag(false),
    ArticlesListShowIndustries: new Rox.Flag(true),
    ArticlesListShowCompanies: new Rox.Flag(true),
    ArticlesListShowTags: new Rox.Flag(false),
    ArticlesListShowFunctions: new Rox.Flag(false),
    ArticlesListShowDataSources: new Rox.Flag(false),
    ArticlesListTermsLimit: new Rox.Configuration(3),
    BusketCardArticlesThreshold: new Rox.Configuration(3),
    BusketCardTermsLimit: new Rox.Configuration(3),
    BusketCardHierarchyLevel: new Rox.Configuration(2),
    RecommendedTagArticlesThreshold: new Rox.Configuration(1)
  }

  Rox.register('Flags', flags)

  await Rox.setup(roxToken, {
    freeze: Rox.FreezeOptions.freezeOptionNone,
    version: '0.0.0',
    impressionHandler: (reportingValue, experiment) => {
      console.log('flag impression', reportingValue, experiment);
    }
  });

  // For variants or configuration
  // flags[name].getValue()
  // For flags 
  // flags[name].isEnabled()

  const result = {
    BusketCardShowLead: flags.BusketCardShowLead.isEnabled(),
    BusketCardForceToTop: flags.BusketCardForceToTop.isEnabled(),
    ArticlesListShowIndustries: flags.ArticlesListShowIndustries.isEnabled(),
    ArticlesListShowCompanies: flags.ArticlesListShowCompanies.isEnabled(),
    ArticlesListShowTags: flags.ArticlesListShowTags.isEnabled(),
    ArticlesListShowFunctions: flags.ArticlesListShowFunctions.isEnabled(),
    ArticlesListShowDataSources: flags.ArticlesListShowDataSources.isEnabled(),
    ArticlesListTermsLimit: flags.BusketCardArticlesThreshold.getValue(),
    BusketCardArticlesThreshold: flags.BusketCardArticlesThreshold.getValue(),
    BusketCardTermsLimit: flags.BusketCardTermsLimit.getValue(),
    BusketCardHierarchyLevel: flags.BusketCardHierarchyLevel.getValue(),
    RecommendedTagArticlesThreshold: flags.RecommendedTagArticlesThreshold.getValue(),
  }

  return result;
}