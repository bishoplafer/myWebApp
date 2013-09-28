/*  JavaScript Document                      */


$(document).ready(function(){

	setOrientationListener();
	
	$('nav a').on('click', function(){
		$('nav a').removeClass('selected');
		$(this).addClass('selected');
		changePage( $(this).attr('data-file') );
	});
	
	$('nav a:nth-child(1)').trigger('click');
	
	$('.banner_logo').on('click', function(){
		$('nav a:nth-child(1)').trigger('click');
	});

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

