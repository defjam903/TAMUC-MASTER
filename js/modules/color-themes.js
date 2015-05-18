$(function () {
    var colorThemesCss = {
        default: 'main-default',
        cyan: 'main-cyan',
        green: 'main-green',
        red: 'main-red',
        yellow: 'main-yellow',
        blue: 'main-blue'
    };

    var $colorItems = $('.color-themes > li');


    var COOKIE_THEME = 'color-theme';
    var curCookieTheme = getCookie(COOKIE_THEME);
    if (curCookieTheme) {
        var $colorThemePreloader = $('.color-theme-preloader');
        if($colorThemePreloader.length){  //replace img for logo(preload v1)
            var newSrc = replaceSrcForImg(curCookieTheme, $colorThemePreloader.attr('src'));
            var tempImg = new Image();
            tempImg.src = newSrc;
            tempImg.onload = function(){
                $colorThemePreloader.attr('src', newSrc).css('visibility', 'visible');
            };
        }
        setTheme(curCookieTheme);
        replaceMarkerForMaps(curCookieTheme);
        replaceImages(curCookieTheme);
        setActiveItem(curCookieTheme);
    }
    else {
        pageShow();
    }

    function setActiveItem(theme) {
        $colorItems.removeClass('is-active');
        $colorItems.each(function () {
            if ($(this).data('color') === theme) {
                $(this).addClass('is-active');
            }
        });
    }

    function setTheme(theme) {
        var $linkTheme = $('link[data-themecolor]'),
            curTheme = $linkTheme.data('themecolor'),
            attrEl = $linkTheme.attr('href');
        if (curTheme === theme) {
            return;
        }
        attrEl = attrEl.replace(colorThemesCss[curTheme] + '.css', colorThemesCss[theme] + '.css');
        $linkTheme.data('themecolor', theme);
        $linkTheme.attr('href', attrEl);
        setCookie(COOKIE_THEME, theme);
    }

    function replaceSrcForImg(theme, src) {
        var curSrc = src.split('.');
        var srcUpd = curSrc[curSrc.length - 2].split('-');
        if (srcUpd[srcUpd.length - 1] === theme) {
            return src;
        }
        srcUpd[srcUpd.length - 1] = theme;
        srcUpd = srcUpd.join('-');
        curSrc[curSrc.length - 2] = srcUpd;
        return curSrc.join('.');
    }

    function replaceImages(theme) {
        var $imgTheme = $('.color-theme'),
            imgThemeNum = $imgTheme.length,
            countImg = 0;
        $imgTheme.each(function () {
            var img = new Image();
            var newSrc = replaceSrcForImg(theme, $(this).attr('src'));
            if (!newSrc) {
                countImg++;
                return;
            }
            $(this).attr('src', newSrc);
            img.src = newSrc;
            img.onload = function () {
                countImg++;
                if (countImg === imgThemeNum) {
                    pageShow();
                }
            };
        });
    }

    function replaceMarkerForMaps(theme) {
        var $map = $('.b-google-map.map-theme');
        if ($map.length > 0) {

            var newSrc = replaceSrcForImg(theme, $('.marker-template').attr('src'));
            if (!newSrc) {
                return;
            }
            $('.marker-template').attr('src', newSrc);
            $map.trigger('replace_marker');
        }
        $('.color-theme').each(function () {
            var curSrc = $(this).attr('src').split('.');
            var srcUpd = curSrc[curSrc.length - 2].split('-');
            var srcNewTheme;
            if (srcUpd[srcUpd.length - 1] === theme) {
                return;
            }
            srcUpd[srcUpd.length - 1] = theme;
            srcUpd = srcUpd.join('-');
            curSrc[curSrc.length - 2] = srcUpd;
            srcNewTheme = curSrc.join('.');
            $(this).attr('src', srcNewTheme);

        });
    }



    $colorItems.on('click', function () {
        $colorItems.removeClass('is-active');
        $(this).addClass('is-active');
        var curElement = $(this).data('color');
        setTheme(curElement); //replacement of color elements
        replaceMarkerForMaps(curElement);
        replaceImages(curElement);//replacement pictures for style
    });

    $('[data-reset]').on('resetColors', function () {
        setTheme('default');
        replaceMarkerForMaps('default');
        replaceImages('default');
        setCookie(COOKIE_THEME, 'default');
        setActiveItem('default');
    });

    function pageShow() {
        setTimeout(function () {
            $('.mask-l').animate({'opacity': 0}, 800, function(){
                $(this).css('display', 'none');

            });
        }, 400);
    }
});