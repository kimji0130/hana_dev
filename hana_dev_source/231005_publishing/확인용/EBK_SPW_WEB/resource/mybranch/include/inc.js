const include = {

  title: function (title) {
    let str='';
    str='<title>' + title + '</title>'

    document.write(str)
  }, 

  csslink: function () {
    let str='';
    str=
    '<link rel="stylesheet" href="../../../../resource/mybranch/css/import.css" />'
    +'<script>'
    +' window.onload = function(){'
    +'  initMybUI();'
    +'  initMybComponents();'
    +'  AOS.refresh();'
    +'  AOS.init({'
    +'    easing : "ease-out",'
    +'    duration : 650'
    +'  });'
    +' }</script>'
      
    document.write(str)
  },

  headerPrev: function(title) {
    let str='';
    str=
     ' <header class="myb-header">'
    +'  <button  type="button" class="header-btn__back" title="이전 화면">'
    +'    <i class="icon icon-back"></i>'
    +'<!-- 홈일경우 아래 아이콘 노출-->'
    +'    <!-- <i class="icon icon-home"></i> -->'
    +'  </button>'
    +'  <h2 class="header-title"><a href="javascript:void(0)">' + title + '</a></h2>'
    +'  <button type="button" class="header-btn__divider" title="전체메뉴">'
    +'    <i class="icon icon-menu"></i>'
    +'  </button>'
    +' </header>'
    
    document.write(str)
  },

  headerHome: function(title) {
    let str='';
    str=
     ' <header class="myb-header">'
    +'  <button  type="button" class="header-btn__back" title="홈">'
    +'    <i class="icon icon-home"></i>'
    +'  </button>'
    +'  <h2 class="header-title h1"><a href="javascript:void(0)">' + title + '</a></h2>'
    +'  <button type="button" class="header-btn__divider" title="전체메뉴">'
    +'    <i class="icon icon-menu"></i>'
    +'  </button>'
    +' </header>'
    
    document.write(str)
  },

  footer: function () {
    let str='';
    str=
    ' <section class="compt-footer__wrap">'
    +'   <footer class="myb-footer">'
    +'     <div class="logo-box">'
    +'       <span class="branch-logo">My브랜치</span>'
    +'       <span class="branch-name">내자동지점</span>'
    +'     </div>'
    +'     <div class="info">'
    +'       <ul>'
    +'         <li><a href="tel:1599-1111">1599-1111</a></li>'
    +'         <li><a href="tel:1588-1111">1588-1111</a></li>'
    +'       </ul>'
    +'     </div>'
    +'     <small>ⓒ 2021 하나은행 My브랜치</small>'
    +'   </footer>'
    +' </section>'


    document.write(str)
  },


  fullPopupHeader: function(title) {
    let str= '';
    str= 
    ' <div class="modal-full__header">'
    +'  <h1 class="modal-full__title">' + title + '</h1>'
    +' </div>'

    document.write(str)
  },
  subFooter: function () {
    let str='';
    str=
    ' <section class="compt-footer__wrap">'
    +'   <footer class="myb-footer">'
    +'     <div class="logo-box">'
    +'       <span class="branch-logo">My브랜치</span>'
    +'       <span class="branch-name">내자동지점</span>'
    +'     </div>'
    +'     <div class="info">'
    +'       <ul>'
    +'         <li><a href="tel:1599-1111">1599-1111</a></li>'
    +'         <li><a href="tel:1588-1111">1588-1111</a></li>'
    +'       </ul>'
    +'     </div>'
    +'     <small>ⓒ 2021 하나은행 My브랜치</small>'
    +'   </footer>'
    +' </section>'

    document.write(str)
  },

  
  exchangeInfo: function() {
    let str= '';
    str= 
    ' <section class="section" data-aos="fade-up">'
    +'    <div class="compt-exchangeInfo">'
    +'      <div class="compt-exchangeInfo__title">'
    +'        <h3>실시간 환율</h3>'
    +'         <a href="#" class="compt-exchangeInfo__rate">'
    +'          <span id="pbldDtTm">전체환율</span>'
    +'          <i class="icon icon-arrow__right"></i>'
    +'         </a>'
    +'      </div>'
    +'      <div class="swiper-container compt-exchangeInfo__slide-wrap">'
    +'      <ul class="compt-exchangeInfo__slide swiper-wrapper">'
    +'          <li class="swiper-slide">'
    +'              <img src="../../../../resource/mybranch/images/nation/exchange_nation01.png" alt="USD">'
    +'              <span>USD</span>'
    +'              <span id="usdDealBascRt">2,001.00</span>'
    +'          </li>'
    +'          <li class="swiper-slide">'
    +'              <img src="../../../../resource/mybranch/images/nation/exchange_nation02.png" alt="JPY">'
    +'              <span>JPY</span>'
    +'              <span id="jpyDealBascRt">1,100.05</span>'
    +'          </li>'
    +'          <li class="swiper-slide">'
    +'              <img src="../../../../resource/mybranch/images/nation/exchange_nation03.png" alt="EUR">'
    +'              <span>EUR</span>'
    +'              <span id="eurDealBascRt">1,000.00</span>'
    +'          </li>'
    +'          <li class="swiper-slide">'
    +'              <img src="../../../../resource/mybranch/images/nation/exchange_nation04.png" alt="CNY">'
    +'              <span>CNY</span>'
    +'              <span id="cnyDealBascRt">1,245,00</span>'
    +'          </li>'
    +'      </ul>'
    +'      </div>'
    +'      <p class="compt-exchangeInfo__additional">2020.12.12 10:55 매매기준</p>'
    +'    </div>'
    +'  </section>'

    document.write(str)
  },

  divideMenu: function () {
    let str = '';
    str=
    '<section id="divider" class="compt-divider__wrap">'
    +' <div class="mobile-nav hide">'
    +'  <div class="mobile-nav__visual">'
    +'    <i class="icon icon-map"></i>'
    +'    <h2>본점 을지로센터 브랜치</h2>'
    +'    <div class="mobile-nav__mybranch__wrap">'
    +'      <a href="#" class="mobile-nav__mybranch"  data-element="modal__open" data-target="#modalInfoUse" aria-controls="#modalInfoUse">'
    +'        <span>My브랜치가 처음이신가요?</span>'
    +'      </a>'
    +'    </div>'
    +'  </div>'
    +'  <ul class="mobile-nav__list">'
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>대출</span>'
    +'        <i class="icon icon-arrow_down"></i>'
    +'      </a>'
    +'      <ul class="depth02-wrap">'
    +'        <li><a href="#" class="depth02-item">대출 신청하기</a></li>'
    +'        <li><a href="#" class="depth02-item">진행조회 및 서류제출(촬영)</a></li>'
    +'        <li><a href="#" class="depth02-item">대출금받기</a></li>'
    +'      </ul>'
    +'    </li>' 
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>신용동의</span>'
    +'        <i class="icon icon-arrow_down"></i>'
    +'      </a>'
    +'      <ul class="depth02-wrap">'
    +'        <li><a href="#" class="depth02-item">개인대출용 신용동의</a></li>'
    +'        <li><a href="#" class="depth02-item">사업자대출용 신용동의</a></li>'
    +'      </ul>'
    +'    </li>'
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>개인정보 이용 동의</span>'
    +'      </a>'
    +'    </li>'
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>분실/변경</span>'
    +'        <i class="icon icon-arrow_down"></i>'
    +'      </a>'
    +'      <ul class="depth02-wrap">'
    +'        <li><a href="#" class="depth02-item">내 정보변경</a></li>'
    +'        <li><a href="#" class="depth02-item">통장/인감 분실</a></li>'
    +'        <li><a href="#" class="depth02-item">통장 비밀번호 재등록</a></li>'
    +'      </ul>'
    +'    </li>'
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>비대면계좌개설</span>'
    +'      </a>'
    +'    </li>'
    +'    <li>'
    +'      <a href="#" class="depth01-item">'
    +'        <span>신용카드</span>'
    +'      </a>'
    +'    </li>'
    +'  </ul>'
    +'  <button class="divide-close"><i class="icon icon-close__white">닫기</i></button>'
    +'</div>'
    +'</section>'
    +' <!-- 이용안내팝업 -->'
    +'<div class="pop-wrap modal" id="modalInfoUse" data-element="modal__element" role="dialog" aria-modal="true" aria-hidden="false">'
    +'	<div class="dim"></div>'
    +'	<div class="pop-inner__basic" data-element="modal__element-container">'
    +'		<div class="pop-head">'
    +'			<p class="pop-head--title">My 브랜치 이용안내</p>'
    +'			<button class="pop--btn-close" type="button" data-element="modal__close" title="닫기"></button>'
    +'		</div>'
    +'		<div class="pop-body is-scroll">'
    +'			<h2 class="pop-body__title">사/전/준/비</h2>'
    +'			<p class="pop-body__exp">본인 명의 핸드폰을 준비해 주세요.</p>'
    +'			<h2 class="pop-body__title">이/용/안/내</h2>'
    +'			<ol class="pop-body__list">'
    +'				<li><span>영업점 선택(필요시)</span>'
    +'					<div class="pop-body__list_exp">거래 영업점 변경을 원하시면 [전체메뉴]의 [다른 영업점 찾기]를 터치</div>'
    +'				</li>'
    +'				<li><span>신청하기</span>'
    +'					<p>가계대출</p>'
    +'					<ul>'
    +'						<li>① 신청하기</li>'
    +'						<li>② 본인인증(SMS, ARS인증)</li>'
    +'						<li>③ 신청정보 입력</li>'
    +'						<li>④ 증빙서류 촬영하여 제출</li>'
    +'					</ul>'
    +'					<p>신용카드</p>'
    +'					<ul>'
    +'						<li>① 신청하기</li>'
    +'						<li>② 하나카드 페이지로 이동되어 신청</li>'
    +'					</ul>'
    +'					<p>계좌개설</p>'
    +'					<ul>'
    +'						<li>① 입출금통장 또는 전자금융신규</li>'
    +'						<li>② 비대면 계좌 개설 페이지로 이동되어 신청</li>'
    +'					</ul>'	
    +'				</li>'
    +'				<li><span>약정/실행하기</span>'
    +'					<p>신용대출 및 오토론</p>'
    +'					<ul>'
    +'						<li>① 약정/실행하기</li>'
    +'						<li>② 본인인증(SMS, ARS인증)</li>'
    +'						<li>③ 대출실행내역확인</li>'
    +'						<li>④ 전자서명 비밀번호 6자리 설정 및 확인</li>'
    +'						<li>⑤ 약정/실행 완료</li>'
    +'					</ul>'
    +'				</li>'
    +'			</ol>'
    +'			<ul class="pop-body__additional">'
    +'				<li><em>※</em>서비스 이용시 이동통신사에 가입하신 요금제에 따라 데이터 이용요금이 부과될 수 있습니다.</li>'
    +'				<li><em>※</em>특허출원 <span>10-2017-0029097</span><span class="newline">10-2018-0022208</span></li>'
    +'				<li><em>※</em>상표등록출원 <span>40-2017-0024202-4</span></li>'
    +'			</ul>'
    +'		</div>'
    +'		<div class="pop--btn-wrap btn-wrap__basic">'
    +'			<button type="button" class="btn btn-basic__round primary full md" data-element="modal__close">확인</button>'
    +'		</div>'
    +'	</div>'
    +'  </div>'
    
    +'  <!--// 이용안내팝업 -->'

    document.write(str)
  }

}



 
