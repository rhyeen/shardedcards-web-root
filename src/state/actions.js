const COMPONENT_TAG = 'ROOT';

/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/_actions/index.js
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function _createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${COMPONENT_TAG}_${base}_${type}`;
		return acc;
	}, {})
}

function _createRequestRaw(base) {
  return `${COMPONENT_TAG}_${base}`;
}

function _action(type, payload = {}) {
  return {type, ...payload};
}

export const UPDATE_ACTIVE_PAGE = _createRequestTypes('UPDATE_ACTIVE_PAGE');
export const updateActivePage = {
  request: (activePage) => _action(UPDATE_ACTIVE_PAGE.REQUEST, {activePage}),
  success: (activePage) => _action(UPDATE_ACTIVE_PAGE.SUCCESS, {activePage})
};

export const NAVIGATE =  _createRequestRaw('NAVIGATE');
export const navigate = path => _action(NAVIGATE, {path});
