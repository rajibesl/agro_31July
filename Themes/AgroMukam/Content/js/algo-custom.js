console.log('algo-custom');

// initialize Algolia search
const search = instantsearch({
  appId: 'YXBS6XX00Z',
  apiKey: 'be61f2ce1978e6f3b38cd2ed7ce7b6bc',
  indexName: 'pikUpsAllProducts',
  searchParameters: {
    hitsPerPage: 20,
    attributesToSnippet: ['Name:10', 'ShortDescription:35'],
    snippetEllipsisText: ' [...]'
  },
  routing: true
});

/**
 * 
 * Widgets
 */
/* Left (Filter Panel) */
// #Categories
//search.addWidget(
//  instantsearch.widgets.refinementList({
//    container: "#categories",
//    attributeName: "ProductCategories.lvl0",
//    autoHideContainer: false,
//    templates: {
//      header: "Categories"
//    }
//  })
//);
search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#categories',
    attributes: [
      'ProductCategories.lvl0',
      'ProductCategories.lvl1',
      'ProductCategories.lvl2',
      'ProductCategories.lvl3',
    ],
  })
);

// #Price
search.addWidget(
  instantsearch.widgets.rangeSlider({
    container: "#price",
    autoHideContainer: false,
    attributeName: "ProductPrice.Price",
    templates: {
      header: "Price"
    }
  })
);

/* Right (Results Section) */
// #Stats
search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats",
    templates: {
      body(hit) {
        return `<span role="img" aria-label="emoji">⚡️</span> <strong>${hit.nbHits}</strong> results found ${hit.query != "" ? `for <strong>"${hit.query}"</strong>` : ``
          } in <strong>${hit.processingTimeMS}ms</strong>`;
      }
    }
  })
);
// #Hits (list of products)
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      empty: "No results.",
      item: function (hit) {
        return hitTemplate(hit);
      }
    }
  })
);

// #Pagination
search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

/* Actually Start The Search */
$(document).ready(function () {
  search.start();
});


/* Helpers */
function hitTemplate(hit) {
  console.log('hit', hit);
  return `
    <div class="hit">
      <div class="hit-image">
        <img src="${hit.ProductImages[0]}" />
      </div>
      <div class="hit-content">
        <div>
          <div class="hit-name">${hit.Name}</div>
          <div class="hit-description">${hit.ShortDescription}</div>
        </div>
        <div class="hit-price">$${hit.ProductPrice.Price}</div>
      </div>
    </div>
  `;
}