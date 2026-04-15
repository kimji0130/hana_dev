$(document).ready(function(){
	var contentSet = function(){
		var $header = $('.header');
		var $content = $('.contents');
		var $footer = $('.footer');

		$content.css('min-height', window.innerHeight - ( $header.outerHeight(true) + $footer.outerHeight(true)));
	}();
	
	var contentMarginSet = function(){
		var contentsInnerHeight = 0;

		$('.contents').children().each(function(){
				contentsInnerHeight += $(this).outerHeight();
		});
		if($('.contents').outerHeight() > contentsInnerHeight && $('.contents').children().not('.cont_header').length > 1){
			var lastMargin = parseInt($('.contents').children().not('.layer_popup').last().css('margin-top'));
			var marginValue = $('.contents').outerHeight() - contentsInnerHeight;

			$('.contents').children().last().filter('.bg01').css('margin-top', lastMargin + marginValue);
		}
	};

	// Tab (tab class)
	$('.tab li').click(function() {
		$(this).addClass('on').siblings('li').removeClass('on');
		return false;
	});


	// Tab_st02 (????????)
	$('.box_tab li').click(function() {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
		}else{
			$(this).removeClass('on');
		}
		return false;
	});
	
	/* 2018-04-09 ??? */
	// Tab_st03 (?? ???? ???? ???? )
	$('.toggle_tab li').click(function() {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on').siblings().removeClass('on');
		}else{
			$(this).removeClass('on');
		}
		return false;
	});
	/* //2018-04-09 ??? */


	/* ???? ??? Tab */
	$('.tab_cont').hide(); 
	$('.tabs li:first').addClass('on').show();
	$('.tab_cont:first').show();
	$('.tabs li').click(function() {
		$('.tabs li').removeClass('on');
		$(this).addClass('on');
		$('.tab_cont').hide(); 
		var activeTab = $(this).find('a').attr('href');
		$(activeTab).fadeIn(100); 
		return false;
	});


	// Layer_Popup
	$('.layer_open').click(function(){
		$(this).next('.layer_popup').show();
		return false;
	});
// 2019-02-26 추가
	$('.full_open').click(function(){
		$('.full_popup').show();
		return false;
	});
// 2019-02-26 추가	
	

	$('.layer_popup .pop_btn_close').click(function(){
		$(this).closest('.layer_popup').hide(); //2018-07-05 ????
	});
// 2019-02-26 추가	
	$('.full_popup .pop_btn_close').click(function(){
		$(this).closest('.full_popup').hide(); //2018-07-05 ????
	});
