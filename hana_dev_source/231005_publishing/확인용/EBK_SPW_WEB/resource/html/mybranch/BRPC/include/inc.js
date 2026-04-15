var include = {

  header: function(title) {
    let str='';
    str=
    ' <div class="mybranch-header">'
    +'  <div class="header__inner">'
    +'    <h1 class="mybranch-logo"><a href="#"><img src="../../../../../resource/mybranch/images/photo/logo-mb-black.svg" alt="mybr"></a></h1>'
    +'    <h2>' + title + '</h2>'
    +'  </div>'
    +'  <div class="divider">'
    +'    <a href="#" class="btn-divider"><span class="blind">전체메뉴</span></a>'
    +'  </div>'
    +'</div>'
    
    document.write(str);
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
    +'     <small>&copy; 2021 하나은행 My브랜치</small>'
    +'   </footer>'
    +' </section>'

    document.write(str);
  },

  step4: function (step1, step2, step3, step4) {
    let str='';
    str=
    ' <div class="myb-process__wrap">'
    +'  <div class="myb-process">'
    +'    <div class="myb-step step04">'
    +'      <ol>'
    +'    <li class=' + step1 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">1</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>본인인증</em>'
    +'        </li>'
    +'    <li class=' + step2 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">2</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>동의서 제출</em>'
    +'        </li>'
    +'    <li class=' + step3 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">3</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>손님정보 입력</em>'
    +'        </li>'
    +'    <li class=' + step4 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">4</span>'
    +'          </div>'
    +'          <em>증빙서류촬영</em>'
    +'        </li>'
    +'      </ol>'
    +'    </div>'
    +'  </div>'
    +'</div>'
 
    document.write(str);
  },

  step4Result : function (step1, step2, step3, step4) {
    let str='';
    str=
    ' <div class="myb-process__wrap">'
    +'  <div class="myb-process">'
    +'    <div class="myb-step step04">'
    +'      <ol>'
    +'    <li class=' + step1 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">1</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>본인인증</em>'
    +'        </li>'
    +'    <li class=' + step2 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">2</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>동의서 제출</em>'
    +'        </li>'
    +'    <li class=' + step3 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">3</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>손님정보 입력</em>'
    +'        </li>'
    +'    <li class=' + step4 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">4</span>'
    +'          </div>'
    +'          <em>결과안내</em>'
    +'        </li>'
    +'      </ol>'
    +'    </div>'
    +'  </div>'
    +'</div>'
 
    document.write(str);
  },

  step5: function (step1, step2, step3, step4, step5) {
    let str='';
    str=
    ' <div class="myb-process__wrap">'
    +'  <div class="myb-process">'
    +'    <div class="myb-step step05">'
    +'      <ol>'
    +'    <li class=' + step1 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">1</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>자금용도</em>'
    +'        </li>'
    +'    <li class=' + step2 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">2</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>본인인증</em>'
    +'        </li>'
    +'    <li class=' + step3 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">3</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>동의서 제출</em>'
    +'        </li>'
    +'    <li class=' + step4 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">4</span>'
    +'            <span class="line"></span>'
    +'          </div>'
    +'          <em>정보입력</em>'
    +'        </li>'
    +'    <li class=' + step5 + '>'
    +'          <div class="myb-step__item">'
    +'            <span class="round">5</span>'
    +'          </div>'
    +'          <em>증빙촬영</em>'
    +'        </li>'
    +'      </ol>'
    +'    </div>'
    +'  </div>'
    +'</div>'

    document.write(str);
  }

}




