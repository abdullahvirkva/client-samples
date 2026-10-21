
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('nav.menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () { menu.classList.toggle('open'); });
  }
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-area]'));
  if (cards.length) {
    var areaSel = document.getElementById('f-area');
    var typeSel = document.getElementById('f-type');
    var sizeSel = document.getElementById('f-size');
    var note = document.getElementById('results-note');
    function applyFilters() {
      var area = areaSel ? areaSel.value : 'all';
      var type = typeSel ? typeSel.value : 'all';
      var size = sizeSel ? sizeSel.value : 'all';
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (area === 'all' || c.getAttribute('data-area') === area) &&
                 (type === 'all' || c.getAttribute('data-type') === type) &&
                 (size === 'all' || (c.getAttribute('data-size') || '').split(' ').indexOf(size) !== -1);
        c.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (note) note.textContent = 'Showing ' + shown + ' of ' + cards.length + ' property categories.';
    }
    [areaSel, typeSel, sizeSel].forEach(function (el) { if (el) el.addEventListener('change', applyFilters); });
    var params = new URLSearchParams(window.location.search);
    if (params.get('area') && areaSel) areaSel.value = params.get('area');
    if (params.get('type') && typeSel) typeSel.value = params.get('type');
    if (params.get('size') && sizeSel) sizeSel.value = params.get('size');
    applyFilters();
  }
  var form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('ef-name').value.trim();
      var interest = document.getElementById('ef-interest').value;
      var msg = document.getElementById('ef-msg').value.trim();
      var text = 'Assalam-o-Alaikum, I am ' + name + '. I am interested in: ' + interest + '. ' + msg;
      window.open('https://wa.me/923125380208?text=' + encodeURIComponent(text), '_blank');
    });
  }
})();
