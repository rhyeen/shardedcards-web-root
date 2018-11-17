import {
  routes
} from '../entities/root.js';

export const importActivePage = (activePage) => {
  switch(activePage) {
    case routes.pages.game:
      import('../../internal_comps/sc_game/src/components/sc-game.js');
      break;
    default:
      activePage = routes.pages.notFound;
      import('../components/sc-404.js');
  }
  return activePage;
}
