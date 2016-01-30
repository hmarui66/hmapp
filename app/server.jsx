import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router'
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import routes from 'routes.jsx';
import configureStore from 'store/configureStore';
import headconfig from 'elements/Header';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

function renderFullPage(renderedContent, initialState, head={
  title: 'Spending my free time',
  meta: '<meta name="viewport" content="width=device-width, initial-scale=1" />',
  link: '<link rel="stylesheet" href="/assets/styles/main.css"/>'
}) {
  return `
  <!doctype html>
    <html lang="">

    <head>
        ${head.title}

        ${head.meta}

        ${head.link}
    </head>

    <div id="app">${renderedContent}</div>

    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
    </body>
    </html>

  `;
}

export default function render(req, res) {
  const authenticated = req.isAuthenticated();

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    const requireAuthComponents = renderProps.components.filter(component => component.redirectPathForLogin);

    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (!authenticated && requireAuthComponents.length > 0) {
      res.redirect(302, requireAuthComponents[0].redirectPathForLogin());
    } else if (renderProps) {
      const store = configureStore({ user: { authenticated } });

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch: store.dispatch,
        context: req
      };

      const components = renderProps.components.filter(component => component.fetchData);

      Promise.all(components.map(component => component.fetchData(locals))).then(() => {
        const initialState = store.getState();
        const renderedContent = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>);
        const renderedPage = renderFullPage(renderedContent, initialState, {
          title: headconfig.title,
          meta: headconfig.meta,
          link: headconfig.link
        });
        res.status(200).send(renderedPage);
      }).catch(error => {
        res.status(500).send(error.message);
      })

    } else {
      res.status(404).send('Not Found');
    }

  });
};
