import React, { useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import instantsearch from 'instantsearch.js';
import { searchBox, hits } from 'instantsearch.js/es/widgets';
import { CloseIcon } from './IconComponents.tsx';

// IMPORTANT: These variables must be configured in your Netlify environment.
// The fallback values are for Algolia's public demo and will not search your own data.
const VITE_ALGOLIA_APP_ID = process.env.VITE_ALGOLIA_APP_ID || 'latency';
const VITE_ALGOLIA_SEARCH_KEY = process.env.VITE_ALGOLIA_SEARCH_KEY || '6be0576ff61c053d5f9a3225e2a90f76';

const searchClient = algoliasearch(
  VITE_ALGOLIA_APP_ID,
  VITE_ALGOLIA_SEARCH_KEY
);

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const searchInstanceRef = useRef<any>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && searchContainerRef.current && !searchInstanceRef.current) {
      const search = instantsearch({
        indexName: 'vickyluxgems_netlify_main',
        searchClient,
      });

      search.addWidgets([
        searchBox({
          container: '#searchbox',
          placeholder: 'Search for amber, rubies, prayer beads...',
          showSubmit: false,
          showReset: true,
          autofocus: true,
          cssClasses: {
            root: 'w-full relative',
            input: 'w-full py-4 pl-6 pr-12 text-2xl bg-transparent border-0 focus:ring-0 text-[var(--c-text-primary)] placeholder:text-[var(--c-text-secondary)]',
            reset: 'absolute top-1/2 -translate-y-1/2 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-primary)]',
            loadingIndicator: 'absolute top-1/2 -translate-y-1/2 right-12 animate-spin',
          },
        }),
        hits({
          container: '#search-hits-container',
          templates: {
            item(hit, { html, components }) {
              const url = `/#/collection/${hit.objectID}`;
              return html`
                <a href="${url}" class="hit-item" onClick=${() => onClose()}>
                  <img src="${hit.media.mainImageUrl}" alt="${hit.name}" class="hit-image" />
                  <div class="hit-content">
                    <h4 class="hit-title">${components.Highlight({ attribute: 'name', hit })}</h4>
                    <p class="hit-description">${components.Snippet({ attribute: 'story', hit })}</p>
                  </div>
                </a>
              `;
            },
            empty(results, { html }) {
              return html`<div class="search-no-results">No results found for <q>${results.query}</q>.</div>`;
            }
          },
          cssClasses: {
            list: 'space-y-2',
            item: 'bg-transparent',
          }
        }),
      ]);

      search.start();
      searchInstanceRef.current = search;

      // Focus the input after a short delay to ensure it's rendered
      setTimeout(() => {
        const inputEl = searchContainerRef.current?.querySelector('.ais-SearchBox-input') as HTMLInputElement;
        inputEl?.focus();
      }, 100);
    }
  }, [isOpen, onClose]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (searchInstanceRef.current) {
        searchInstanceRef.current.dispose();
        searchInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      id="search-overlay" 
      className={isOpen ? 'visible' : ''}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-title"
    >
      <div 
        className="search-panel" 
        onClick={e => e.stopPropagation()} 
        ref={searchContainerRef}
      >
        <div className="search-header">
          <h2 id="search-title" className="search-title">Search Our Collection</h2>
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="search-body">
          <div id="searchbox"></div>
          <div id="search-hits-container" className="search-hits-container"></div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;