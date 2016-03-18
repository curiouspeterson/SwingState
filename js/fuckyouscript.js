$(document).ready(function() {
	var base = $('#blogURL').attr('href'),
		$firstPostLink = $('#first-post-link').attr('href'),
		$mainContent = $("#ajax-container"),
		$innerContainer = $('#content'),
		$searchInput = $("#s"),
		$allLinks = $("a"),
		$historySupported = false,
		$currentFeature = 1,
		$mouseOver = false,
		$finishedLoading = false,
		$containerHeight = $("#ajax-container").height(),
		$currentWidth = '',
		$newWidth = '',
		$isMobile = false,
		$el;
	if (navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/)) {
		$isMobile = true;
		$('html').addClass('mobile-device');
	} else {
		$isMobile = false;
		$('html').addClass('not-mobile-device');
	};

	function isiPad() {
		if (navigator.userAgent.match(/iPad/i) != null) {
			$('html').addClass('is-iPad');
		}
	}

	function debug(text) {
		if ((typeof(Debug) !== 'undefined') && Debug.writeln) {
			Debug.writeln(text);
		}
		if (window.console && window.console.log) {
			window.console.log(text);
		}
		if (window.opera) {
			window.opera.postError(text);
		}
		if (window.debugService) {
			window.debugService.trace(text);
		}
	}

	function init() {

		$newHeight = $('.current-post').outerHeight();
		$('#home-page-intro-inner').css('min-height', $newHeight);
		bindHoverFx();
		fullScreenSlide();
		mediaQueryCalculator();
		$historySupported = false;

	}

	function mediaQueryCalculator() {
		var width = $(window).width();
		if (width >= 0 && width <= 479) {
			$newWidth = 'width-0-479';
		} else if (width >= 480 && width <= 767) {
			$newWidth = 'width-480-767';
		} else if (width >= 768 && width <= 1023) {
			$newWidth = 'width-768-1024';
		} else if (width >= 1024 && width <= 1199) {
			$newWidth = 'width-1024-1199';
		} else if (width >= 1200) {
			$newWidth = 'width-1200';
		}
		$('body').removeClass($currentWidth).addClass($newWidth);
		$currentWidth = $newWidth;
	}

	function bindHoverFx() {
		$('#facebook-share').unbind('click');
		$('#facebook-share').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'FB_share_clicked', 'Facebook share clicked', $linkTitle]);
		});
		$('#twitter-share').unbind('click');
		$('#twitter-share').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'TW_share_clicked', 'Twitter share clicked', $linkTitle]);
		});
		$('.logo-container a').unbind('click');
		$('.logo-container a').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'Organizations making a difference link', '' + $linkTitle + ' clicked', $linkTitle]);
		});
		$('#random-post-link').unbind('click');
		$('#random-post-link').click(function() {
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'There\'s Fucking More link', '' + $linkTitle + ' clicked', $linkTitle]);
		});
		$('#random-post-logo-link').unbind('click');
		$('#random-post-logo-link').click(function() {
			$('.current-post a.random-post-link').click();
		});
		$('a.random-post-link').unbind('click');
		$('a.random-post-link').click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $linkTitle = $(this).attr('title');
			_gaq.push(['_trackEvent', 'There\'s Fucking More link', '' + $linkTitle + ' clicked', $linkTitle]);
			$currentPost = $(this).data('this');
			$nextPost = $(this).data('next');
			$($currentPost).fadeOut("slow", function() {
				$newHeight = $($nextPost).outerHeight();
				$('#home-page-intro-inner').css('min-height', $newHeight);
				$($currentPost).removeClass('current-post');
				$($nextPost).addClass('current-post');
				$($nextPost).fadeIn();
			});
			document.title = $($nextPost).data('title');
			var $path = $($nextPost).data('slug');
			/*
			if ($historySupported) {
							history.pushState($path, base + $path, base + '/' + $path);
							_gaq.push(['_trackPageview']);
						} else {
							$url = '"' + base + '/' + $path + '"';
							window.location = $url;
						}*/
			
		});
	}

	function fullScreenSlide() {
		var browserheight = $(window).height();
		var browserWidth = $(window).width();
		var halfWidth = browserWidth / 2;
		var threeQuarterWidth = browserWidth * .75;
		if (!$isMobile) {
			$newHeight = browserheight;
			$('.fillscreen-section').css('min-height', $newHeight);
			$('body').addClass('fullscreen-sections');
			$('body').addClass('imagesloaded');
			$(".fill-browser-inner").each(function() {
				var $thisinner = $(this).outerHeight();
				var $headerImage = $('#header-container');
				var $extraspace = (($newHeight - $thisinner - $headerImage) / 2);
				if ($extraspace > 0) {
					$(this).css('margin-top', $extraspace);
				} else {
					$(this).css('margin-top', '0px');
					$(this).css('padding-bottom', '160px');
					$('.not-mobile-device body').css('font-size', '40px');
					$('.header-image-container').css('margin-bottom', '50px');
				}
			});
		}
	}


	init();
});
