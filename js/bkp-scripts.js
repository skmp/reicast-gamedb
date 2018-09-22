var log = console.log.bind(console);
var inf = console.info.bind(console);


var GAMEDB = GAMEDB || {};

// Video Player on click
//$('body').on('click', '.video-placeholder', function(e) {
//    console.log(e);
//    $target = $(this);
//    $target.replaceWith('<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/' + $target.attr('data-yt') + '?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>');
//});
//
//// Populate issue links
//$.get("https://api.github.com/repos/reicast/gamedb/issues").done(function (issues) {
//    $.each(issues, function (index, issue) {
//        $.each(issue.labels, function (index, label) {
//            if (label.name.startsWith("🎮 ")) {
//                $("a[href='" + label.name.replace("🎮 ", "/games/") + "']").after("<a href='" + issue.html_url + "' title='" + issue.title + "'>#" + issue.number + "</a> ")
//            }
//        });
//    });
//});

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
        inView = elemTop >= viewTop && elemTop <= viewBottom;
        inf(inView, elem.querySelector('a').textContent.replace(/\r?\n|\r| +/g, ' ').trim());
        return inView;
    };

    return {
        isElemInView: isElemInView
    };
})();


GAMEDB.videoThumbnail = (function () {

    /**
     * Adds video thumbnails to all games in the page.
     *
     * @param HMTLElement elem
     *  The parent element that contains the entire game box.
     *
     * @return void
     */
    var addThumbnail = function addThumbnail (elem) {
        $(elem).attr('src', $(elem).data('src'));
        $(elem).addClass('loaded');
        $(elem).removeClass('loading');
    };


    /**
     * Iterate over given elements and add thumbnails to their video placeholder.
     *
     * @param NODEList elems
     * @param string imageType
     */
    var addThumbnails = function addThumbnails (elems) {
        elems.map(function (elem) {
            addThumbnail(elem);
        });
    };


    var watchPageScroll = function watchPageScroll () {
        var isScrolling = false;
        var lastScrollPos = 0;
        var intervalId;
        var elems = Array.prototype.slice.call(document.querySelectorAll('.post-list .load-lazy:not(.loading):not(.loaded)'));

        window.addEventListener('scroll', function (evt) {
            isScrolling = true;

            setTimeout(function () {
                if (window.scrollY > lastScrollPos) {
                    isScrolling = false;
                    lastScrollPos = window.scrollY;
                    for (var i = 0; i < elems.length; ++i) {
                        if (!GAMEDB.utils.isElemInView(elems[i])) break;
                        $(elems[i]).addClass('loading');
                        addThumbnail(elems[i], '0');
                        elems.splice(i, 1);
                    }
                };
            }, 400);
        }, false);
    };

    return {
        addThumbnails: addThumbnails,
        watchPageScroll: watchPageScroll
    };
})();

GAMEDB.videoThumbnail.addThumbnails(
    Array.prototype.slice.call(document.querySelectorAll('.post-list .load-eager')),
    '0'
);

GAMEDB.videoThumbnail.watchPageScroll();

