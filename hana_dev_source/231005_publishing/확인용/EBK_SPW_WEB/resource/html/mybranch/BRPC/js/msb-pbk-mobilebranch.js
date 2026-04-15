/**
 * MSB - PBK - 모바일 브랜치
 * @author 
 * @since 
 */



/************************************************* 퍼블리싱 스크립트 start *************************************************/
$(document).ready(function(){

	// Tab (tab class)
	$('.tab li').click(function() {
		$(this).addClass('on').siblings('li').removeClass('on');
		return false;
	});

	// Tab_st02 (복수선택)
	$('.box_tab li').click(function() {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
		}else{
			$(this).removeClass('on');
		}
		return false;
	});


	// $('.tab_cont').hide(); 
	// $('.tabs li.on').show();
	// $('.tab_cont.on').show();
	// $('.tabs li').click(function() {
	// 	$('.tabs li').removeClass('on');
	// 	$(this).addClass('on');
	// 	$('.tab_cont').hide(); 
	// 	var activeTab = $(this).find('a').attr('href');
	// 	$(activeTab).fadeIn(100); 
	// 	return false;
	// });


	// Dimmed
	// $(".tab2 ul li a").click(function(event) {
	// 	event.preventDefault();
	// 	$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	// });
	

	// Layer_Popup
	$('.layer_open').click(function(){
		$('.layer_popup').show();
	});

	$('.layer_popup .pop_btn_close').click(function(){
		$('.layer_popup').hide();
	});

	// 동의하기 Toggle
	$('.agree_end').find('a').html("동의완료");// 동의완료일때
	$('.agree_tit').click(function(){
		if (!$(this).hasClass('close'))
		{
			// $(this).find('a').html("내용닫기");
			$(this).addClass('close').next('dd').slideDown(150);
		}else{
			// $(this).find('a').html("내용보기");
			$(this).removeClass('close').next('dd').slideUp(150);
		}
		return false;
	});
	
	// 상품List Toggle
	$('.product_detail').hide(); 
	$('.product_list li').click(function() {
		if (!$(this).hasClass('on'))
		{
			$(this).addClass('on').find('.product_detail').slideDown(150);
		}else{
			$(this).removeClass('on').find('.product_detail').slideUp(150);
		}
		return false;
	});
	
});


/* Header 고정 */
$(window).on('load resize scroll', function(e){
	if(e.type=="resize"){
		}else if(e.type=="load"){
		}else if(e.type="scroll"){
			actionScrollDetect();
	}
});

var prevScrollTop = $(window).scrollTop(),
	nowScrollTop = $(window).scrollTop(),
	nowDir = 'stop',
	prevDir = 'stop';

function actionScrollDetect() {
	var headerH1=$('.cont_header').outerHeight();
	var headerH2=$('.header').outerHeight();
	var headerH3=$(window).height();
	var headerH4=$(document).height();

	nowScrollTop = $(window).scrollTop();

	if (nowScrollTop > prevScrollTop) {
		nowDir = 'down';
	} else if (nowScrollTop < prevScrollTop){
		nowDir = 'up';
	}

	prevDir = nowDir;
	prevScrollTop = nowScrollTop;
	if(headerH2<nowScrollTop&&(headerH4-headerH3)>(headerH1+headerH2)){
		if(nowDir == 'up'){
		if(nowScrollTop>=headerH4-headerH3-headerH2){
			$('.header').css({'position':'fixed', 'top':-headerH2, 'z-index':'1001'});
			$('.cont_header').css({'position':'fixed', 'top':'0', 'z-index':'1000'}).addClass('scrollOn');
		}else{
		$('.header').css({'position':'fixed', 'top':'0', 'z-index':'997'});
		$('.cont_header').css({'position':'fixed', 'top':headerH2, 'z-index':'1000'}).addClass('scrollOn');;
		}
		}else if( nowDir == 'down' ) {
			$('.header').css({'position':'fixed', 'top':-headerH2, 'z-index':'10001'});
			$('.cont_header').css({'position':'fixed', 'top':'0', 'z-index':'1000'}).addClass('scrollOn');
		}
	}else if(1>nowScrollTop){
		$('.header').css({'position':'relative', 'top':'0', 'z-index':'1001'});
		$('.cont_header').css({'position':'relative', 'top':'0', 'z-index':'1000'}).removeClass('scrollOn');
	}
};
/************************************************* 퍼블리싱 스크립트 end *************************************************/



msb.pbk.mobilebranch = function() {
	
	var oTmpForm = null;
	
	return {
		
		/* ##### 영업점 찾기 ##### */
		openBranchSearch : function( oForm ) {
			var _kornBrNm = oForm.kornBrNm.value;
			/* 공백 강제 제거 */
			_kornBrNm = replaceAll(_kornBrNm, " ", "");
			oForm.kornBrNm.value = _kornBrNm;
			
			if( oForm.kornBrNm.value == "" ) {
				hanaDialog.openAlert({title:'영업점 검색', message:'영업점명을 입력하세요.'});
				return;
			}
			
			if( oForm.kornBrNm.value.length < 2 ) {
				hanaDialog.openAlert({title:'영업점 검색', message:'영업점명을 두글자 이상 입력하세요.'});
				return;
			}
			
			var hanaJQuery = new HanaJQuery("resultBranch", true);
			hanaJQuery.ajaxLoad("/mobilebranch/msmbr001_01.do", oForm, null);
			
			$('input[name="kornBrNm"]').removeClass("w70");
			$('input[name="kornBrNm"]').addClass("w60");
			$('#srchBtn').text("재검색");
		},
		
		
		
		/*
		 * 주의 branch.do 로 들어오는 브랜치코드는 카멜케이스 적용안된 모두 소문자!! "brno"
		 * */
		
		// 브랜치 메인 페이지로 이동(URL로)
		goBranchMain : function(brNo) {
			document.location.href = '/mobilebranch/branch.do?brno='+ brNo;
		}

	};
}();


/**
 * MSB - PBK - 모바일 브랜치 - 대출
 * @author 
 * @since 
 */
