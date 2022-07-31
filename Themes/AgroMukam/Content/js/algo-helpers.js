/* Helpers */
function hitTemplate(hit) {
  return `
    <div class="hit bg-white cursor-pointer" onclick="setLocation('${hit.SeName}')">
      <div class="hit-image d-flex justify-content-center">
        <img src="${hit.ProductImages[0]}" />
      </div>
      <div class="hit-content p-2">
        <div>
          <div class="hit-name mb-2">${hit.Name.substr(0, 36) + (hit.Name.length >= 36 ? '...' : '')}</div>
        </div>
        <div class="hit-price">
          <div class="current-price text-light-green">৳${hit.ProductPrice.Price}</div>
          <div class="old-price text-muted">
            ${hit.ProductPrice.OldPrice > 0 ? `<del class="text-muted">৳${hit.ProductPrice.OldPrice}</del>` : ''}
          </div>
        </div>
        <div class="hit-reviews">
          <i class="${hit.Reviews.Average > 1 ? 'fas text-warning' : 'far'} fa-star"></i>
          <i class="${hit.Reviews.Average > 2 ? 'fas text-warning' : 'far'}  fa-star"></i>
          <i class="${hit.Reviews.Average > 3 ? 'fas text-warning' : 'far'}  fa-star"></i>
          <i class="${hit.Reviews.Average > 4 ? 'fas text-warning' : 'far'}  fa-star"></i>
          <i class="${hit.Reviews.Average > 5 ? 'fas text-warning' : 'far'}  fa-star"></i>
        </div>
      </div>
    </div>
  `;
}

function refinementListTemplate(item) {
  const { url, label, count, isRefined } = item;
  return `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" ${isRefined ? 'checked' : ''}>
      <label class="form-check-label d-flex flex-row" for="defaultCheck1">
        <div class="d-flex flex-fill">
          ${label.substr(0, 32) + (label.length >= 32 ? '...' : '')}
        </div>
        <div class="d-flex ais-refinement-list--count justify-content-center align-items-center">
          ${count}
        </div>
      </label>
    </div>
  `;
}

//
$(document).ready(function () {

  $(document).on('click', '.as-filter-toggler button', function () {
    $('.as-sidebar').toggleClass('active');
  });

});