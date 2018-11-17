// Per Redux best practices, the data in our store is structured
// for efficiency (small size and fast updates).
//
// The _selectors_ below transform store data into specific forms that
// are tailored for presentation. Putting this logic here keeps the
// layers of our app loosely coupled and easier to maintain, since
// views don't need to know about the store's internal data structures.
//
// We use a tiny library called `reselect` to create efficient
// selectors. More info: https://github.com/reduxjs/reselect.
import { createSelector } from 'reselect';

const routeSelector = state => state.root.route;

export const getActivePage = createSelector(
  routeSelector,
  (route) => {
    return route.activePage;
  }
);