msb.pbk.mobilebranch.loan = function(){
	
	var oTmpForm = null;
	  
	return{
		//브랜치 대출 신청 메인으로 이동
		goBranchLoanIndex: function(brNo){ 
			/*var oSendForm = msb.util.form.createForm([ {
				id : 'brNo',
				value : brNo
			} ]);*/
			
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_01.do?brNo='+brNo, null, null, false);
		},
		
		goPage : function(pageName,brNo,prdCd) {
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			var oSendForm = msb.util.form.createForm([ {
					id : 'brNo',
					value : brNo
				},{
					id : 'prdCd',
					value : prdCd
				} ]);
		
			
			hanaJQuery.ajaxLoad('/mobilebranch/loan/'+pageName+'.do?', oSendForm, null, false);
		},
		
		goMainPage : function(){
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/msmbr002.do', null, null, false);
		},
	
		goLoanSubmitStep3_noLogin : function(_formObj){
			if (	_formObj.agree1.value == 'N' ||
					_formObj.agree2.value == 'N' ||
					_formObj.agree3.value == 'N' ||
					_formObj.agree4.value == 'N'){
				
				hanaDialog.openAlert({
					title : "알림",
					message : "위 사항에 \"동의\"를 체크하셔야 진행이 됩니다."
				});
				return;
			}
			
			
			if (!_formObj.chklast[0].checked){
				hanaDialog.openAlert({
					title : "알림",
					message : "\"위의 내용을 충분히 이해 하셨습니까?\"를 체크하셔야 진행이 됩니다."
				});
				return;
			}
		
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_11.do', _formObj, null, false);
			
		}, 
		
		/////////////////////////////////////
		openTerms : function(_agreeType , formObj) {
			
			var _agreeContentURL = "";
			if("1" == _agreeType) { //신청하기의 약관
				_agreeContentURL = "/mobilebranch/loan/msmbr003_07.do"; //개인 신용정보의 제공 및 조회 동의

			} else if("2" == _agreeType) { //신청하기의 약관
				_agreeContentURL = "/mobilebranch/loan/msmbr003_09.do"; //개인 신용정보의 제공 활용에 대한 고객권리 안내문

			}
			/*else if("3" == _agreeType) { //상담하기의 개인정보취급방침의 동의
				_agreeContentURL = "/mobilebranch/loan/msmbr003_07.do"; //개인 신용정보의 제공 및 조회 동의

			} 
			*/
			else if("4" == _agreeType) { //신청하기의 기타동의
				_agreeContentURL = "/mobilebranch/loan/msmbr003_10.do";

			} else if("5" == _agreeType) { //신청하기의 개인(신용)정보 수집, 이용 및 제공 동의서(금융거래 설정 등)
				_agreeContentURL = "/mobilebranch/loan/msmbr003_08.do";

			} 
			
			
			else if("6" == _agreeType) { //약정하기의 은행 여신거래 기본약관
				_agreeContentURL = "/mobilebranch/loan/mslon300_72.do";

			}  else if("7" == _agreeType) { //약정하기의 대출거래약정서 I
				_agreeContentURL = "/mobilebranch/loan/mslon300_73_00.do";

			} else if("30" == _agreeType) { //증액약정하기의 대출거래 추가약정서
				_agreeContentURL = "/mobilebranch/loan/mslon300_77_30.do";

			}
			/*
			else if("8" == _agreeType) { //약정하기의 대출거래약정서 II
				_agreeContentURL = "/mobilebranch/loan/mslon300_74.do";

			}  
			*/
			else if("9" == _agreeType) { //약정하기의 추가약정서
				_agreeContentURL = "/mobilebranch/loan/mslon300_75.do";

			}  else if("10" == _agreeType) { //약정하기의 가계대출 상품설명서
				_agreeContentURL = "/mobilebranch/loan/mslon300_76.do";

			}  else if("11" == _agreeType) { //약정하기의 무인감 무통장 출금 동의
				_agreeContentURL = "/mobilebranch/loan/mslon300_77.do";

			}  else if("12" == _agreeType) { //개인(신용)정보 제3자 제공동의서(GS칼텍스㈜ 집단신용대출약정)
				//화면내의 추가약정서를 이용.
				$('#agreeListDiv').hide(0,function(){
					$('#GS_CALTEX_AGREE_DIV').show();
				});
				return false;

			} else if("20" == _agreeType) { //약정하기의 근질권 설정 계약서
				_agreeContentURL = "/mobilebranch/loan/mslon300_77_01.do";

			} else if("21" == _agreeType) { //약정하기의 처분승낙서
				_agreeContentURL = "/mobilebranch/loan/mslon300_77_02.do";

			} else if("22" == _agreeType) { //약정하기의 대출금지급위임장
				_agreeContentURL = "/mobilebranch/loan/mslon300_77_03.do";

			} else if("23" == _agreeType) { //약정하기의 각서
				_agreeContentURL = "/mobilebranch/loan/mslon300_77_04.do";

			} else if("24" == _agreeType) { //상품별 필수 개인(신용)정보 수집 이용 및 제공 동의서(1Q오토론용)
				_agreeContentURL = "/mobilebranch/loan/mslon300_96.do";

			} else if("25" == _agreeType) { //계약 체결 이행 등을 위한 필수 동의서
				_agreeContentURL = "/mobilebranch/loan/mslon300_97.do";

			} else if("26" == _agreeType) { //개인(신용)정보 수집, 이용 및 제공 동의서(1Q오토론용) : 중고차구입자금 限
				_agreeContentURL = "/mobilebranch/loan/mslon300_98.do";

			} else if("38" == _agreeType) { //신청하기의 약관
				_agreeContentURL = "/mobilebranch/loan/mslon300_57_02.do"; //개인 신용정보의 제공 및 조회 동의

			} else if("39" == _agreeType) { //신청하기의 약관
				_agreeContentURL = "/mobilebranch/loan/mslon300_58_01.do"; //개인 신용정보의 제공 활용에 대한 고객권리 안내문

			} else if("40" == _agreeType) { //신청하기의 약관
				_agreeContentURL = "/mobilebranch/loan/mslon300_61_02.do"; //개인(신용)정보 수집, 이용 및 제공 동의서(금융거래 설정 등)

			} else {
				alert("ERROR : 해당 약관내용 없음.");
				return;
			} 
			
			var hanaJQuery = new HanaJQuery(null, true, null);
			hanaJQuery.ajaxSubLoad(_agreeContentURL, null, null, false);
		},
		
		
		
		agreeTerms : function(_motherForm, _agreeType, _oDiv) {
			
			var copyAndCheckFnc = function(_motherForm,_agreeType,_oDiv){
				if(eval('_motherForm.signAgreeContents'+_agreeType) != null && eval('_motherForm.signAgreeContents'+_agreeType) != undefined) {
					copyDivInnerHTMLToHiddenValue(_oDiv, eval('_motherForm.signAgreeContents'+_agreeType));
					$('#term'+_agreeType).removeClass("btn_s1").addClass("btn_s2").text("동의함"); //.css('background-color','#4C6C8D');
				}
			};
			
			if("1" == _agreeType) {
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.inquiry_agree1[1].checked || !agreeForm.inquiry_agree2[1].checked || !agreeForm.inquiry_agree3[1].checked || !agreeForm.inquiry_agree4[1].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				
				if(_motherForm.agree1 != null && _motherForm.agree1 != undefined) {
					_motherForm.agree1.value = 'Y';
					//$('#term1').css('background-color','#4C6C8D');
					$('#term1').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}

			} else if("2" == _agreeType) {
				if(_motherForm.agree2 != null && _motherForm.agree2 != undefined) {
					_motherForm.agree2.value = 'Y';
					//$('#term3').css('background-color','#4C6C8D');
					$('#term3').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else if("3" == _agreeType) {
				if(_motherForm.custInfoSubmitAgree != null && _motherForm.custInfoSubmitAgree != undefined) {
					_motherForm.custInfoSubmitAgree.checked = true;
					$("#btnOk").attr("src", "/resource/images/common/new_mobil/btn_confirmat.gif");
					
					this.submitCustInfoSubmitAgree(_motherForm); //Weblog 남기기
				}
			
			} else if("4" == _agreeType) {
				if(_motherForm.agree3 != null && _motherForm.agree3 != undefined) {
					_motherForm.agree3.value = 'Y';
					//$('#term4').css('background-color','#4C6C8D');
					$('#term4').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else if("5" == _agreeType) {
				
				var agreeForm = document.forms['creditForm'];
				if (!agreeForm.credit_collect1[1].checked || !agreeForm.credit_collect2[1].checked ||  
					!agreeForm.credit_collect3[1].checked || !agreeForm.credit_collect4[1].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				
				if(_motherForm.agree4 != null && _motherForm.agree4 != undefined) {
					_motherForm.agree4.value = 'Y';
					//$('#term2').css('background-color','#4C6C8D');
					$('#term2').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else if("6" == _agreeType || "7" == _agreeType || "8" == _agreeType || "9" == _agreeType || "10" == _agreeType || "11" == _agreeType ||
					"20" == _agreeType || "21" == _agreeType || "22" == _agreeType || "23" == _agreeType || "30" == _agreeType || "36" == _agreeType) {
				copyAndCheckFnc(_motherForm,_agreeType,_oDiv);
			} else if ("12" == _agreeType){
				
				var agreeForm = document.forms['frmLoanAgree'];
				if (!agreeForm.inquiry_agree1_gs[0].checked || !agreeForm.inquiry_agree2_gs[0].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "약관내용에 동의를 하셔야 진행이 가능합니다."
					});
					return false;
				}
				
				if(_motherForm.signAgreeContents12 != null && _motherForm.signAgreeContents12 != undefined) {
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.signAgreeContents12);
					$('#term12').removeClass("btn_s1").addClass("btn_s2").text("동의함"); //.css('background-color','#4C6C8D');
					
					$('#GS_CALTEX_AGREE_DIV').hide(0,function(){
						$('#agreeListDiv').show();
					});
					return false;
				}
				
			} else if("13" == _agreeType) {
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.prsonal_agree1[1].checked || !agreeForm.prsonal_agree2[1].checked || !agreeForm.prsonal_agree3[1].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				if(_motherForm.agree32 != null && _motherForm.agree32 != undefined) {
					_motherForm.agree32.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree32);
					$('#term13').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}

			} else if("14" == _agreeType) {
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.agree_01.checked == true || !agreeForm.agree_02.checked == true || !agreeForm.agree_03.checked == true || !agreeForm.agree_04.checked == true ){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				
				if(_motherForm.agree33 != null && _motherForm.agree33 != undefined) {
					_motherForm.agree33.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree33);
					//$('#term1').css('background-color','#4C6C8D');
					$('#term14').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}

			} else if("15" == _agreeType) {
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.prsonal_agree1[1].checked || !agreeForm.prsonal_agree2[1].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				
				if(_motherForm.agree34 != null && _motherForm.agree34 != undefined) {
					_motherForm.agree34.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree34);
					//$('#term1').css('background-color','#4C6C8D');
					$('#term15').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}

			} else if("38" == _agreeType) {
				
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.inquiry_agree1[1].checked || !agreeForm.inquiry_agree2[1].checked || !agreeForm.inquiry_agree3[1].checked || !agreeForm.inquiry_agree4[1].checked){
					hanaDialog.openAlert({
						title : "알림",
						message : "동의를 하셔야 진행이 가능합니다."
					});
					return;
				}
				
				if(_motherForm.agree38 != null && _motherForm.agree38 != undefined) {
					_motherForm.agree38.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree38);
					$('#term38').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else if("39" == _agreeType) {
				
				if(_motherForm.agree39 != null && _motherForm.agree39 != undefined) {
					_motherForm.agree39.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree39);
					$('#term39').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else if("40" == _agreeType) {
				var agreeForm = document.forms['agreeForm'];
				if (!agreeForm.credit_collect1[1].checked || !agreeForm.credit_collect2[1].checked ||  
						!agreeForm.credit_collect3[1].checked || !agreeForm.credit_collect4[1].checked){
						hanaDialog.openAlert({
							title : "알림",
							message : "동의를 하셔야 진행이 가능합니다."
						});
						return;
					}
				
				if(_motherForm.agree40 != null && _motherForm.agree40 != undefined) {
					_motherForm.agree40.value = 'Y';
					copyDivInnerHTMLToHiddenValue(_oDiv,_motherForm.agree40);
					$('#term40').removeClass("btn_s1").addClass("btn_s2").text("동의함");
				}
			
			} else {
				alert("ERROR : 해당 약관내용 없음.");
				return;
			}
			
			toggleMainSubDiv();
		},
		/////////////////////////////////////////////////////////////
		
		viewAgreeContent : function(_agreeType) {
			
			if(!$('#agreeContent_'+_agreeType).hasClass('close')) {
				$('#agreeContent_'+_agreeType).addClass('close').next('dd').slideDown(150);
			} else {
				$('#agreeContent_'+_agreeType).removeClass('close').next('dd').slideUp(150);
			}
			
		},
		
		checkAgree : function(_checkAgreeType, _yn) {
			
			if( _checkAgreeType != null && _checkAgreeType != undefined && _yn != null && _yn != undefined ) {
				alert(_checkAgreeType + " : " + $('#'+_checkAgreeType).val());
				$('#'+_checkAgreeType).val(_yn);
				alert(_checkAgreeType + " : " + $('#'+_checkAgreeType).val());
			}
						
		},
		
		/**
		 * 대출 동의서제출 페이지에서 
		 * 다음 페이지로 이동한다.
		 * 
		 * @author 
		 * @since 2017.02.02
		 * @param {Object} oForm
		 */
		submitAgreeForm : function(oForm) {
			
			if (oForm != null && oForm != undefined) {

				var _checkAgree01 = oForm.checkAgree01.value;
				var _checkAgree02 = oForm.checkAgree02.value;
				var _checkAgree03 = oForm.checkAgree03.value;
				var _checkAgree04 = oForm.checkAgree04.value;
				var _checkAgree05 = oForm.checkAgree05.value;
				var _checkAgree06 = oForm.checkAgree06.value;
				var _checkAgree07 = oForm.checkAgree07.value;
				var _checkAgree08 = oForm.checkAgree08.value;
				var _checkAgree09 = oForm.checkAgree09.value;
				var _checkAgree10 = oForm.checkAgree10.value;
				
				if (_checkAgree01 != "Y" || _checkAgree02 != "Y" || _checkAgree03 != "Y" || _checkAgree04 != "Y" ) {
					alert('<b>개인(신용)정보 조회 동의서</b>에 동의 하셔야<br/>대출신청이 가능 합니다.');
					return;
				}
				
				if (_checkAgree05 != "Y" || _checkAgree06 != "Y" || _checkAgree07 != "Y" || _checkAgree08 != "Y") {
					alert('<b>필수 개인신용정보 수집·이용 동의(가계여신 금융거래)</b>에<br/>동의 하셔야 대출신청이 가능 합니다.');
					return;
				}

				if (_checkAgree09 != "Y") {
					alert('<b>고객정보 자동 변경</b>에<br/>동의 하셔야 대출신청이 가능 합니다.');
					return;
				}				

				if (_checkAgree10 != "Y") {
					alert('<b>대출 승인완료시 SMS통보 동의</b>에<br/>동의 하셔야 대출신청이 가능 합니다.');
					return;
				}
				
			}

		},	// [end] submitAgreeForm
		
		/**
		 * 직장조회 팝업을 연다.
		 *
		 * @param {Object} oOfficeSearchedForm 직장조회 후 선택한 직장/직위 출력 Form(부모창의 Form)
		 * @author 임병진
		 * @since 2016-12-30
		 */
		openPopupOfficeSearch : function(oOfficeSearchedForm) {
			this.oOfficeSearchedForm = oOfficeSearchedForm;
			
			var hanaJQuery = new HanaJQuery(null, true, null);
            hanaJQuery.ajaxSubLoad('/mobilebranch/loan/msmbr003_11_01.do', null, null,false);
		},
		
		/**
		 * 직장조회 팝업 STEP02로 이동.
		 *
		 * @author 임병진
		 * @since 2016-12-30
		 */
		submitStep02OfficeSearchInPopup : function(oForm) {

			if(!msb.util.valid.isNull(oForm.companyNm, "직장명")) return;
			
			var hanaJQuery = new HanaJQuery('workSearchResultDiv', true, null); //officeSearchDivInPopup
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_11_02.do', oForm, null);
			
		},
		
		/**
		 * 직장조회 팝업 STEP03로 이동.
		 *
		 * @author 임병진
		 * @since 2016-12-30
		 *
		 * @param {Object} oForm
		 * @param {Object} _flag 직장조회 목록에서 링크 할 경우 : "linked", 직장조회 검색 결과가 없을 경우 : null or "" 
		 */
		submitStep03OfficeSearchInPopup : function(oForm, _flag) {
            if (_flag != null && _flag != undefined) {
                if (_flag == "linked") {
					if (oForm == null || oForm == undefined) {
					} else {
						msb.util.form.createHiddenField(oForm, 'linked', 'linked');
					}
                }
            }
            
            var hanaJQuery = new HanaJQuery(msb.HANA_SUB_CONTENT, true, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_11_03.do', oForm,
					function() {
						msb.util.scrollTop(0);
					});
            
		}, //[end] submitStep03OfficeSearchInPopup

		
		/**
		 * 직장조회 팝업 STEP04로 이동.
		 *
		 * @author 임병진
		 * @since 2016-12-30
		 */
		submitStep04OfficeSearchInPopup : function(oForm) {
			
			var hanaJQuery = new HanaJQuery(msb.HANA_SUB_CONTENT, true, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_11_04.do', oForm,
					function() {
						msb.util.scrollTop(0);
					});
            
		}, //[end] submitStep04OfficeSearchInPopup
			
		
		/**
		 * 직군조회 화면에서 selectBox Clear
		 */
		handleClearSearchedSelectBox : function(oSelectBox) {
            for (var i = oSelectBox.options.length; i >= 0 ; i--) {
                oSelectBox.options[i] = null;
            }
			oSelectBox.options[0] = new Option("선택하세요","");
		}, //[end]
		
		/**
		 * 직장 검색 실행 후 Select Box 의 Option으로 목록 출력.
		 */
		submitSearchOffice : function(oForm) {
			
			if(!msb.util.valid.isNullSelect(oForm.jikgun, "직군명")) return;
			
			var oSelectOffice = oForm.officeCd; // 직장 SelectBox

			this.handleClearSearchedSelectBox(oSelectOffice); // 직장 Clear
			this.handleClearSearchedSelectBox(oForm.jikjongCd); // 직종 Clear
			this.handleClearSearchedSelectBox(oForm.jikwiCd); // 직위 Clear
			
			
			// 2009. 02. 17 전문 입력 항목명이 ocpgrCd로 변경됨.
			// var oSendForm = form.createForm([{id: 'ocpgrNm',value: oForm.jikgun.value}]);
			var oSendForm = msb.util.form.createForm([{id: 'ocpgrCd',value: oForm.jikgun.value}]);
			
			
			var hanaJQuery = new HanaJQuery(null, true);
            hanaJQuery.ajaxSubmit("/mobilebranch/loan/msmbr003_11_05.do", oSendForm, function(httpRequest, textStatus) {
                var _data = jQuery.parseJSON(httpRequest.responseText);

				if (_data.officeList != null) {
					for(var i = 0; i < _data.officeList.length; i++) {
						oSelectOffice.options[i + 1] = new Option(_data.officeList[i].wkplNm, _data.officeList[i].wkplCd);
					}
				}
				
            });
			
		}, 
		
		/**
		 * 직종 검색
		 * @param {Object} oForm
		 */
		submitSearchJikjong : function(oForm) {
						
			var oSelectJikjong = oForm.jikjongCd; // 직장 SelectBox

			this.handleClearSearchedSelectBox(oSelectJikjong); // 직종 Clear
			this.handleClearSearchedSelectBox(oForm.jikwiCd); // 직위 Clear
			
            var oSendForm = msb.util.form.createForm([
				{id: 'ocpgrCd',value: oForm.jikgun.value} // 직군명 
				, {id: 'wkplCd', value: oForm.officeCd.value} // 직장명
			]);

            
            var hanaJQuery = new HanaJQuery(null, true);
            hanaJQuery.ajaxSubmit("/mobilebranch/loan/msmbr003_11_06.do", oSendForm, function(httpRequest, textStatus) {
                var _data = jQuery.parseJSON(httpRequest.responseText);

                if (_data.jikjongList != null) {
					for(var i = 0; i < _data.jikjongList.length; i++) {
						oSelectJikjong.options[i + 1] = new Option(_data.jikjongList[i].ocpkNm, _data.jikjongList[i].ocpkCd);
					}
				}
				
            });
            
		}, //[end] submitSearchJikjong
		
		
		/**
		 * 직위 검색
		 * @param {Object} oForm
		 */
		submitSearchJikwi : function(oForm) {

			var oSelectJikwi = oForm.jikwiCd; // 직위 SelectBox
			this.handleClearSearchedSelectBox(oSelectJikwi); // 직위 Clear

            var oSendForm = msb.util.form.createForm([
				{id: 'ocpgrCd', value: oForm.jikgun.value} // X(2), 직군코드
				, {id: 'wkplCd', value: oForm.officeCd.value} // X(2), 직장코드
				, {id: 'ocpkCd', value: oForm.jikjongCd.value} // X(2), 직종코드
			]);
			
            
            var hanaJQuery = new HanaJQuery(null, true);
            hanaJQuery.ajaxSubmit("/mobilebranch/loan/msmbr003_11_07.do", oSendForm, function(httpRequest, textStatus) {
                var _data = jQuery.parseJSON(httpRequest.responseText);

                if (_data.jikwiList != null) {
					for(var i = 0; i < _data.jikwiList.length; i++) {
						oSelectJikwi.options[i + 1] = new Option(_data.jikwiList[i].posnNm, _data.jikwiList[i].posnCd);
					}
				}
				
            });
            
		}, //[end] submitSearchJikjong
		
		
		/**
		 * 선택한 직종,직위값을 부모창으로 전달 한다. (직군검색 팝업)
		 * @since 2008-05-26
		 * @author Jiho Park
		 */
		submitSelectedJikjongJikwi : function(oForm) {
			
			if(!msb.util.valid.isNullSelect(oForm.jikgun, "직군명")) return;
			if(!msb.util.valid.isNullSelect(oForm.officeCd, "직장명")) return;
			if(!msb.util.valid.isNullSelect(oForm.jikjongCd, "직종")) return;
			if(!msb.util.valid.isNullSelect(oForm.jikwiCd, "직위")) return;
			
			// 직군명
			var _jikgunNm = oForm.jikgun.options[oForm.jikgun.selectedIndex].text;

			// 직군코드
			var _jikgunCd = oForm.jikgun.options[oForm.jikgun.selectedIndex].value;

			// 직종코드
			var _jikjongCd = oForm.jikjongCd.options[oForm.jikjongCd.selectedIndex].value;
			
			// 근무부서 -> 직위로 변경함(2008. 12. 23)
			var _jikwiNm = oForm.jikwiCd.options[oForm.jikwiCd.selectedIndex].text;
			
			// 임시(변수) 직위코드
			var _tmpJikwiCd = oForm.jikwiCd.options[oForm.jikwiCd.selectedIndex].value;

			// 직위코드
			var _jikwiCd = _tmpJikwiCd.substring(0,2);
			
			// ???
			var search = _tmpJikwiCd.substring(2,3);
			
			// ???
			var jobParty = _tmpJikwiCd.substring(3);
			
			// 직장코드
			var _officeCd = oForm.officeCd.options[oForm.officeCd.selectedIndex].value;
			
			
			// 부모 Form
			//var oDestForm = document.forms['guaranteeForm'];
			var oDestForm = this.oOfficeSearchedForm;
			
			var _ocpClasCd = _jikgunCd + _officeCd + _jikjongCd + _jikwiCd; // 전문에 전송할 직장코드

			// 사용자가 검색한 직장명
			if(oDestForm.wkplNm != undefined) {
				oDestForm.wkplNm.value = oForm.companyNm.value;
			}

//			// 화면에 보여줄  근무부서
//			if(oDestForm.wkgDeptNm != undefined) {
//				oDestForm.wkgDeptNm.value = _jikgunNm + "/" + _jikwiNm;
//			}
			
			// 직위명
			if(oDestForm.posnNm != undefined) {
				oDestForm.posnNm.value = _jikgunNm + "/" + _jikwiNm;
			}

			// 직업분류코드
			if(oDestForm.ocpClasCd != undefined) {
				oDestForm.ocpClasCd.value = _ocpClasCd; 
			}
			
//			// 직무구분코드
//			if(oDestForm.ofdyDvCd != undefined) {
//				oDestForm.ofdyDvCd.value = jobParty;
//			}

			// TODO 아래 항목은 삭제 된듯 싶은데 확인후 삭제 할것(2008. 12. 23)
//			// 직장코드
//			if(oDestForm.wkplCd != undefined) {
//				oDestForm.wkplCd.value = _ocpClasCd;
//			}
//			// 직위코드
//			if(oDestForm.posnCd != undefined) {
//				oDestForm.posnCd.value = jobParty; 
//			}
			
			toggleMainSubDiv();
			
		}, //[end] submitSelectedJikjongJikwi
		
		/**
		 * 선택한 직종,직위값을 부모창으로 전달 한다. (직장검색 팝업)
		 *
		 * @since 2008-05-26
		 * @author Jiho Park
		 */
		submitSelectedJikjongJikwi2 : function() {

			var checkedVal = $('input:radio[name=office_position]:checked').val();
			
			if (checkedVal == undefined || checkedVal == null || checkedVal == ''){
				hanaDialog.openAlert({
					title : "알림",
					message : "직종,직위를 선택해주세요."
				});				
				return false;
			}
			
			var oForm = document.forms['frmJikjongJikwiInPopup'+checkedVal]; 
			
			var _officeCd = oForm.wkplCd.value; // 직장코드
			var _jikgunCd = oForm.ocpgrCd.value; // 직군코드
			var _jikjongCd = oForm.ocpkCd.value; // 직종코드
			var _jikwiCd = oForm.posnCd.value; // 직위코드
			var _ofdyDvCd = oForm.ocpGrdCd.value; // 직업군코드

			var _ocpClasCd = _jikgunCd + _officeCd + _jikjongCd + _jikwiCd; // 전문에 전송할 직장코드

			// 부모 Form
			//var oDestForm = document.forms['guaranteeForm'];
			var oDestForm = this.oOfficeSearchedForm;

			// 사용자가 검색한 직장명
			if(oDestForm.wkplNm != undefined) {
				oDestForm.wkplNm.value = oForm.companyNm.value;
			}
			
			// 화면에 보여줄  근무부서
			if(oDestForm.wkgDeptNm != undefined) {
//				oDestForm.wkgDeptNm.value = oForm.jikjongNm.value + "/" + oForm.wkgDeptNm.value;
				oDestForm.posnNm.value = oForm.ocpkNm.value + "/" + oForm.posnNm.value;
			}
			if(oDestForm.wkplCd != undefined) {
				oDestForm.wkplCd.value = _ocpClasCd; // 전문에 전송할 직장코드
			}
			if(oDestForm.posnCd != undefined) {
				oDestForm.posnCd.value = _ofdyDvCd; // 전문에 전송할 직위코드
			}
			if(oDestForm.ocpClasCd != undefined) {
				oDestForm.ocpClasCd.value = _ocpClasCd;
			}
//			if(oDestForm.ofdyDvCd != undefined) {
//				oDestForm.ofdyDvCd.value = _ofdyDvCd;
//			}

			toggleMainSubDiv();

		}, //[end] submitSelectedJikjongJikwi2
		//상품별 금리조회
		goIrtByPrd: function(branchCode){ 
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_11_30.do', null, null, false);
		},

		//대출신청
		goLoanSubmitStep4_noLogin : function(_formObj){
//			alert(_formObj.phoneNum);
//			
//			if(!msb.util.valid.isNull(_formObj.phoneNum, "연락처")) return;
//			if(!msb.util.valid.isTelnum(_formObj.phoneNum)) return;
			if(!msb.util.valid.isNull(_formObj.wkplNm, "직장명")) return;
			
			if(!msb.util.valid.isNull(_formObj.offerAmount, "신청금액")) return;
			if(!msb.util.valid.isNull(_formObj.loanType, "대출종류")) return;
			if(!msb.util.valid.isNull(_formObj.branchNm, "대출받을 지점")) return;
			
			//_formObj.yearlyIncome.value = Number(msb.util.format.stripCommas(_formObj.yearlyIncome.value));
			_formObj.offerAmount.value = Number(msb.util.format.stripCommas(_formObj.offerAmount.value));
		
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, true, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr003_13.do', _formObj,
					function() {
						msb.util.scrollTop(0);
					});
		},
		
	};
}();

/**
 * MSB - PBK - 모바일 브랜치 - 주소조회
 * @author 
 * @since 
 */
msb.pbk.mobilebranch.address = function() {
	
	var oTmpForm = null;
	
	return {
		
		/**
	     * 특수문자 입력 제외 
	     */
		isEtcChar : function (value) {
			var chars = "~!@#$%^&*()`_+|=\{}[]:;\"'<>?,./";
	        return msb.pbk.mobilebranch.address.containsEtcChars(value, chars);
		},	
		
		/**
	     * 입력값에 특정 문자(chars)가 포함되어 있는지 확인
	     * 특정 문자만 비허용하려 할 때 사용
	     */
	     containsEtcChars : function (value,chars) {
			for (var inx = 0; inx < value.length; inx++) {
				if (chars.indexOf(value.charAt(inx)) > -1)
					return false;
           	}
           	return true;
        },
        
        /**
		 * @param _sidoCd 시/도 코드
		 * @param _gugunSelectBoxId 구/군 SelectBox ID
		 */
		handleSelectBoxGugun : function(_sidoCd, _gugunSelectBoxId) {
			var _sido     =  _sidoCd.split('|'); //코드 | 명
			var oSendForm = msb.util.form.createForm([{id:"queryType",value:"gugun"},{id:"queryCode",value:_sido[0]}]);

			var oGugunSelectBox = document.getElementById(_gugunSelectBoxId);
			
			if(_sido[0] == "36"){//세종시 (시 군 구 미존재)
				msb.util.selectbox.clearOptions(oGugunSelectBox);
				oGugunSelectBox.options[0] = new Option("시 군 구 미존재", "");  //(Key, Value)
				oGugunSelectBox.disabled = true;
			}else{
				msb.util.selectbox.clearOptions(oGugunSelectBox);
				oGugunSelectBox.options[0] = new Option("", "");  //(Key, Value)
				oGugunSelectBox.disabled = false;
				var hanaJQuery = new HanaJQuery(null, true);
				hanaJQuery.ajaxSubmit("/common/nwAdrRgnAction.do" , oSendForm , function(httpRequest, textStatus) {
							        	// JSON 오브젝트로 변환 - 웹취약 대응
							        	var _data = jQuery.parseJSON(httpRequest.responseText);
//										var _data = eval('(' + httpRequest.responseText + ')');
										if(_data.pmh0110OutRecList == null || _data.pmh0110OutRecList == undefined) { 
											return; 
										}
										var oPmh0110OutRecList = _data.pmh0110OutRecList;
										oGugunSelectBox.options[0] = new Option("선택하세요", "");  //(Key, Value)
										for(var i = 0; i < oPmh0110OutRecList.length; i++){
											oGugunSelectBox.options[i + 1] = new Option(oPmh0110OutRecList[i].nwAdrSkkNm , oPmh0110OutRecList[i].nwAdrSkkNm);
										}
									});
			}
		},
        
		/**
		 * 지번, 도로명 탭 변경
		 */
		gibenDolonmChange : function (homeOfficeGubun, searchGb) {
        	var url = "";
        	if(searchGb == "G"){
        		url = "/mobilebranch/loan/msmbr004_02_01.do";
        	} else {
        		url = "/mobilebranch/loan/msmbr004_02_04.do";
        	}
        	var oSendForm = msb.util.form.createForm( [ {id : 'homeOfficeGubun', value : homeOfficeGubun},
        	                                            {id : 'searchGb', value : searchGb}]);
			var hanaJQuery = new HanaJQuery(msb.HANA_SUB_CONTENT, true);
			hanaJQuery.ajaxLoad(url, oSendForm, null);
        },		
		/**
		 * 우편번호 찾기 화면을 실행(open)한다.
		 */
		openPostNoSearch : function(homeOfficeGubun, searchGb) {
			var oSendForm = msb.util.form.createForm( [ {id : 'homeOfficeGubun', value : homeOfficeGubun},
        	                                            {id : 'searchGb', value : searchGb}]);
			 
			var hanaJQuery = new HanaJQuery(msb.HANA_SUB_CONTENT, true);
			hanaJQuery.ajaxSubLoad('/mobilebranch/loan/msmbr004_02_01.do', oSendForm, null, false);
		},
		/**
		 * 읍/면/동 이름으로 우편번호 찾기를 실행 한다.
		 */
		searchPostNo : function(formObj) {
			if(!msb.util.valid.isNullSelect(formObj._sdNm, "시도")) return false;
			if(!msb.util.valid.isNull(formObj.emdNm, "동/읍/면 이름")) return false;
			
			if(formObj.emdNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.emdNm.value)) {
				hanaDialog.openAlert({title:"오류", message:'동/읍/면 이름에 특수문자는 입력할 수 없습니다.'});
				return;
			}
			
			var sdNm; //시도명
			var tagListSdNm =  formObj._sdNm.value.split('|'); //코드 | 코드명 (시도)

			
			//충청북도 : 43 , 충청남도 : 44
			//전라북도 : 45 , 전라남도 : 46
			//경상북도 : 47 , 경상남도 : 48
			if(tagListSdNm[0] == 43 ||tagListSdNm[0] == 44 || tagListSdNm[0] == 45 ||
				tagListSdNm[0] == 46 || tagListSdNm[0] == 47 || tagListSdNm[0] == 48){
				sdNm = tagListSdNm[1].substring(0,1) + tagListSdNm[1].substring(2,3);
			}else{
				sdNm =  tagListSdNm[1].substring(0,2);
			}
			
			msb.util.form.createHiddenField(formObj, 'sdNm' , sdNm); //시도명
			
			var hanaJQuery = new HanaJQuery('divPostNoSearchResult', true);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr004_02_02.do', formObj, null);
		},
		/**
		 * 도로명 주소로 우편번호 찾기를 실행 한다.
		 */
		dolonmSearchPostNo : function(formObj) {
			if(!msb.util.valid.isNullSelect(formObj._nwAdrSdNm, "시도")) return false;
			if(!msb.util.valid.isNull(formObj.nwAdrRoadNm, "도로명")) return false;
			if(!msb.util.valid.isNull(formObj.nwAdrEmdNm, "읍면동명")) return false;
			
			var tagListSdNm = formObj._nwAdrSdNm.value.split("|"); //코드 | 코드명 (시도)

			if(tagListSdNm[0] != "36") { //세종시 (시군구 미존재) - 필수 체크 제외
				if(formObj.nwAdrSkkNm.value == "") {
					opb.common.layerpopup.openAlert_fnc("입력오류", "시군구를 입력하세요.", "nwAdrSkkNm");
					return;
				}
			}
			
			if(formObj.nwAdrRoadNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.nwAdrRoadNm.value)) {
				hanaDialog.openAlert({title:"오류", message:'도로명에 특수문자는 입력할 수 없습니다.'});
				return;
			}

			if(formObj.nwAdrEmdNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.nwAdrEmdNm.value)) {
				hanaDialog.openAlert({title:"오류", message:'읍면동명에 특수문자는 입력할 수 없습니다.'});
				return;
			}
			
			msb.util.form.createHiddenField(formObj, "nwAdrSdNm" , tagListSdNm[1]);
			msb.util.form.createHiddenField(formObj, "nwAdrBldNm", formObj._nwAdrBldNm.value); // 건물명
			
			var hanaJQuery = new HanaJQuery('divPostNoSearchResult', true);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr004_02_05.do', formObj, function(){
				msb.util.scrollTop('divPostNoSearchResult');
			});
		},
		/**
		 * 읍/면/동 부모창으로 셋팅
		 */
		selectPostNoAdress : function(formObj) {
			var url = "";
        	if(formObj.searchGb.value == "G"){
        		url = "/mobilebranch/loan/msmbr004_02_03.do";
        	} else {
        		url = "/mobilebranch/loan/msmbr004_02_06.do";
        	}
			var hanaJQuery = new HanaJQuery(msb.HANA_SUB_CONTENT, true);
			hanaJQuery.ajaxLoad(url, formObj, null);
		},
		/**
		 * 구조형태 선택 selectbox
		 * aptNm : 아파트명
		 * vlgNm : 마을명
		 */
		selectDwlShpCd: function(obj, formObj){
			// 아파트
			if(obj.value == "01"){
				formObj.aptNm.value    = formObj.aptNm_1.value;            		// 아파트명
				formObj.exAdr100.value = "";                               		// 부속주소
			    $("#shpcd02").show();    		// 아파트명
			    $("#shpcd03").show();     		// 동호수
			    $("#shpcd04").hide(); 		// 부속주소
			    $("#shpcd02_1").html("아파트명");
			}
			// 빌라
			else if(obj.value == "02"){ 
				formObj.aptNm.value    = formObj.aptNm_1.value;         		// 빌라명
				formObj.exAdr100.value = "";                            		// 부속주소
			    $("#shpcd02").show(); 			// 빌라명
			    $("#shpcd03").show(); 			// 동호수
			    $("#shpcd04").hide(); 		// 부속주소
			    $("#shpcd02_1").html("빌라명");
			}
			// 연립&다세대
			else if(obj.value == "03"){
				formObj.aptNm.value    = formObj.aptNm_1.value; 				// 연립&다세대명
				formObj.exAdr100.value = ""; 									// 부속주소
			    $("#shpcd02").show(); 			// 연립&다세대명
			    $("#shpcd03").show(); 			// 동호수
			    $("#shpcd04").hide(); 		// 부속주소
			    $("#shpcd02_1").html("연립명");
			}
			
			// 오피스텔
			else if(obj.value == "04"){ 
				formObj.aptNm.value    = formObj.aptNm_1.value; 				// 오피스텔명
				formObj.exAdr100.value = ""; 									// 부속주소
			    $("#shpcd02").show(); 			// 오피스텔명
			    $("#shpcd03").show(); 			// 동호수
			    $("#shpcd04").hide(); 		// 부속주소
			    $("#shpcd02_1").html("오피스텔명");
			}
			//단독(05), 기타(99)
			else if (obj.value == "05" || obj.value == "99"){ 
			    formObj.aptNm.value 	= "";
			    formObj.bldApdgNm.value	= ""; 									// 동
			    formObj.athnCntNm.value	= ""; 									// 호수
				formObj.exAdr100.value  = formObj.exAdr_1.value; 				// 부속주소
			    $("#shpcd02").hide(); 		//오피스텔명
			    $("#shpcd03").hide(); 		//동호수
			    $("#shpcd04").show(); 			//부속주소
			}
		},
		/*주소값 셋팅하는 로직1*/
		jusoSearchList_02: function(_form){
			var formObj = msb.util.form.createForm();
			formObj = _form;
			if(!msb.util.valid.isNullSelect(formObj.dwlShpCd, "구조형태")) return false;
			
			//구조형태관련
		    var tempAptNm      = "";
		    var tempStrShpCdNm = "";
		    var tempVlgNm      = "";
		    var tempAptApdgCnt = "";
		    var tempAptAthnCnt = "";
		    var tempOwhmExAdr  = "";
		    
		    if(formObj.dwlShpCd.value == "01"){
		    	tempStrShpCdNm = "아파트";
		    } else if(formObj.dwlShpCd.value == "02"){
		    	tempStrShpCdNm = "빌라";
		    } else if(formObj.dwlShpCd.value == "03"){
		    	tempStrShpCdNm = "연립";
		    } else if(formObj.dwlShpCd.value == "04"){
		    	tempStrShpCdNm = "오피스텔";
		    } else if(formObj.dwlShpCd.value == "05"){
		    	tempStrShpCdNm = "단독";
		    } else {
		    	tempStrShpCdNm = "기타";
		    }
		    
		    // 아파트, 빌라, 연립, 오피스텔, 단독
		    if(formObj.dwlShpCd.value == "01" || formObj.dwlShpCd.value == "02" || formObj.dwlShpCd.value == "03" || formObj.dwlShpCd.value == "04"){
	            if(!msb.util.valid.range(formObj.aptNm, 1, 30, tempStrShpCdNm)) return false;
				tempAptNm      = formObj.aptNm.value + tempStrShpCdNm;
				
	            if(!msb.util.valid.range(formObj.bldApdgNm, 1, 20,"동")) return false;
	            if(!msb.util.valid.range(formObj.athnCntNm, 1, 12,"호")) return false;
		
				if(formObj.aptNm.value.indexOf(tempStrShpCdNm)>0){
					hanaDialog.openAlert({title:"오류", message:tempStrShpCdNm + ' 항목에 [' + tempStrShpCdNm + ']는 입력하지 않으셔도 됩니다.'});
					return false;
				}
		    } else if(formObj.dwlShpCd.value == "05"){		// 단독
				tempAptNm      = formObj.aptNm.value + "단독";
				tempStrShpCdNm = "단독";
		    }

			if(formObj.bldApdgNm != undefined) {
				if(formObj.bldApdgNm.value != ""){
					if(formObj.bldApdgNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.bldApdgNm.value)) {
						hanaDialog.openAlert({title:"오류", message:'동호수에 특수문자는 입력할 수 없습니다.'});
						return;
					}
					if(formObj.bldApdgNm.value.indexOf("동")>0){
				    	hanaDialog.openAlert({title:"오류", message:'동 항목에 [동]은 입력하지 않으셔도 됩니다.'});
				    	return false;
				    }
					tempAptApdgCnt = formObj.bldApdgNm.value + "동 ";
				}
			}
			
			if(formObj.athnCntNm != undefined) {
				if(formObj.athnCntNm.value != ""){
				    if(formObj.athnCntNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.athnCntNm.value)) {
				    	hanaDialog.openAlert({title:"오류", message:'동호수에 특수문자는 입력할 수 없습니다.'});
				    	return;
				    }
				    if(formObj.athnCntNm.value.indexOf("호")>0){
				    	hanaDialog.openAlert({title:"오류", message:'호 항목에 [호]는 입력하지 않으셔도 됩니다.'});
				    	return false;
				    }
				    tempAptAthnCnt = formObj.athnCntNm.value+"호";
				}
			}
			
			if(formObj.aptNm != undefined) {
				if(formObj.aptNm.value != "" && !msb.pbk.mobilebranch.address.isEtcChar(formObj.aptNm.value)) {
					hanaDialog.openAlert({title:"오류", message:tempStrShpCdNm + '에 특수문자는 입력할 수 없습니다.'});
					return;
				}
			}
			if(formObj.searchGb.value == "G"){
				if(formObj.dwlShpCd.value == "05" || formObj.dwlShpCd.value == "99"){
					if(formObj.nwAdrManLdno1.value.trim() == ""){
						hanaDialog.openAlert({title:"오류", message:'지번은 필수 입력항목 입니다.'});
						return false;            			
					}
					if(formObj.nwAdrManLdno1.value.trim() == ""){ //번지 미입력
						tempOwhmExAdr = formObj.exAdr100.value;
					}else{
						if(formObj.nwAdrSbLdno1.value.trim() == ""){
							tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
						}else{
							tempOwhmExAdr = formObj.nwAdrManLdno1.value.trim() +"-"+ formObj.nwAdrSbLdno1.value.trim() +"번지 " +formObj.exAdr100.value;
						}
					}
				} else {
					if(formObj.nwAdrManLdno1.value.trim() == ""){
						tempOwhmExAdr = tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;
					}else{
						if(formObj.nwAdrSbLdno1.value.trim() == ""){
							tempOwhmExAdr = formObj.nwAdrManLdno1.value +"번지 ";
							tempOwhmExAdr = tempOwhmExAdr + tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;                			
						}else{
							tempOwhmExAdr = formObj.nwAdrManLdno1.value +" - "+ formObj.nwAdrSbLdno1.value +"번지 ";
							tempOwhmExAdr = tempOwhmExAdr + tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;           			
						}
					}
				}
			} else if(formObj.searchGb.value == "D"){
				msb.util.form.createHiddenField(formObj, 'exAdr110'     , formObj.exAdr100.value);       //부속주소110
				if(formObj.dwlShpCd.value == "05" || formObj.dwlShpCd.value == "99"){
					if(formObj.nwAdrManBldNo1.value.trim() == ""){ //건물번호 미존재
		        		if(formObj.exAdr100.value == ""){
		        			hanaDialog.openAlert({title:"오류", message:'부속주소 또는 건물번호는 필수 입력항목 입니다.'});
	                    	return false;            			
	            		}
		            	tempOwhmExAdr = "("+ formObj.exAdr100.value +")";
		        	}else{ //건물번호 존재
		        		if(formObj.nwAdrSbBldNo1.value.trim() == ""){
		        			tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
		        		}else{
		                	tempOwhmExAdr = formObj.nwAdrManBldNo1.value.trim() +"-"+ formObj.nwAdrSbBldNo1.value.trim() +",(" +formObj.exAdr100.value +")";
		        		}
		        	}
				} else {
					if(formObj.nwAdrManBldNo1.value.trim() == ""){
		            	tempOwhmExAdr = tempVlgNm + tempAptNm + " "+ tempAptApdgCnt + tempAptAthnCnt;
		            }else{
		            	if(formObj.nwAdrSbBldNo1.value.trim() == ""){
			            	tempOwhmExAdr = formObj.nwAdrManBldNo1.value + ",";
			            	tempOwhmExAdr = tempOwhmExAdr + tempAptApdgCnt + tempAptAthnCnt +"(" + tempVlgNm + tempAptNm +")";	 	            		
		            	}else{
			            	tempOwhmExAdr = formObj.nwAdrManBldNo1.value +"-" + formObj.nwAdrSbBldNo1.value +",";
			            	tempOwhmExAdr = tempOwhmExAdr + tempAptApdgCnt + tempAptAthnCnt +"(" + tempVlgNm + tempAptNm +")";	            		
		            	}
		            }
				}
			}
				
			msb.util.form.createHiddenField(formObj, 'strShpCdNm'  , $("#dwlShpCd option:selected").text());
			msb.util.form.createHiddenField(formObj, 'setExAdr2'   , tempOwhmExAdr);
			
			// 도로명
			var tempNwAdrManBldNo1 = "";
			var tempNwAdrSbBldNo1 = "";
			if(formObj.nwAdrManBldNo1 != undefined) tempNwAdrManBldNo1 = formObj.nwAdrManBldNo1.value;
			if(formObj.nwAdrSbBldNo1 != undefined) tempNwAdrSbBldNo1 = formObj.nwAdrSbBldNo1.value;
				
			msb.util.form.createHiddenField(formObj, 'nwAdrManBldNo', tempNwAdrManBldNo1);
			msb.util.form.createHiddenField(formObj, 'nwAdrSbBldNo' , tempNwAdrSbBldNo1);
			
			// 지번
			var tempNwAdrManLdno1 = "";
			var tempNwAdrSbLdno1 = "";
			if(formObj.nwAdrManLdno1 != undefined) tempNwAdrSbBldNo1 = formObj.nwAdrManLdno1.value;
			if(formObj.nwAdrSbLdno1 != undefined) tempNwAdrSbLdno1 = formObj.nwAdrSbLdno1.value;
			
			msb.util.form.createHiddenField(formObj, 'nwAdrManLdno', tempNwAdrManLdno1);
			msb.util.form.createHiddenField(formObj, 'nwAdrSbLdno' , tempNwAdrSbLdno1);
			
			msb.pbk.mobilebranch.address.newSetInfo_1(formObj);
			toggleMainSubDiv();
			if(formObj.homeOfficeGubun.value == "office"){
				msb.util.scrollTop("_wkplZipNo");
			}
		 },
		 /*주소값 셋팅하는 로직2(지번)*/
		 newSetInfo_1: function(formObj){
			 
			var _gb = formObj.gubun.value;
			var _exAdr1 = "";
			var _pmilSeqNo1 = "";
			var _pmilSeqNo2 = "";			 
			var _exAdr2 = "";
			var _owhmZipAdr = "";
			var _owhmExAdr = "";
			var gubn = "";
			var _adrRfngYn = "";
			 
			var _stdngCd = "";
			var _basZoneNo = "";
			var _basZoneBaseAdr1 = "";
			var _basZoneExAdr1 = "";
			var _basZoneEngAdr1 = "";
			var _basZoneBaseAdr2 = "";
			var _basZoneExAdr2 = "";
			var _basZoneEngAdr2 = "";
			
			if(_gb == "3"){ //직접입력
				_exAdr1 = formObj.setExAdr2.value;  //부속주소
				
				if(formObj.searchGb.value =="D"){ //도로명 선택
			 		gubn       = "3";
				 	_pmilSeqNo1 = formObj.nwAdrPmilSeqNo.value;  // 도로명 일련번호 
			 	}else{
			 		gubn       = "4";
			 		_pmilSeqNo1 = formObj.pmilSeqNo.value;      //우편번호 일련번호 
			 	}
				
				_adrRfngYn  = "N";
				_owhmZipAdr = formObj.custAdr2.value;
				_owhmExAdr  = formObj.setExAdr2.value;
				_pmilSeqNo2 = "0";
				_exAdr2     = ""; 
				
				_basZoneNo = formObj.zipNo.value;
				_basZoneBaseAdr1 = formObj.custAdr2.value;
				_basZoneExAdr1 = formObj.setExAdr2.value;
				if(formObj.adrRfngYnGb.value == "N"){
					formObj.nwAdrManBldNo.value = "0"; //신주소주건물번호1
					formObj.nwAdrSbBldNo.value  = "0"; //신주소부건물번호2
					formObj.nwAdrManLdno.value  = "0"; //신주소주지번1
					formObj.nwAdrSbLdno.value   = "0"; //신주소주지번2
				}
			}

			msb.util.form.createHiddenField(formObj, '_exAdr1'    , _exAdr1);			// 부속주소 
			msb.util.form.createHiddenField(formObj, '_pmilSeqNo1', _pmilSeqNo1);		// 우편번호 일련번호 
			msb.util.form.createHiddenField(formObj, '_pmilSeqNo2', _pmilSeqNo2);		// 우편일련번호(선택 반대값) 
			msb.util.form.createHiddenField(formObj, '_exAdr2'    , _exAdr2);			// 부속주소(선택 반대값)
			msb.util.form.createHiddenField(formObj, '_gb'        , gubn);				// 우편번호구분코드 (1:도로명, 2:지번) 
			msb.util.form.createHiddenField(formObj, 'adrRfngYn'  , _adrRfngYn);			// 정재된 주소 여부

			msb.util.form.createHiddenField(formObj, '_stdngCd'  , _stdngCd);
			msb.util.form.createHiddenField(formObj, '_basZoneNo'  , _basZoneNo);
			msb.util.form.createHiddenField(formObj, '_basZoneBaseAdr1'  , _basZoneBaseAdr1);
			msb.util.form.createHiddenField(formObj, '_basZoneExAdr1'  , _basZoneExAdr1);
			msb.util.form.createHiddenField(formObj, '_basZoneEngAdr1'  , _basZoneEngAdr1);
			msb.util.form.createHiddenField(formObj, '_basZoneBaseAdr2'  , _basZoneBaseAdr2);
			msb.util.form.createHiddenField(formObj, '_basZoneExAdr2'  , _basZoneExAdr2);
			msb.util.form.createHiddenField(formObj, '_basZoneEngAdr2'  , _basZoneEngAdr2);
			
			if(formObj.homeOfficeGubun.value == "office") { 			// MyHana 직장주소 
				$("#wkplExAdr1").val(_owhmZipAdr);
				$("#exAdr2").val(_owhmExAdr);	

				$("#wkplZipNo1").val(formObj.zipNo.value.substring(0,3)); // 우편번호 1
				$("#wkplZipNo2").val(formObj.zipNo.value.substring(3,6)); // 우편번호 2
				$("#_wkplZipNo").val(formObj.zipNo.value.substring(0,3) + "-" + formObj.zipNo.value.substring(3,6)); // 우편번호

				$("#pmilSeqNo2").val(_pmilSeqNo1);   // 우편번호 일련번호
				$("#zipNoDvCd2").val(gubn);          // 우편번호구분코드
				 
				msb.pbk.mobilebranch.address.createHiddenAddressMyhana(formObj);
			} else if(formObj.homeOfficeGubun.value == "home"){		// MyHana 자택주소 
				$("#owhmZipAdr").val(_owhmZipAdr);
			 	$("#owhmExAdr").val(_owhmExAdr);

			 	$("#owhmZipNo01").val(formObj.zipNo.value.substring(0,3)); // 우편번호 1
			 	$("#owhmZipNo02").val(formObj.zipNo.value.substring(3,6)); // 우편번호 2
			 	$("#_owhmZipNo").val(formObj.zipNo.value.substring(0,3) + "-" + formObj.zipNo.value.substring(3,6)); // 우편번호
			 	
			 	$("#pmilSeqNo").val(_pmilSeqNo1);                           // 우편번호 일련번호
			 	$("#zipNoDvCd").val(gubn);                                  // 우편번호구분코드
			 	$("#owhmZipNo").val(formObj.zipNo.value);                   // 우편번호	
			 	$("#etcAdr").val(_exAdr1);									// 부속주소
			 	
			 	$("#_strShpCdNm").val(formObj.strShpCdNm.value);			// 구조형태 이름
			 	$("#_vlgNm").val(formObj.vlgNm.value);						// 마을	
			 	$("#_aptNm").val(formObj.aptNm.value);                 		// 아파트명
			 	$("#_bldApdgNm").val(formObj.bldApdgNm.value);              // 동
			 	$("#_athnCntNm").val(formObj.athnCntNm.value);              // 호수				 
			 	$("#_dwlShpCd").val(formObj.dwlShpCd.value);                // 구조형태코드

			 	msb.pbk.mobilebranch.address.createHiddenAddressMyhana(formObj);
			}
		},
		/*주소값 셋팅하는 로직3(지번)*/
		createHiddenAddressMyhana : function(formObj){
			var hddnAddressField = "";
			// 자택 
			if(formObj.homeOfficeGubun.value == "home") {
				hddnAddressField += "<input type=\"hidden\" name=\"custInfoRegRlsDvCd560\" id=\"custInfoRegRlsDvCd560\" value=\"1\">";                               // 주소변경여부
				hddnAddressField += "<input type=\"hidden\" name=\"zipNo4\"                id=\"zipNo4\"                value=\""+formObj.zipNo.value+"\">";         // 우편번호
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo4\"            id=\"pmilSeqNo4\"            value=\""+formObj._pmilSeqNo1.value+"\">";   // 우편번호 일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"zipNoDvCd4\"            id=\"zipNoDvCd4\"            value=\""+formObj._gb.value+"\">";           // 우편번호구분코드 (1:도로명, 2:지번) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr4\"                id=\"exAdr4\"                value=\""+formObj._exAdr1.value+"\">";       // 부속주소 
				hddnAddressField += "<input type=\"hidden\" name=\"dwlShpCd4\"             id=\"dwlShpCd4\"             value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태 
				hddnAddressField += "<input type=\"hidden\" name=\"vlgNm4\"                id=\"vlgNm4\"                value=\""+formObj.vlgNm.value+"\">";         // 마을명 
				hddnAddressField += "<input type=\"hidden\" name=\"aptNm4\"                id=\"aptNm4\"                value=\""+formObj.aptNm.value+"\">";         // 아파트명 
				hddnAddressField += "<input type=\"hidden\" name=\"bldApdgNm4\"            id=\"bldApdgNm4\"            value=\""+formObj.bldApdgNm.value+"\">";     // 건물동명 
				hddnAddressField += "<input type=\"hidden\" name=\"athnCntNm4\"            id=\"athnCntNm4\"            value=\""+formObj.athnCntNm.value+"\">";     // 호수명 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd4\"        id=\"nwAdrRoadNmCd4\"        value=\""+formObj.nwAdrRoadNmCd.value+"\">"; // 신주소 도로명 코드
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo4\"        id=\"nwAdrEmdSeqNo4\"        value=\""+formObj.nwAdrEmdSeqNo.value+"\">"; // 신주소읍면동일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn4\"          id=\"nwAdrUdgrYn4\"          value=\""+formObj.nwAdrUdgrYn.value+"\">";   // 신주소지하여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo4\"        id=\"nwAdrManBldNo4\"        value=\""+formObj.nwAdrManBldNo.value+"\">"; // 신주소주건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo4\"         id=\"nwAdrSbBldNo4\"         value=\""+formObj.nwAdrSbBldNo.value+"\">";  // 신주소부건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo4\"       id=\"nwAdrBldMgntNo4\"       value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn4\"          id=\"nwAdrMntnYn4\"          value=\""+formObj.nwAdrMntnYn.value+"\">";   // 신주소산여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno4\"         id=\"nwAdrManLdno4\"         value=\""+formObj.nwAdrManLdno.value+"\">";  // 신주소주지번	
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno4\"          id=\"nwAdrSbLdno4\"          value=\""+formObj.nwAdrSbLdno.value+"\">";   // 신주소부지번
				hddnAddressField += "<input type=\"hidden\" name=\"adrRfngYn4\"            id=\"adrRfngYn4\"            value=\""+formObj.adrRfngYn.value+"\">";     // 정재된 주소 여부
				hddnAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm4\"       id=\"admSftNonBldNm4\"       value=\""+formObj.admSftNonBldNm.value+"\">";// 신주소건물명(행정안전부 건물명)
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo41\"           id=\"pmilSeqNo41\"           value=\""+formObj._pmilSeqNo2.value+"\">";   // 우편일련번호(선택 반대값) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr41\"               id=\"exAdr41\"               value=\""+formObj._exAdr2.value+"\">";       // 부속주소(선택 반대값)
				
				hddnAddressField += "<input type=\"hidden\" name=\"stdngCd4\"              id=\"stdngCd4\"              value=\""+formObj._stdngCd.value+"\">";         // 법정동코드4
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneNo4\"            id=\"basZoneNo4\"            value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호4
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr14\"      id=\"basZoneBaseAdr14\"      value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소14
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr14\"        id=\"basZoneExAdr14\"        value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소14
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr14\"       id=\"basZoneEngAdr14\"       value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소14
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr24\"      id=\"basZoneBaseAdr24\"      value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소24
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr24\"        id=\"basZoneExAdr24\"        value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소24
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr24\"       id=\"basZoneEngAdr24\"       value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소24
				
				$('#hanaAddressDivHome').html(hddnAddressField);
			}
			// 직장
			if(formObj.homeOfficeGubun.value == "office"){
				hddnAddressField += "<input type=\"hidden\" name=\"custInfoRegRlsDvCd561\" id=\"custInfoRegRlsDvCd561\" value=\"1\">";                               // 주소변경여부
				hddnAddressField += "<input type=\"hidden\" name=\"zipNo5\"                id=\"zipNo5\"                value=\""+formObj.zipNo.value+"\">";         // 우편번호
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo5\"            id=\"pmilSeqNo5\"            value=\""+formObj._pmilSeqNo1.value+"\">";   // 우편번호 일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"zipNoDvCd5\"            id=\"zipNoDvCd5\"            value=\""+formObj._gb.value+"\">";           // 우편번호구분코드 (1:도로명, 2:지번) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr5\"                id=\"exAdr5\"                value=\""+formObj._exAdr1.value+"\">";       // 부속주소 
				hddnAddressField += "<input type=\"hidden\" name=\"dwlShpCd5\"             id=\"dwlShpCd5\"             value=\""+formObj.dwlShpCd.value+"\">";      // 구조형태 
				hddnAddressField += "<input type=\"hidden\" name=\"vlgNm5\"                id=\"vlgNm5\"                value=\""+formObj.vlgNm.value+"\">";         // 마을명 
				hddnAddressField += "<input type=\"hidden\" name=\"aptNm5\"                id=\"aptNm5\"                value=\""+formObj.aptNm.value+"\">";         // 아파트명 
				hddnAddressField += "<input type=\"hidden\" name=\"bldApdgNm5\"            id=\"bldApdgNm5\"            value=\""+formObj.bldApdgNm.value+"\">";     // 건물동명 
				hddnAddressField += "<input type=\"hidden\" name=\"athnCntNm5\"            id=\"athnCntNm5\"            value=\""+formObj.athnCntNm.value+"\">";     // 호수명 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrRoadNmCd5\"        id=\"nwAdrRoadNmCd5\"        value=\""+formObj.nwAdrRoadNmCd.value+"\">"; // 신주소 도로명 코드
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrEmdSeqNo5\"        id=\"nwAdrEmdSeqNo5\"        value=\""+formObj.nwAdrEmdSeqNo.value+"\">"; // 신주소읍면동일련번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrUdgrYn5\"          id=\"nwAdrUdgrYn5\"          value=\""+formObj.nwAdrUdgrYn.value+"\">";   // 신주소지하여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManBldNo5\"        id=\"nwAdrManBldNo5\"        value=\""+formObj.nwAdrManBldNo.value+"\">"; // 신주소주건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbBldNo5\"         id=\"nwAdrSbBldNo5\"         value=\""+formObj.nwAdrSbBldNo.value+"\">";  // 신주소부건물번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrBldMgntNo5\"       id=\"nwAdrBldMgntNo5\"       value=\""+formObj.nwAdrBldMgntNo.value+"\">";// 신주소건물관리번호 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrMntnYn5\"          id=\"nwAdrMntnYn5\"          value=\""+formObj.nwAdrMntnYn.value+"\">";   // 신주소산여부 
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrManLdno5\"         id=\"nwAdrManLdno5\"         value=\""+formObj.nwAdrManLdno.value+"\">";  // 신주소주지번	
				hddnAddressField += "<input type=\"hidden\" name=\"nwAdrSbLdno5\"          id=\"nwAdrSbLdno5\"          value=\""+formObj.nwAdrSbLdno.value+"\">";   // 신주소부지번
				hddnAddressField += "<input type=\"hidden\" name=\"adrRfngYn5\"            id=\"adrRfngYn5\"            value=\""+formObj.adrRfngYn.value+"\">";     // 정재된 주소 여부
				hddnAddressField += "<input type=\"hidden\" name=\"admSftNonBldNm5\"       id=\"admSftNonBldNm5\"       value=\""+formObj.admSftNonBldNm.value+"\">";// 신주소건물명(행정안전부 건물명)
				hddnAddressField += "<input type=\"hidden\" name=\"pmilSeqNo51\"           id=\"pmilSeqNo41\"           value=\""+formObj._pmilSeqNo2.value+"\">";   // 우편일련번호(선택 반대값) 
				hddnAddressField += "<input type=\"hidden\" name=\"exAdr51\"               id=\"exAdr41\"               value=\""+formObj._exAdr2.value+"\">";       // 부속주소(선택 반대값)
				
				hddnAddressField += "<input type=\"hidden\" name=\"stdngCd5\"              id=\"stdngCd5\"              value=\""+formObj._stdngCd.value+"\">";         // 법정동코드5
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneNo5\"            id=\"basZoneNo5\"            value=\""+formObj._basZoneNo.value+"\">";       // 기초구역번호5
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr15\"      id=\"basZoneBaseAdr15\"      value=\""+formObj._basZoneBaseAdr1.value+"\">"; // 기초구역기본주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr15\"        id=\"basZoneExAdr15\"        value=\""+formObj._basZoneExAdr1.value+"\">";   // 기초구역부속주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr15\"       id=\"basZoneEngAdr15\"       value=\""+formObj._basZoneEngAdr1.value+"\">";  // 기초구역영문주소15
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneBaseAdr25\"      id=\"basZoneBaseAdr25\"      value=\""+formObj._basZoneBaseAdr2.value+"\">"; // 기초구역기본주소25
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneExAdr25\"        id=\"basZoneExAdr25\"        value=\""+formObj._basZoneExAdr2.value+"\">";   // 기초구역부속주소25
				hddnAddressField += "<input type=\"hidden\" name=\"basZoneEngAdr25\"       id=\"basZoneEngAdr25\"       value=\""+formObj._basZoneEngAdr2.value+"\">";  // 기초구역영문주소25

				$('#hanaAddressDivJob').html(hddnAddressField);				 
			}
		}
	};
}();

