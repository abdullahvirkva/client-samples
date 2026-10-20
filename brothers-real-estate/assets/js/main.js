// Brothers Real Estate Advisors — sample site interactions
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () { menu.classList.toggle('open'); });
  }

  // Listings filter (listings page)
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-area]'));
  if (cards.length) {
    var areaSel = document.getElementById('f-area');
    var typeSel = document.getElementById('f-type');
    var budgetSel = document.getElementById('f-budget');
    var note = document.getElementById('results-note');
    var chips = document.querySelectorAll('.chip');

    function applyFilters() {
      var area = areaSel ? areaSel.value : 'all';
      var type = typeSel ? typeSel.value : 'all';
      var budget = budgetSel ? parseFloat(budgetSel.value) : Infinity;
      var shown = 0;
      cards.forEach(function (c) {
        var okArea = area === 'all' || c.getAttribute('data-area') === area;
        var okType = type === 'all' || c.getAttribute('data-type') === type;
        var price = parseFloat(c.getAttribute('data-price'));
        var okBudget = isNaN(budget) || budget === Infinity || price <= budget;
        var show = okArea && okType && okBudget;
        c.style.display = show ? '' : 'none';
        if (show) shown++;
      });
      if (note) note.textContent = 'Showing ' + shown + ' of ' + cards.length + ' sample properties.';
    }
    [areaSel, typeSel, budgetSel].forEach(function (el) {
      if (el) el.addEventListener('change', applyFilters);
    });
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        if (typeSel) { typeSel.value = chip.getAttribute('data-type-filter'); applyFilters(); }
      });
    });

    // Honour query params coming from the home-page search bar
    var params = new URLSearchParams(window.location.search);
    if (params.get('area') && areaSel) areaSel.value = params.get('area');
    if (params.get('type') && typeSel) typeSel.value = params.get('type');
    if (params.get('budget') && budgetSel) budgetSel.value = params.get('budget');
    applyFilters();
  }

  // Contact form -> opens WhatsApp with a pre-filled enquiry (sample behaviour)
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('ef-name').value.trim();
      var interest = document.getElementById('ef-interest').value;
      var msg = document.getElementById('ef-msg').value.trim();
      var text = 'Assalam-o-Alaikum, I am ' + name + '. I am interested in: ' + interest + '. ' + msg;
      window.open('https://wa.me/923315100506?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
