import { space, accessToken } from 'app/config/api';
import { createClient } from 'contentful/dist/contentful.browser.min.js';

export default () =>
  createClient({
    space: space,
    accessToken: accessToken
  })
