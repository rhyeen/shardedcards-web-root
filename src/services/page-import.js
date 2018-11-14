import {
  ROOT_ROUTE_PAGE_GAME,
  ROOT_ROUTE_PAGE_404,
} from '../entities/pages.js';

export const importActivePage = (activePage) => {
  switch(activePage) {
    case ROOT_ROUTE_PAGE_GAME:
      import('../../internal_comps/sc_game/src/components/sc-game.js');
      break;
    default:
      activePage = ROOT_ROUTE_PAGE_404;
      import('../components/sc-404.js');
  }
  return activePage;
}
