const currentCategoryLvl = $('#CurrentCategoryLvl').val();
const currentCategoryName = $('#CurrentCategoryName').val();

// initialize Algolia search
const search = instantsearch({
  appId: 'YXBS6XX00Z',
  apiKey: 'be61f2ce1978e6f3b38cd2ed7ce7b6bc',
  indexName: 'PikUpsNewAllProducts',
  searchParameters: {
    hitsPerPage: 30,
    attributesToSnippet: ['Name:10', 'ShortDescription:35'],
    snippetEllipsisText: ' [...]'
  },
  routing: true,
  searchParameters: {
    facetFilters: `ProductCategories.lvl${currentCategoryLvl}:${currentCategoryName}`
  }
});

/**
 * 
 * Widgets
 */
/**/
function addRefinementListWidget(container, attributeName, header) {
  search.addWidget(
    instantsearch.widgets.refinementList({
      container,
      attributeName,
      searchForFacetValues: true,
      autoHideContainer: true,
      limit: 5,
      showMore: true,
      templates: {
        header,
        item(item) {
          return refinementListTemplate(item);
        },
      }
    })
  );
}
/**/

/* Left (Filter Panel) */
// #Categories
search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: '#categories',
    autoHideContainer: true,
    attributes: [
      'ProductCategories.lvl0',
      'ProductCategories.lvl1',
      'ProductCategories.lvl2',
    ],
    templates: {
      header: "Related Categories"
    }
  })
);

// #Brand
addRefinementListWidget('#brands', 'ProductSpecificationAttributes.Product Brand', 'Brands');
// #Color
addRefinementListWidget('#colors', 'ProductAttributes.Color', 'Color');
// #Net Contents
addRefinementListWidget('#net-contents', 'ProductAttributes.Net Contents', 'Net Content');
// #Colours
addRefinementListWidget('#colours', 'ProductSpecificationAttributes.Colour', 'Colour');
// #Country of Origin
addRefinementListWidget('#country-of-origin', 'ProductSpecificationAttributes.Country of Origin', 'Country of Origin');
// #Features
addRefinementListWidget('#features', 'ProductSpecificationAttributes.Features', 'Features');
// #Application
addRefinementListWidget('#application', 'ProductSpecificationAttributes.Function / Application', 'Application');
// #Maturity
addRefinementListWidget('#maturity', 'ProductSpecificationAttributes.Maturity', 'Maturity');
// #Output per hour
addRefinementListWidget('#output-per-hour', 'ProductSpecificationAttributes.Output Per Hour', 'Output per/hour');
// #Product Packaging
addRefinementListWidget('#product-packaging', 'ProductSpecificationAttributes.Product Packaging', 'Product Packaging');
// #Packaging
addRefinementListWidget('#packaging', 'ProductSpecificationAttributes.Packaging', 'Packaging');
// #Packaging Type
addRefinementListWidget('#packaging-type', 'ProductSpecificationAttributes.Packaging Type', 'Packaging Type');
// #Storage Condition
addRefinementListWidget('#storage-condition', 'ProductSpecificationAttributes.Storage Condition', 'Packaging TypeStorage Condition');
// #Vendors
addRefinementListWidget('#vendors', 'VendorName', 'Vendor');
// #Manufacturers
addRefinementListWidget('#manufacturers', 'Manufacturers', 'Manufacturers');


// #Price
search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    autoHideContainer: true,
    attributeName: "ProductPrice.Price",
    min: 0,
    max: 300000,
    templates: {
      header: "Price",
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
search.start();