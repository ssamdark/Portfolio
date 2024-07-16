
/*------------------------------------------------------
· 엘리먼트 효과
------------------------------------------------------ */
// 애니메이션 설정
$.fn.extend({
	setEffect : function(amount) {
		return this.each(function() {
			var $this = $(this);
			var effectType = ($(this).attr("class")).match(/effect\-(\w+)/)[1];
			var effect = "animation-" + effectType;
			$(".wrapper").on("scroll", function(e) {
				var winTop = $(this).scrollTop();
				var screenH = $(this).height();
				var thisTop = $this.offset().top + amount ;
				if(winTop + screenH > thisTop) {
					$this.addClass(effect);
				} else {
					$this.removeClass(effect);
				}
			});
		});
	}
});

function msgPop(msg) {
  var pop = $("<div class='msgPop'>"+ msg +"</div>");
  pop.appendTo("body").animate({opacity:"1"}, 300);
  setTimeout(function() {
    pop.fadeOut(300, function() { $(this).remove(); });
  }, 2000);
}





/* 프로젝트 자세히 보기 Style */
function openLayer(a) {
	var img = $(a).parents("li").find(".bigImg").attr("data-fullImg");
	var layer = $(".projectLayer");
	layer.find(".imgBox img").attr("src", img);
	layer.css({"display":"flex","opacity":"0"}).fadeTo(500, 1);
	// 메인 스크롤 중지
	$(".wrapper").css("overflow-y","hidden");
	msgPop("창을 닫으려면 ESC를 누르세요.");
}
function closeLayer() {
	$(".projectLayer").find(".thumbWrap").empty();
	$(".projectLayer").fadeOut(500);
	$(".wrapper").css("overflow-y","auto");
}
function gotoTop() {
	$(".projectLayer").animate({scrollTop:0}, 600);
}
// ESC로 닫기
$(window).on("keydown", function(e) {
	if(e.keyCode == 27 ) {
		closeLayer();
	}
});


/* 메뉴버튼 */
function toggleMenu(btn) {
	var wrap = $(btn).parents(".menuWrap");
	if(wrap.hasClass("open")) {
		wrap.removeClass("open");
		//$("body").css("overflow-y","auto");
	} else {
		wrap.addClass("open");
		//$("body").css("overflow-y","hidden");
	}
}




// 페이지 로딩 후 실행
$(document).ready(function() {
	// 스와이퍼 옵션
	var _option = {
		slidesPerView: 3, // 컨테이너에 보이는 슬라이드 수
		centeredSlides: false, // 현재 슬라이드 중앙에 위치 여부
		//centeredSlides: true, // 현재 슬라이드 중앙에 위치 여부
		slidesOffsetAfter: 400, // 맨 마지막 슬라이드 뒷쪽 여백
		freeMode: true, // 프리모드
		freeModeSticky: true, // 프리모드에서 스냅 여부
		freeModeMinimumVelocity: 0.2, // 슬라이딩하기 위한 최소 터치 속도
		scrollbar: { // 스크롤바 표시 여부
			el: ".swiper-scrollbar", // 스크롤바가 위치할 태그
			//hide: true // 자동숨김 여부
			hide: false // 자동숨김 여부
		},
		// Responsive breakpoints
		  breakpoints: {
			 1300: {
				slidesPerView: 2,
			 },
			 750: {
				slidesPerView: 1,
			 }
		  }
	};
	// 스와이퍼 생성
	var swiper = new Swiper(".swiper-container", _option);


	// 탭메뉴
	$(".tabMenu a").on("click", function() {
		// 메뉴색상변경
		$(".tabMenu a").removeClass("current");
		$(this).addClass("current");
		// 분류
		var category = $(this).text();
		if(category == "ALL") {
			$(".workList li").show();
		} else {
			$(".workList li").not("."+category).hide();
			$("."+category).show();
		}
		// 스와이퍼 업데이트
		swiper.update();
	});

});