import { Http } from '../../../../../sc_shared/src/services/http.js';

export const getPlayerStatus = () => {
  return Http.get('status/player');
}
