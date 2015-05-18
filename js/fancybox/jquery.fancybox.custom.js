jQuery(function ($) {

    // Navigation object
    var btnsTpl = {
        next: '<div class="fancybox-wrap-popup-next"><svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 37 72" xmlns="http://www.w3.org/2000/svg"><g><polygon points="37.569,36.279 3.066,-0.001 1.749,1.249 34.939,36.149 0.431,70.793 1.764,72.001 36.179,37.452 36.252,37.529"/></g></svg></div>', // Navigation buttons Next
        prev: '<div class="fancybox-wrap-popup-prev"><svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 37 72" mlns="http://www.w3.org/2000/svg"><g><polygon points="1.748,37.529 1.82,37.452 36.235,72.001 37.568,70.793 3.061,36.149 36.251,1.249 34.934,-0.001 0.432,36.279"/></g></svg></div>', // Navigation buttons Prev
        closeBtn: '<div class="fancybox-wrap-popup-close"><svg preserveAspectRatio="xMinYMin meet" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><g><polygon points="23,0.717 22.283,0 11.5,10.783 0.716,0 0,0.717 10.783,11.5 0,22.283 0.716,23 11.5,12.216 22.283,23 23,22.283 12.216,11.5"/></g></svg></div>' // Navigation buttons Close
    };

    var navigationInit = false,
        modalMargin = 100,
        modalMarginUpdate;

    function setMargin() {
        if ($(window).width() > (BREAK.LG)) {
            modalMarginUpdate = 100;
        } else if ($(window).width() > (BREAK.SM)) {
            modalMarginUpdate = 74;
        } else if ($(window).width() >= (BREAK.MN_L)) {
            modalMarginUpdate = 65;
        } else {
            modalMarginUpdate = 40;
        }

        if (modalMargin !== modalMarginUpdate) {
            modalMargin = modalMarginUpdate;
        }
    }

    var fancyboxCustom = {
        navigation: false,
        init: function ($container) {
            setMargin();
            this.initFancybox($container);
        },
        initFancybox: (function () {
            return function ($container) {
                $container.fancybox({
                    openEffect: 'elastic',
                    closeEffect: 'elastic',
                    maxWidth: 1220,
                    maxHeight: 680,
                    autoSize: true,
                    minWidth: 190,
                    margin: modalMargin,
                    padding: 0,
                    aspectRatio: true,
                    tpl: {
                        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-wrap-popup fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>'
                    },
                    helpers: {
                        title: {
                            type: 'inside'
                        }
                    },
                    afterLoad: function () {
                        this.title = '<span class="fancybox-counter">' + (this.index + 1) + ' of ' + this.group.length + '</span>' + (this.title ? '<span class="fancybox-title-text">' + this.title + '</span>' : '');

                        var $wrapper = $('.fancybox-overlay');
                        if (!navigationInit) {
                            $wrapper.append(btnsTpl.next).append(btnsTpl.prev).append(btnsTpl.closeBtn);
                            navigationInit = true;
                        }

                        // Callback
                        $('.fancybox-wrap-popup-close').on('click', function () {
                            $.fancybox.close();
                            return false;
                        });
                        $('.fancybox-wrap-popup-next').on('click', function () {
                            $.fancybox.next();
                        });

                        $('.fancybox-wrap-popup-prev').on('click', function () {
                            $.fancybox.prev();
                        });
                    },
                    afterClose: function () {
                        navigationInit = false;
                    },
                    onUpdate: function () {
                        setMargin();
                        if (modalMargin !== modalMarginUpdate) {
                            $.fancybox.update();
                        }
                    }
                });
            }
        })()
    };
    fancyboxCustom.init($('.fancybox'));
});