var log = console.log.bind(console);
var inf = console.info.bind(console);

var GAMEDB = GAMEDB || {};

(function (OBJ) {
  var head = document.querySelector('head');
  OBJ._baseurl = head.getAttribute('data-baseurl');
  OBJ._version_css = head.getAttribute('data-version-css');
  OBJ._version_js = head.getAttribute('data-versioin-js');
})(GAMEDB);

// Populate issue links
$.get("https://api.github.com/repos/reicast/gamedb/issues").done(function (issues) {
  $.each(issues, function (index, issue) {
    $.each(issue.labels, function (index, label) {
      if (label.name.startsWith("🎮 ")) {
        $("a[href='" + label.name.replace("🎮 ", "/games/") + "']")
          .after("<a href='" + issue.html_url + "' title='" + issue.title + "'>#" + issue.number + "</a> ");
      }
    });
  });
});


GAMEDB.utils = (function () {

  /**
   * Produce true if element has been scrolled to.
   *
   * Even if the scroll has gone past it, produce true. We just
   * don't produce true if the element has never crossed the
   * viewing area.
   *
   * @param HTMLElement elem
   * @return boolean
   */
  var isElemInView = function isElemInView(elem) {
    var inView;
    var viewTop = window.scrollY;
    var viewBottom = window.innerHeight + viewTop;
    var elemTop = elem.offsetTop;
    var elemBottom = elem.clientHeight + elemTop;
    inView = elemTop >= viewTop && elemTop + 50 <= viewBottom;
    return inView;
  };

  return {
    isElemInView: isElemInView
  };
})();


GAMEDB.thumbnail = (function () {

  /**
   * @var Array elems
   *
   * List of elements to lazy-load images.
   */
  var elems;

  /**
   * Adds video thumbnail to a game.
   *
   * @param HMTLElement elem
   *  The parent element that contains the entire game box.
   *
   * @param Function callback
   *  Used to remove the element from the array of elements so
   *  we avoid trying to handle it again unnecessarily.
   *
   * @return void
   */
  var addThumbnail = function addThumbnail (elem, callback) {
    // Avoid TypeError if that element already has the video (the user has
    // already clicked the play button) instead of the placeholder.
    if (!elem) return;

    var img = new Image(),
      src = elem.getAttribute('data-src');

    img.onload = function () {
      if (elem.parent) {
        elem.parent.replaceChild(img, elem);
      } else {
        elem.src = src;
      }

      callback ? callback() : null;
    };

    img.src = src;
  };

  elems = Array.prototype.slice.call(document.querySelectorAll('.post-list .lazy'));

  /**
   * Invokes the addThumbnail for images that enter the viewport.
   */
  var load = function load () {
    for (var i = 0; i < elems.length; ++i) {
      if (GAMEDB.utils.isElemInView(elems[i])) {
        addThumbnail(elems[i].querySelector('img'), function () {
          elems.splice(i, i);
        });
      }
    }
  };

  var watchPageScroll = function watchPageScroll () {
    window.addEventListener('scroll', load, false);
  };

  return {
    load: load
  };
})();

GAMEDB.video = (function () {
  var onClickPlay = function onClickPlay () {
    var $games = $('.post-list .game'),
      $box,
      videoId;

    $games.on('click', function (evt) {
      videoId = this.getAttribute('data-yt');
      $placeholder = $(this).find('.video-placeholder');
      $placeholder.html('<iframe class="video-player" width="100%" src="https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0&autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
    });
  }

  return {
    onClickPlay: onClickPlay
  };
})();

// Bootstrap everything video thumbnail and player stuff.
GAMEDB.thumbnail.load();
addEventListener('scroll', GAMEDB.thumbnail.load, false);
GAMEDB.video.onClickPlay();

// Theme toggler.
(function () {
  var btnToggle,
    styleTag;

  btnToggle = document.querySelector('#btn-theme-toggler');
  styleTag = document.querySelector('#theme-stylesheet');

  /**
   * Sets the style theme on the page.
   *
   * @param HTMLLinkElement tag
   * @param string theme
   */
  var setTheme = function setTheme (styleTag, checkbox, theme) {
    theme = theme || 'light';
    var cssFile = GAMEDB._baseurl + '/assets/theme-' + theme + '.css?v=' + GAMEDB._version_css;
    styleTag.setAttribute('data-current-theme', theme);
    styleTag.setAttribute('href', cssFile);
    checkbox.checked = theme === 'dark';
    localStorage.setItem('theme', theme);
  };

  // Sets the theme as the page first loads.
  setTheme(styleTag, btnToggle, localStorage.getItem('theme'));

  btnToggle.addEventListener('click', function (evt) {
    var currentTheme,
      nextTheme;

    currentTheme = styleTag.getAttribute('data-current-theme');
    nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(styleTag, btnToggle, nextTheme);
  }, false);
})();

// vim:set foldmethod=syntax:

