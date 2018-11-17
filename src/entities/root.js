export const routes = {
  pages: {
    game: 'ROUTE_PAGE_GAME',
    notFound: 'ROUTE_PAGE_404'
  },
  endpoints: {
    game: 'game'
  }
};

export const DEFAULT_PATH = routes.endpoints.game;

export const getPageFromPath = (path) => {
  const endpoint = _getEndpoint(path);
  return _getPageFromEndpoint(endpoint);
}

function _getEndpoint(path) {
  return !path || path === '/' ? DEFAULT_PATH : path.slice(1);
}

function _getPageFromEndpoint(endpoint) {
  switch(endpoint) {
    case routes.endpoints.game:
      return routes.pages.game;
    default:
      return routes.pages.notFound;
  }
};