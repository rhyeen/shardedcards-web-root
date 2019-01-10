import { ROUTES } from '../entities/root.js';

export const importActivePage = (activePage) => {
  switch (activePage) {
    case ROUTES.PAGES.GAME:
      import('../../internal_comps/sc_game/src/components/sc-game.js');
      break;
    default:
      activePage = ROUTES.PAGES.NOT_FOUND;
      break;
      // don't need to import, sc-root already does that.
  }
  return activePage;
}
