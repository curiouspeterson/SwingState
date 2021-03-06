$(document).ready(function() {
	
	function cancelDefaultAction(e) {
	 var evt = e ? e:window.event;
	 if (evt.preventDefault) evt.preventDefault();
	 evt.returnValue = false;
	 return false;
	}
	
	$( ".swing-inner" ).click(function() {
		$(this).removeClass('active');
	  $(this).addClass('active');
	  setTimeout(function () {
	      $('.active').removeClass('active');
	    }, 5000);
	});
	
	
	$( ".state-selection" ).click(function(event) {
		event.preventDefault();
		$('.state-selection').removeClass('activeLink');
		$(this).addClass('activeLink');
		var dataState = $(this).data('state');
		$('.state.active').addClass('not-active');
		var selectedState = ".state." + dataState + "";
		$(selectedState).addClass('in-swing');
		$('.in-swing').removeClass('in-swing');
		$(selectedState).addClass('in-swing');
	});
	
	
});