/**
 * MSB - PBK - 모바일 브랜치 - 촬영
 * @author 
 * @since 
 */
msb.pbk.mobilebranch.getPic = function(){

	return{
		//카메라 오픈  
		openCamera : function(fileIdName){
			event.preventDefault();
			$('#fileBox').click();
			
			$('#fileBox').unbind();
			$('#fileBox').change(function(e){
			
				var file = $('#fileBox').prop('files')[0];
				
				if(file.type.match(/image.*/)) {
					var reader = new FileReader();
					reader.onload = function(readerEvent) {
						var image = new Image();
						image.onload = function(imageEvent) {
							//Resize Image
							var canvas = document.createElement('canvas'), 
							max_size = 1280,
							width = image.width,
							height = image.height;
							
							if(width > height) {
								if(width > max_size) {
									height *= max_size / width;
									width = max_size;
								}
							} else {
								if(height > max_size) {
									width *= max_size / height;
									height = max_size;
								}
							}
							
							canvas.width = width;
							canvas.height = height;
							canvas.getContext('2d').drawImage(image, 0, 0, width, height);
							var dataUrl = canvas.toDataURL('image/jpeg', 0.40);
							//var dataUrl = canvas.toDataURL('image/jpeg', 0.90); //이미지 퀄리티 조절
							
							var resizedImage = dataURLToBlob(dataUrl); // 이미지 바이너리 형태로 변환

							$('#'+ fileIdName +'_Pic').attr('src', URL.createObjectURL(resizedImage));
							
							if(fileIdName == "idCard") idCard = resizedImage;

							if(fileIdName == "homeAddress") homeAddress = resizedImage;
							if(fileIdName == "workAddress") workAddress = resizedImage;
							
							if(fileIdName == "workVerify0") workVerify0 = resizedImage;
							if(fileIdName == "workVerify1") workVerify1 = resizedImage;
							if(fileIdName == "workVerify2") workVerify2 = resizedImage;
							if(fileIdName == "workVerify3") workVerify3 = resizedImage;
							if(fileIdName == "workVerify4") workVerify4 = resizedImage;
							if(fileIdName == "workVerify5") workVerify5 = resizedImage;

							if(fileIdName == "incomeVerify0") incomeVerify0 = resizedImage;
							if(fileIdName == "incomeVerify1") incomeVerify1 = resizedImage;
							if(fileIdName == "incomeVerify2") incomeVerify2 = resizedImage;
							if(fileIdName == "incomeVerify3") incomeVerify3 = resizedImage;
							if(fileIdName == "incomeVerify4") incomeVerify4 = resizedImage;
							if(fileIdName == "incomeVerify5") incomeVerify5 = resizedImage;

							if(fileIdName == "etc0") etc0 = resizedImage;
							if(fileIdName == "etc1") etc1 = resizedImage;
							if(fileIdName == "etc2") etc2 = resizedImage;
							if(fileIdName == "etc3") etc3 = resizedImage;
							if(fileIdName == "etc4") etc4 = resizedImage;
							if(fileIdName == "etc5") etc5 = resizedImage;

							return false;						
						}
						image.src = readerEvent.target.result;
					};
					reader.readAsDataURL(file);
				}
				
				//TEST 중
				else{
					alert("file");
					if(fileIdName == "idCard") idCard = file;
				}
			
			
			});
		},
		
		// 촬영 - 전송
		submitPic : function(_formObj){
			var formData = new FormData($("form[id*='getPicForm']")[0]);
			
			formData.append("idCardFile", idCard);
			formData.append("homeAddressFile", homeAddress);
			formData.append("workAddressFile", workAddress);

			formData.append("workVerifyFile", workVerify0);
			formData.append("workVerifyFile", workVerify1);
			formData.append("workVerifyFile", workVerify2);
			formData.append("workVerifyFile", workVerify3);
			formData.append("workVerifyFile", workVerify4);
			formData.append("workVerifyFile", workVerify5);

			formData.append("incomeVerifyFile", incomeVerify0);
			formData.append("incomeVerifyFile", incomeVerify1);
			formData.append("incomeVerifyFile", incomeVerify2);
			formData.append("incomeVerifyFile", incomeVerify3);
			formData.append("incomeVerifyFile", incomeVerify4);
			formData.append("incomeVerifyFile", incomeVerify5);

			formData.append("etcFile", etc0);
			formData.append("etcFile", etc1);
			formData.append("etcFile", etc2);
			formData.append("etcFile", etc3);
			formData.append("etcFile", etc4);
			formData.append("etcFile", etc5);
			
			
			$.ajax({
				url: "/mobilebranch/loan/msmbr004_02.do",
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				success: function(result) {
					alert("추가서류 제출을 완료하였습니다.");
				},
				error: function(err) {
					alert("파일 업로드를 할 수 없습니다. 잠시 후 다시 시도해 주세요.");
				}
			});
		}
	};
}();