// 2019-02-26 추가

	// ???List Toggle 2019-02-20 삭제
	$('.product_detail').hide(); 
	$('.product_list > li > a').click(function() {
		if (!$(this).hasClass('on'))
		{
			$(this).addClass('on').siblings('.product_detail').slideDown(150);
		}else{
			$(this).removeClass('on').siblings('.product_detail').slideUp(150);
		}
		return false;
	});

	// 2018-12-28 대출신청하기 수정
	$('.list_st04.radio dt input').click(function(){
		if($(this).is(':checked')){
			$(this).next().children('span').css('color','#007c7c');
			$(this).parent().next().css('color','#007c7c');
		}else{
			$(this).next().children('span').css('color','#000');
			$(this).parent().next().css('color','#000');
		}
	});

	$('.list_st04.radio dt a>span').click(function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			$(this).parent().parent().next().slideDown(150);
		}else{
			$(this).removeClass('on');
			$(this).parent().parent().next().slideUp(150);
		}
	});
	$('.move_gold').click(function(){
		if($(window).width()==320){
			$('html, body').animate({scrollTop:460},400);
		}else{
			$('html, body').animate({scrollTop:400},400);
		}
	});

	$('.opt_tab').click(function(){
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			$(this).next().slideDown(150);
		}else{
			$(this).removeClass('on');
			$(this).next().slideUp(150);
		}
	});
	// Tab (loan_cont class) 2019-01-17 추가요
	$('.loan li').click(function(){
		var tab_num = $(this).index();

		$('.loan_cont li').removeClass('on');
		$('.loan_cont').children().eq(tab_num).addClass('on');

		//if($('.loan li:last').attr('class') == 'on'   ){
		//	$('dt.opt_tab').css({'display':'none'});
		//}else{
		//	$('dt.opt_tab').css({'display':'block'});
		//};
		return false;
	});
	// 대출심사 카운트 2019-01-17 추가요
	var totaltime = 6000;
	function update(percent){
		var deg;
		if (percent<(totaltime/2)){
			deg = 90 + (360*percent/totaltime);
			$('.txt_gra .progess .first').css('transform','rotate(' + (-360*percent/totaltime) + 'deg)');
			$('.txt_gra .progess .last').css('transform','rotate(' + 180 + 'deg)').css('background', '#008c8c');
		}else if(percent>=(totaltime/2)){
			deg = -90 + (360*percent/totaltime);
			$('.txt_gra .progess .first').css('transform','rotate(' + (-360*percent/totaltime) + 'deg)');
		}
	}
	var count = parseInt($('.txt_gra > .gra_timer').text());
	myCounter = setInterval(function(){
		count-=1;
		//update(count);
		$('.txt_gra > .gra_timer').html(count);
		if(count == 0){
			clearInterval(myCounter);
			$('.txt_gra').hide();
			$('.txt_gra_reconfim').show();
		}  
	},1000);
	
	var count02 = 6000;
	myCounter01 = setInterval(function(){
		count02-=1;
		update(count02);
		if(count02 == 0){
			clearInterval(myCounter01);
		}  
	},10);

	$('.txt_gra_reconfim').click(function(){
		location.href='hmbsLoan019_190117.html';
	});
	// progess_bg 위치이동  2019-01-17 추가요
	$(window).scroll(function(){
		var obj = $(this).scrollTop();
		var obj_h = obj - 209;		
		$('.progess_bg').css('top', - + obj_h + 'px');
	});
	$('.txt_gra_reconfim').click(function(){
		location.href='hmbsLoan019_190117.html';
	});

	//  필수 동의사항 앵커 2019-01-17 추가요
	$(window).load(function(){
		var h_Value01_1 = $('#detail_v1').outerHeight();
		var h_Value01_2 = $('.agree').children().eq(1).outerHeight();
		var h_Value01_3 = $('.agree').children().eq(2).outerHeight();
		var h_Value02 = h_Value01_3 + h_Value01_2 + h_Value01_1;
		var h_Value02_1 = $('#detail_v2').outerHeight();
		var h_Value02_2 = $('.agree').children().eq(4).outerHeight();
		var h_Value02_3 = $('.agree').children().eq(5).outerHeight();
		var h_Value03 = h_Value02 + h_Value02_1 + h_Value02_2 + h_Value02_3;
		var h_Value03_1 = $('#detail_v3').outerHeight();
		var h_Value04 = h_Value03 + h_Value03_1;
		$('.list_dot_01 li .scroll01').click(function(){
			$('.agree').scrollTop(0);
		});
		$('.list_dot_01 li .scroll02').click(function(){
			$('.agree').scrollTop(h_Value02);
		});
		$('.list_dot_01 li .scroll03').click(function(){
			$('.agree').scrollTop(h_Value03);
		});
		$('.list_dot_01 li .scroll04').click(function(){
			$('.agree').scrollTop(h_Value04);
		});
	});
	//  대출상품 안내 tab 2019-02-20 추가요
	var $menu_tab = $('.menu_tab li');
	var $menu_tabView = $('.menu_view.type01 .mn_box');
	$menu_tab.each(function(){
		$(this).on('click',function(e){
			var $menu_tabVal = $(this).index();
			$(this).siblings().removeClass('on');
			$(this).addClass('on');
			$menu_tabView.siblings().removeClass('on');
			$menu_tabView.parent().scrollTop(0);
			$menu_tabView.eq($menu_tabVal).addClass('on');
			e.preventDefault();
		});
	});
	// 대출신청 마케팅동의 화면 2019-05-23 추가 // 2019-12-12 추가 // 2020-01-16 수정
	var objItem1 = $('.chk_wrap.import'),
	objItem2 = $('.choice'),
	objItem3 = $('.list_off ul li+li.on'),
	objItem4 = $('.list_off ul li:first-child'),
	objItem5 = $('.list_off .tab_2 li+li'),
	objItem6 = $('.info_4way li'),
	objItem7 = $('.info_way'),
	objItem8 = $('.choice2'),//200723
	objItem9 = $('.chk_si li+li'),//200723
	objItem10 = $('.chk_si2 li+li'),//200723
	objItemTrsCk = $('.chk_wrap.termsChkTy'),
	objItemCkAll = $('.chk_wrap_all');//200723

	btn01();
	function btn01(){
		objItem1.click(function(){
			$(this).toggleClass('on');
			// $(this).next().toggleClass('on');
			$(this).next().slideToggle();
		});
		objItem2.click(function(){
			// $(this).next().children().find('.list_off .tab_2 li+li').addClass('on');
			// $(this).next().children().find(objItem4).removeClass('on');
			// if(objItem3){
			// 	$(this).addClass('on');
			// }else if(!objItem3) {
			// 	$(this).removeClass('on');
			// }
			// $(this).next().slideToggle();
			if(!$(this).is('.choice.on')) {
				$(this).addClass('on');
				$(this).next().slideUp();
				$(this).next().children().find('.list_off .tab_2 li+li').addClass('on');
				$(this).next().children().find(objItem4).removeClass('on');
				objItem6.children().find('input[type="checkbox"]').prop('checked',true);
				$(this).children().children().text('전체 선택항목 동의 완료');
			}else if($(this).is('.choice.on')) {
				$(this).removeClass('on');
				$(this).next().slideDown();
				$(this).next().children().find('.list_off .tab_2 li+li').removeClass('on');
				$(this).next().children().find(objItem4).removeClass('on');
				objItem6.children().find('input[type="checkbox"]').prop('checked',false);
				$(this).children().children().text('전체 동의하기 (선택항목)');
			}
		});
		objItem4.click(function(){
			objItem2.removeClass('on');
			objItem2.children().children().text('전체 동의하기 (선택항목)');
		});
		objItem6.click(function(){
			$(this).parents('.cont_tab.tab_4,.cont_tab.tab_2_1').each(function(){//200723
				var exam2 = $(this).children('li').find('input[type="checkbox"]:checked').length;						
				// console.log(exam2);
				if(exam2 >= 1){
					objItem7.addClass('on');
					objItem7.prev().removeClass('on');
				}else{
					objItem7.removeClass('on');
					objItem7.prev().addClass('on');
				}
			});
			$(this).parents('.list_dot_01').each(function(){
				var exam3 = $(this).children('.list_off').find('.tab_2 li+li.on').length;						
				var exam4 = $(this).children('.list_off').find('.tab_2 li+li').length;						
				 // console.log(exam4);
				if(exam3 >= exam4){
					objItem2.addClass('on');
					objItem2.children().children().text('전체 선택항목 동의 완료');
					objItem8.addClass('on');
					objItem8.children().children().text('선택 동의 완료');
				}else{
					objItem2.removeClass('on');
					objItem2.children().children().text('전체 동의하기 (선택항목)');
					objItem8.removeClass('on');
					objItem8.children().children().text('선택 동의');
				}
			});
		});
		objItem5.click(function(){
			$(this).parents('.list_dot_01').each(function(){
				var exam = $(this).children('.list_off').find('.tab_2 li+li.on').length;						
				var exam5 = $(this).children('.list_off').find('.tab_2 li+li').length;						
				// console.log(exam);
				if(exam === exam5){
					objItem2.addClass('on');
					objItem2.children().children().text('전체 선택항목 동의 완료');
					objItem8.addClass('on');
					objItem8.children().children().text('선택 동의 완료');
				}
			});
		});
		objItem7.prev().click(function(){
			objItem6.children().find('input[type="checkbox"]').prop('checked',false);
		});
		objItem7.click(function(){
			objItem6.children().find('input[type="checkbox"]').prop('checked',true);
		});
		//200723
		objItem9.prev().click(function(){
			$(this).parents('.list_off').siblings().find('li+li').removeClass('on').siblings().addClass('on');
			objItem6.children().find('input[type="checkbox"]').prop('checked',false);
			objItem8.removeClass('on');
			objItem8.children().children().text('선택 동의');
		});
		objItem9.click(function(){
			$(this).parents('.list_off').siblings().find('.chk_si li+li').addClass('on').siblings().removeClass('on');
			objItem6.children().find('input[type="checkbox"]').prop('checked',true);
		});
		objItem10.prev().click(function(){
			$(this).parents('.list_off').siblings().find('.chk_si2 li+li').removeClass('on').siblings().addClass('on');
			objItem8.removeClass('on');
			objItem8.children().children().text('선택 동의');
		});
		objItem10.click(function(){
			$(this).parents('.list_off').siblings().find('.chk_si li+li,.chk_si2 li+li').addClass('on').siblings().removeClass('on');
			objItem6.children().find('input[type="checkbox"]').prop('checked',true);
			objItem8.addClass('on');
			objItem8.children().children().text('선택 동의 완료');
		});

		//약관동의 체크 텍스트 교체타입 - 배열 name 값과 연동
		var txTrsArr1 = ['전체 동의하기 (필수항목)','전체 필수항목 동의 완료'],
			txTrsArr2 = ['전체 동의하기 (선택항목)','전체 선택항목 동의 완료'],
			txTrsArr3 = ['전체 동의하기','전체 동의 완료'],//200723
			txTrsArr4 = ['필수 동의','필수 동의 완료'],//200723
			txTrsArr5 = ['선택 동의','선택 동의 완료'];//200723
		objItemTrsCk.click(function(){
			$(this).toggleClass('on');
			// $(this).next().slideToggle();
			if($(this).hasClass('on')) {
				$(this).next().slideUp();
			}else {
				$(this).next().slideDown();
			}

			var _$thisAttrChk = $(this).attr('name');
				_chkNum = _$thisAttrChk.substr(8,1);
			var strChk = eval('txTrsArr' + _chkNum); //name 값 체크
			if($(this).hasClass('on')){
				$(this).children().children().text(strChk[1]);
				$(this).next().children().find('.list_off .tab_2 li+li').addClass('on');//200723
				$(this).next().children().find('input[type="checkbox"]').prop('checked',true);//200723
			}
			else{
				$(this).children().children().text(strChk[0]);
				$(this).next().children().find('.list_off .tab_2 li+li').removeClass('on');//200723
				$(this).next().children().find('input[type="checkbox"]').prop('checked',false);//200723
			}
			//200723
			if ($('.termsChkTy').length == $('.termsChkTy.on').length) {
				objItemCkAll.addClass('on');
			}else {
				objItemCkAll.removeClass('on');
			}
		});

		//200723
		objItemCkAll.click(function() {
			$(this).toggleClass('on');
			objItemTrsCk.trigger('click');
		});
	};

	// 20200827 선택항목 동의하기
	$('.all_chk_v01').click(function(){
		var _target = $(this).attr('data-targetbox');
		if(!$(this).hasClass('on')){
			$(this).addClass('on');
			$(this).find('.st-02 span').text('전체 선택항목 동의 완료')
			$('.'+_target).find('.first_chk').find('input[type="checkbox"]').prop('checked', true);
			$('.'+_target).slideUp();
		}else{
			$(this).removeClass('on');
			$(this).find('.st-02 span').text('전체 동의하기 (선택항목)')
			$('.'+_target).find('.first_chk').find('input[type="checkbox"]').prop('checked', false);
			$('.'+_target).slideDown();
		}
	})
	// 20200827 선택항목 동의하기
	$('.chk_v01 input[type="checkbox"]').change(function(){
		chkVersion01($(this).attr('class'), $(this))
		// console.log(1)
	})
	// 20200827 선택항목 동의하기
	function chkVersion01(result, _this){
		switch (result){
			case 'checktype01':
				if($('.'+result).prop('checked')){
					$('.'+result).parent().next().find('input[type="checkbox"]').prop('checked', true);
					var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
					var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
					$(lastEl).find('input[type="checkbox"]').prop('checked', true);
				}else{
					$('.'+result).parent().next().find('input[type="checkbox"]').prop('checked', false);
					var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
					var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
					$(lastEl).find('input[type="checkbox"]').prop('checked', false);
				}
				break;
			case 'checktype02':
				if($('.'+result).prop('checked')){
					$('.'+result).parent().prev().find('input[type="checkbox"]').prop('checked', true);
					$('.'+result).siblings('.seconds_chk_area').find('input[type="checkbox"]').prop('checked', true);
					var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
					var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
					$(lastEl).find('input[type="checkbox"]').prop('checked', true);
					
				}else{
					$('.'+result).parent().prev().find('input[type="checkbox"]').prop('checked', false);
					$('.'+result).siblings('.seconds_chk_area').find('input[type="checkbox"]').prop('checked', false);
					var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
					var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
					$(lastEl).find('input[type="checkbox"]').prop('checked', false);
				}
				break;
			case 'checktype03':
				if($('.'+result).prop('checked')){
					var checkedNum = $(_this).parents('.first_chk').siblings('.first_chk').find('.seconds_chk_area').find('input[type="checkbox"]:checked').length;
					if(checkedNum === 0){
						$(_this).parents('.first_chk').siblings('.first_chk').find('input[type="checkbox"]').prop('checked', true);
					}else{
						$(_this).parents('.first_chk').siblings('.first_chk').children('input[type="checkbox"]').prop('checked', true);
					}
				}
				break;
			case 'checktype04':
				if($('.'+result).prop('checked')){
					for(var i = 1; i < $('.'+result).parent().prevAll().length; i++){
						var checkTarget = $('.'+result).parent().prevAll()[i];
						$(checkTarget).find('input[type="checkbox"]').prop('checked', true);
					}
				}else{
					for(var i = 1; i < $('.'+result).parent().prevAll().length; i++){
						var checkTarget = $('.'+result).parent().prevAll()[i];
						$(checkTarget).find('input[type="checkbox"]').prop('checked', false);
					}
				}
				break;
			case 'checktype05':
				if($(_this).prop('checked')){
					if(!$(_this).parents('.first_chk').children('input[type="checkbox"]').prop('checked')){
						$(_this).parents('.first_chk').children('input[type="checkbox"]').prop('checked', true);
						$(_this).parents('.first_chk').prev().children('input[type="checkbox"]').prop('checked', true);
						var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
						var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
						$(lastEl).find('input[type="checkbox"]').prop('checked', true);
					}
				}else{
					var checkedNum = $('.'+result).parents('.seconds_chk_area').find('input[type="checkbox"]:checked').length;
					if(checkedNum === 0){
						$(_this).parents('.first_chk').children('input[type="checkbox"]').prop('checked', false);
						$(_this).parents('.first_chk').prev().children('input[type="checkbox"]').prop('checked', false);
						var lastNum = $('.'+result).parents('.lists_chk').find('.first_chk').length -1;
						var lastEl = $('.'+result).parents('.lists_chk').find('.first_chk')[lastNum];
						$(lastEl).find('input[type="checkbox"]').prop('checked', false);
					}
				}
				break;
		}
	}

	function focusInput (input, parent ) {
		$(input).focusin( function () {
			$(this).parent(parent).addClass('on')
		})
		$(input).focusout( function () {
			$(this).parent(parent).removeClass('on')
		})
	}

	focusInput('.inp', '.resident_inp')
	focusInput('.inp', '.inp_wrap.phone')
	focusInput('.opt', '.inp_wrap.phone')
	focusInput('.pwdTxt', '.pwd')
	
});	
function focusId(focusId) {
	var areaTop = $("#" + focusId + "DD").offset().top; // 이동하려는 객체의 절대 위치

	var headerHeight1 = $(".header").innerHeight(); // 최상단 헤더
	var headerHeight2 = $(".cont_header").innerHeight(); // 두번째 헤더

	var moveScrollPx = areaTop - headerHeight1 - headerHeight2;

	window.scrollTo(0, moveScrollPx - 80);
}
/* Header ???? */
// $(window).on('load resize scroll', function(e){
// 	if(e.type=="resize"){
// 		}else if(e.type=="load"){
// 		}else if(e.type="scroll"){
// 			actionScrollDetect();
// 	}
// });

