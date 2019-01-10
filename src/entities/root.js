export const ROUTES = {
  PAGES: {
    GAME: 'ROUTE_PAGE_GAME',
    NOT_FOUND: 'ROUTE_PAGE_404'
  },
  ENDPOINTS: {
    GAME: 'game'
  }
};

export const DEFAULT_PATH = ROUTES.ENDPOINTS.GAME;

export const getPageFromPath = (path) => {
  const endpoint = _getEndpoint(path);
  return _getPageFromEndpoint(endpoint);
}

function _getEndpoint(path) {
  return !path || path === '/' ? DEFAULT_PATH : path.slice(1);
}

function _getPageFromEndpoint(endpoint) {
  switch (endpoint) {
    case ROUTES.ENDPOINTS.GAME:
      return ROUTES.PAGES.GAME;
    default:
      return ROUTES.PAGES.NOT_FOUND;
  }
};