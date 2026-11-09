const app = require('../backend/app');

// Vercel rewrites /api/* here. Depending on the platform's routing behaviour the
// original sub-path can arrive as a query capture, so restore it before Express
// routes the request.
function normalizeUrl(req) {
  const original = req.url || '/api';
  const queryIndex = original.indexOf('?');
  const pathname = queryIndex === -1 ? original : original.slice(0, queryIndex);
  const search = queryIndex === -1 ? '' : original.slice(queryIndex + 1);

  if (!search) return;

  const params = new URLSearchParams(search);
  const rest = params.get('__path');

  if (rest === null) return;

  params.delete('__path');
  const remaining = params.toString();
  const subPath = rest.replace(/^\/+/, '');

  req.url = `/api${subPath ? `/${subPath}` : ''}${remaining ? `?${remaining}` : ''}`;
}

module.exports = (req, res) => {
  normalizeUrl(req);
  return app(req, res);
};