//String to Binary 메소드

var dataURLToBlob = function(dataURL) {
	var BASE64_MARKER = ';base64,';
	if(dataURL.indexOf(BASE64_MARKER) == -1) {
		var parts = dataURL.split(',');
		var contentType = parts[0].split(':')[1];
		var raw = parts[1];
		
		return new Blob([raw], {type: contentType});
	}
	
	var parts = dataURL.split(BASE64_MARKER);
	var contentType = parts[0].split(':')[1];
	var raw = window.atob(parts[1]);
	var rawLength = raw.length;
	
	var uInt8Array = new Uint8Array(rawLength);
	
	for(var i=0; i<rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}
	
	return new Blob([uInt8Array], {type: contentType});
};


/**
 * MSB - PBK - 모바일 브랜치 - 지점(메인)
 * @author 
 * @since 
 */
msb.pbk.mobilebranch.branch = function(){
	
	var oTmpForm = null;
	  
	return{

		// 임시 테스트  
		submitBrTest : function(brNo){

			alert(brNo);
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/msmbr002.do?brno='+brNo, null, null, false);
		},
		
		// 브랜치 메인으로 이동
		goBranchMain : function(brNo){
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/msmbr002.do?branchCode='+brNo, null, null, false);
		},
		

		// 촬영 - 페이지 이동
		goPic : function(brNo){
			var hanaJQuery = new HanaJQuery(msb.HANA_CONTENT, false, null);
			hanaJQuery.ajaxLoad('/mobilebranch/loan/msmbr004_01.do', null, null, false);
		}
	};
}();