/**
 * Base structure derived from: 
 * https://github.com/redux-saga/redux-saga/blob/master/examples/real-world/actions/index.js
 */
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`
		return acc
	}, {})
}

function action(type, payload = {}) {
  return {type, ...payload}
}

export const UPDATE_ACTIVE_PAGE = createRequestTypes('UPDATE_ACTIVE_PAGE');
export const updateActivePage = {
  request: (activePage) => action(UPDATE_ACTIVE_PAGE.REQUEST, {activePage}),
  success: (activePage) => action(UPDATE_ACTIVE_PAGE.SUCCESS, {activePage})
};

export const NAVIGATE =  'NAVIGATE';
export const navigate = path => action(NAVIGATE, {path});
