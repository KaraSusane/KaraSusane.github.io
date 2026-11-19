import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {articleSlugFromPath, loadArticleBody} from './data/articleBodies';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

const start = () => {
  if (root.hasAttribute('data-prerendered')) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
};

// On an article page its text must be in memory before React takes over the prerendered HTML.
const slug = articleSlugFromPath(window.location.pathname);
if (slug) loadArticleBody(slug).then(start, start);
else start();