// var prevScrollTop = $(window).scrollTop(),
// 	nowScrollTop = $(window).scrollTop(),
// 	nowDir = 'stop',
// 	prevDir = 'stop';

// function actionScrollDetect() {
// 	var headerH1=$('.cont_header').outerHeight();
// 	var headerH2=$('.header').outerHeight();
// 	var headerH3=$(window).height();
// 	var headerH4=$(document).height();
	
// 	nowScrollTop = $(window).scrollTop();

// 	if (nowScrollTop > prevScrollTop) {
// 		nowDir = 'down';
// 	} else if (nowScrollTop < prevScrollTop){
// 		nowDir = 'up';
// 	}

// 	prevDir = nowDir;
// 	prevScrollTop = nowScrollTop;
// 	if(headerH2<nowScrollTop&&(headerH4-headerH3)>(headerH1+headerH2)){
// 		if(nowDir == 'up'){
// 		if(nowScrollTop>=headerH4-headerH3-headerH2){
// 			$('.header').css({'position':'fixed', 'top':-headerH2, 'z-index':'101'});
// 			$('.cont_header').css({'position':'fixed', 'top':'0', 'z-index':'100'}).addClass('scrollOn');
// 			$('.content_box1').css({'margin-top':'0'});
// 			$('.content_box2').css({'margin-top':'0'});
// 		}else{
// 		$('.header').css({'position':'fixed', 'top':'0', 'z-index':'97'});
// 		$('.cont_header').css({'position':'fixed', 'top':headerH2, 'z-index':'100'}).addClass('scrollOn');;
// 		$('.content_box1').css({'margin-top':headerH1});
// 		$('.content_box2').css({'margin-top':'0'});
// 		}
// 		}else if( nowDir == 'down' ) {
// 			$('.header').css({'position':'fixed', 'top':-headerH2, 'z-index':'101'});
// 			$('.cont_header').css({'position':'fixed', 'top':'0', 'z-index':'100'}).addClass('scrollOn');
// 			$('.content_box1').css({'margin-top':headerH1});
// 			$('.content_box2').css({'margin-top':'0'});
// 		}
// 	}else if(1>nowScrollTop){
// 		$('.header').css({'position':'relative', 'top':'0', 'z-index':'-101'});
// 		$('.cont_header').css({'position':'relative', 'top':'0', 'z-index':'100'}).removeClass('scrollOn');
// 		$('.content_box1').css({'margin-top':'0'});
// 		$('.content_box2').css({'margin-top':'0'});
// 	}
// };