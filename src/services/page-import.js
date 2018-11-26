import { ROUTES } from '../entities/root.js';

export const importActivePage = (activePage) => {
  switch(activePage) {
    case ROUTES.PAGES.GAME:
      import('../../internal_comps/sc_game/src/components/sc-game.js');
      break;
    default:
      activePage = ROUTES.PAGES.NOT_FOUND;
      import('../components/sc-404.js');
  }
  return activePage;
}
