/*  JavaScript Document                      */

var isiPad = navigator.userAgent.indexOf('iPad') != -1;

var myScroll;
function loaded(){
	myScroll = new iScroll('scroll', {checkDOMChanges:true});
}
document.addEventListener('DOMContentLoaded', loaded, false);

$(document).ready(function(){

	setOrientationListener();
	
	$('nav a').on('touchstart', function(){
		$('nav a').removeClass('selected');
		$(this).addClass('selected');
		changePage( $(this).attr('data-file') );
	});
	
	$('nav a:nth-child(1)').trigger('touchstart');
	
	$('.banner_logo').on('touchstart', function(){
		$('nav a:nth-child(1)').trigger('touchstart');
	});
	
	document.addEventListener('touchmove', function(e){ e.preventDefault(); }, false);
	window.setTimeout('startMap()',3000);
	
	checkDevice();
	checkiPadStandAlone();

});

function changePage(fileName){
	$('.content_container').animate({opacity:0}, 500, function(){
		$('.content_loading_container').load('assets/content/'+fileName, function(){
			$('.content_container').delay(250).animate({opacity:1}, 500);
		});
		
		if( fileName == 'home.html?v=1'){
			$('page').addClass('home');
		}else{
			$('.page').removeClass('home');
		}
		
		if( fileName == 'contact_us.html?v=1' ){
			$('.content_container').addClass('contact_us');
			$('.map_container').removeClass('off').addClass('on');
		}else{
			$('.content_container').removeClass('contact_us');
			$('.map_container').removeClass('on').addClass('off');
		}
		
	});
	
}

function setOrientationListener(){
	rotationInterval = setInterval( function(){ updateOrientation(); }, 500 );
}

function updateOrientation(){
	if($('body').width() < 1024){
		$('.page').removeClass('landscape').addClass('portrait');
	}else{
		$('.page').removeClass('portrait').addClass('landscape');	
	}
}

function startMap(){
    var latlng = new google.maps.LatLng(30.329064, -81.657343); 
    var myOptions = {zoom: 16, center: latlng, mapTypeId: google.maps.MapTypeId.ROADMAP}; 
    var map = new google.maps.Map(document.getElementById('map_canvas'),myOptions); 
    var marker = new google.maps.Marker({
        position: latlng, 
        map: map,
        title:"Office Location"
    }); 
}

function checkDevice(){
	if(window.isiPad){
		// do nothing
	}else{
		$('.page').css('display','none');
		$('body').css('background-color','#fff').append('<a href="mailto:?subject=Check%20out%20this%20eSales%20Aid%20Web%20App%20for%20iPad&amp;body=Add%20this%20Web%20App%20to%20your%20iPad%20by%20visiting:%20http://codifydesign.com/chris/lynda/samples/course-0010/"><img src="assets/images/template/non_ipad_message.png?v=1"/></a>');
	}
}

function checkiPadStandAlone(){
	if(window.navigator.standalone == false) {
		$('.page').css('display','none');
		$('body').css('background-image','url(assets/images/template/background_content_home.jpg?v=1)').append('<img  src="assets/images/template/add_to_homescreen.png?v=1"/>');
	}
}