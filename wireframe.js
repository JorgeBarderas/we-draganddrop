  var msie = /*@cc_on!@*/0;

  var links = document.querySelectorAll('[draggable="true"]'), el = null;
  for (var i = 0; i < links.length; i++) {
    el = links[i];

    el.addEventListener('dragstart', function (e) {
      e.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      e.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
    });
  }

  var panel = document.querySelector('.wf-container');

  panel.addEventListener('dragover', function (e) {
    if (e.preventDefault) e.preventDefault(); // allows us to drop
    this.className = 'wf-container-over';
    e.dataTransfer.dropEffect = 'copy';
    return false;
  });

  // to get IE to work
  panel.addEventListener('dragenter', function (e) {
    this.className = 'wf-container-over';
    return false;
  });

  panel.addEventListener('dragleave', function () {
    this.className = 'wf-container';
  });

  panel.addEventListener('drop', function (e) {
    if (e.stopPropagation) e.stopPropagation(); // stops the browser from redirecting...why???
    var el = document.getElementById(e.dataTransfer.getData('Text'));
    
    el.parentNode.removeChild(el);

    // stupid nom text + fade effect
    panel.className = 'wf-container';
    panel.appendChild(el);

    return false;
  });
