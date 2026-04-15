function initMybUI () {
	mybUI.backToTop('.back-to__top');	
	mybUI.inputField('.input, .textarea'); 
	mybUI.charCount('.textarea .input-element');
	mybUI.characterSelect('.character a');
	mybUI.divider('.divider-menu, .header-btn__divider, .divider');
  mybUI.swipePack('.main-hubsite .compt-hublink', 'perViewAuto','auto', 0, '.hublink-arrow'); 
  mybUI.swipePack('.branch .compt-hublink', 'perViewAuto','auto', 0); 
  mybUI.swipePack('.main-hubsite .compt-hub-cardvisual', 'coverFlow', '', '', '.hub-visual-arrow'); 
	mybUI.hubSearchUI();
	mybUI.branchSearchUI();
  mybUI.bottomFixedButton();
}

function initMybUIExcDrivider() {
	mybUI.backToTop('.back-to__top');	
	mybUI.inputField('.input, .textarea'); 
	mybUI.charCount('.textarea .input-element');
	mybUI.characterSelect('.character a');
  mybUI.swipePack('.main-hubsite .compt-hublink', 'perViewAuto','auto', 0, '.hublink-arrow'); 
  mybUI.swipePack('.branch .compt-hublink', 'perViewAuto','auto', 0); 
  mybUI.swipePack('.main-hubsite .compt-hub-cardvisual', 'coverFlow', '', '', '.hub-visual-arrow'); 
	mybUI.hubSearchUI();
	mybUI.branchSearchUI();
}

function initMybUiDrivider () {
	mybUI.divider('.divider-menu, .header-btn__divider, .divider');	
  mybUI.bottomFixedButton();	
}

function initMybComponents () {
  mybUICompt.form();
  mybUICompt.modal();
  mybUICompt.checkbox();
  mybUICompt.select();
}

/* Scroll Animation */
document.addEventListener("DOMContentLoaded", function(){
	AOS.init({
		easing : "ease-out",
		duration : 650
	});
});

	
const mybUI = {
	backToTop: function(obj) { 
		let $obj = null;
		
		function init(obj) {
			$obj = $(obj);
		}
	
		function event() {
			$(window).on('scroll', function () {
				if ( $(window).scrollTop() > 200 ) { $obj.addClass('active') } 
				else { $obj.removeClass('active') }
			});
	
			$obj.on('click', function() {
				$('html,body').animate({	scrollTop: '0' })
			});
		}
	
		init(obj);
		event();
	},
	
	keypad : function(target, setTime){
		$('.input__element').removeClass('key');
		target.addClass('key');
		if($('body').is('.ios') || $('body').is('.isResize')){ return }
		
		if(typeof setTime === "undefined") { setTime = 300 } 

		var windowHeight = window.innerHeight;
		
		$(window).on('resize', function(){
				$('body').addClass('isResize');
				setTimeout(function(){
						if(windowHeight == window.innerHeight){
								$('.input__element').each(function(i,e){
										if($(e).is('.key')){
												$(e).removeClass('key').trigger('blur');
										}
								})
								$('body').removeClass('isResize');
								$(window).off('resize');
						}    
				}, setTime)
		})
  },
	inputField: function(obj) {
		var $el = null;
		var $input = null;
		var $label = null;
		var $clear = null;
		var $search = null;
		var $native = null;
		var windowHeight = 0;
	
		function init(obj){
			$el = $(obj);
			$input = $el.find('.input-element');
			$label = $el.find('label[aria-hidden]');
			$clear = $el.find('.input__remove-button');
			$search = $el.find('.search-button');
			$native = $('.native-inner[role=button]');
	
			windowHeight = window.innerHeight;
	
			for(var i=0; i<$input.length; i++){
					var $btn = $input.eq(i).closest($el).find($clear);
					if($input.eq(i).val() == '' || $input.eq(i).prop('disabled') == true || $input.eq(i).prop('readonly') == true){
							$btn.hide();
					}else if($input.eq(i).val() != "" && $input.eq(i).closest($el).is('.input-on')) {
							$btn.hide();
					}else{
							$btn.show();
							$input.eq(i).addClass('input-on');
					}
					if ($input.eq(i).prop('readonly') == true) {
							if(!$input.eq(i).is('.input-date') && !$input.eq(i).closest('.input').is('.input--hybrid')){
									$input.eq(i).closest(obj).addClass('readonly')
					}
				}
			}
			title();
		};
	
		function event(){
				input();
				util();
				stopEvent();
		};
	
		function input(){
				$el.on({
						'input' : function(){
							var $btn = $(this).closest($el).find($clear);
							if($(this).val() == ""){
									$btn.hide();
							}else{
									$btn.show();
									$(this).closest($el).addClass('input-on input-focus');
							}
							if($(this).is('.masking')){
									if($(this).val() == ''){
											$(this).removeClass('active');
									}else{
											$(this).addClass('active');
									}
							}
								
						},
						'blur' : function(e){
								var $target = $(e.target)
								if($(this).siblings('input').length || $(this).parent('.native-inner').siblings('.native-inner').length){
										if($(this).val() == ''){
												var that = $(this).closest($el).find($input);
												var emptied = that.filter(function(){ return $(this).val() == '' }).length;
	
												if(emptied == that.length){
														$(this).closest($el).removeClass('input-on');
												}
										}
								}else{
										if($(this).val() == ''){
												$(this).closest($el).removeClass('input-on');
										}
								}
								$(this).closest($el).removeClass('input-focus');
								if($(this).prop('readonly') == false){
										setTimeout(function(){
												if($('.input-focus:not([data-native=focus])').length == 0){
														mybUI.native.bottomShow();
												}
										},200);
								}
	
								if($('body').is('.ios')){
										if($target.closest('.modal--slide').length){
												setTimeout(function(){
														if(!$target.closest('.modal--slide').find('.input-focus').length){
																window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
														}
												}, 1)
										}else{
												setTimeout(function(){
														if(!$('body').find('.input-focus').length){
																window.scrollTo(document.body.scrollLeft, window.scrollY + 1);
														}
												}, 1)
										}
								}
								
								setTimeout(function(){
										$target.closest($el).find('.input__remove-button').hide();
								},0)
						},
						'focus' : function(e) {
								var $target = $(e.target)
								if($(this).prop('readonly') == true){
										return
								}else{
										$(this).closest($el).addClass('input-focus');
										if($(this).val() !== ''){
												$target.closest($el).find('.input__remove-button').show();
										}
										mybUI.native.bottomHide();
										mybUI.keypad($target, 300);
								}
						}
				}, '.input-element');
				$label.on('click', function(){
						$(this).closest($el).focus();
				});
				$native.on('click', function(){
						$(this).closest('.input').attr('data-native', 'focus');
				})
		};
	
		function util(){
				$clear.on({
						'touchstart' : function(){
								$(this).closest($el).addClass('input-focus');
						},
						'focus' : function(){
								$(this).closest($el).addClass('input-focus');
						},
						'blur' : function(){
								if($(this).closest($el).is('.input-focus')){
										$(this).closest($el).removeClass('input-focus');
								}
						},
						'click' : function(e){
								$(this).closest($el).find('.input-element').val('').closest($el).removeClass('input-on')
								$(this).siblings('.input-element').focus();
								$(this).hide();
						}
				});
				$search.on({
						'touchstart' : function(){
								$(this).closest($el).addClass('input-focus');
						},
						'focus' : function(){
								$(this).closest($el).addClass('input-focus');
						},
						'blur' : function(){
								if($(this).closest($el).is('.input-focus')){
										$(this).closest($el).removeClass('input-focus');
								}
						}
				});
		};
	
		function title(){
				$input.each(function(i,e){
						var txt = $(e).closest($el).find('label').text();
						if(!$(e).is('.input-date')){
								if($(e).parent().siblings('.input__optional').length < 1 && $(e).siblings('.input__optional').length < 1){
										if($(e).attr('title') == ''){
												$(e).attr('title', txt);
										}
								}
						}
				});
		};
	
		function stopEvent(){
				$('body').on('click', '.input-element', function(e){
						if($(this).parent().is('.native-inner')){
								if($(this).prop('readonly') == true){
										e.preventDefault();
										e.stopPropagation();
								}
						}
				})
		}
	
		init(obj);
		event();
	},
	
	native : {

		bottomUnfixed : function(){
			let $obj = null;
			function init(){
				$obj = $('#footer, .button-fixed');
			}

			function event(){
				$obj.css('position', 'relative').addClass('unfixed');
			}

			init();
			event();
		},

		bottomFixed : function(){
			let $obj = null;

			function init(){
				$obj = $('#footer, .button-fixed');
			}

			function event(){
				$obj.css('position', 'fixed').removeClass('unfixed');;
			}

			init();
			event();
		},

		bottomHide : function(){
			if($('body').data('accessibility')){
				return
			}

			let $obj = null;

			function init(){
				$obj = $('#footer, .button-fixed');
			}

			function event(){
				$obj.stop(true).hide();
			}

			init();
			event();
		},

		bottomShow : function(){
				if($('body').data('accessibility')){
						return
				}

				let $obj = null;

				function init(){
					$obj = $('#footer, .button-fixed');
				}

				function event(){
					$obj.stop().fadeIn('50');
				}

				init();
				event();
		},

		bottomInit : function(){
			if(typeof HANA_READER_YN !== 'undefined'){
				if(HANA_READER_YN == 'Y'){
					$('body').attr('data-accessibility', 'true');
					mybUI.native.bottomUnfixed();
					mybUI.native.errorText();
				}
			}
		},

		errorText : function(){
			$('body').on('click', '.button-wrap .button:last', function(){
				$('.input__error').each(function(i,e){
					$(e).text($(e).text());
				})
			})
		}
  },
	
	divider: function(obj) {
		let $obj = null;
		const $mobileNav = $('.mobile-nav');
		const $closeNav = $('.divide-close');
		const $mobileNavlink = $('.depth01-item');
		const $isActive = 'is-active';
		
	
		function init(obj) {
			$obj = $(obj);
		}
	
		function toggle() {
			let winScrollTop = $(this).scrollTop();
			if( $mobileNav.hasClass('show')) {
				$mobileNav.removeClass('show');
				$mobileNav.addClass('hide');
				$closeNav.hide();
				let currentScrollTop= $('.app').scrollTop();
				$('body').removeClass('nav-open');
				$('.app, body').css({"position": "", "width": "", "height": "", "overflow": ""});				
				$(window).scrollTop(currentScrollTop);		
			} else { 
				$('body').addClass('nav-open');
				$('.app').css({"position": "fixed", "width": "100%", "height": "100%", "overflow": "hidden"}).scrollTop(winScrollTop);
				$mobileNav.addClass('show');
				$mobileNav.removeClass('hide');
				$closeNav.show();
			}
		}
	
		function event() {
			$obj.on('click', function() {
				toggle();
				
			});
	
			$closeNav.on('click', function() {
				toggle();
			});
	
			$mobileNavlink.on('click', function(e) {
				e.preventDefault();
				
				if($(this).hasClass($isActive)) {
					$(this).removeClass($isActive);
					$(this).next().stop().slideUp(300);
				} else {
					$(this).addClass($isActive);
					$(this).next().stop().slideDown(300);
					$(this).parent().siblings().find('.' + $isActive + '').next().stop().slideUp(300);
					$(this).parent().siblings().find('.' + $isActive + '').removeClass($isActive);
				}
			})
		}
	
		init(obj);
		event();
	},
	
	charCount: function(obj) {
		let $obj = null;
	
		function init(obj) {
			$obj = $(obj);
		}
	
		function event() { 
			$obj.keyup( function() {
				let $charCount = $obj.val().length,
						$current = $('#current');
	
				$current.text($charCount);
			});
		}
	
		init(obj);
		event();
	},
	
	characterSelect : function(obj){
		var $obj = null;
	
		function init(obj) {
			$obj = $(obj);
		}
		
		function bindingEvent() {
				for (var i = 0; i < $obj.length; i++) {
					$obj[i].onclick = function(e){
						e.preventDefault();
						activation(this, $obj);
					}
				}
		}
	
		function activation(item, items){
			for(var k=0; k<items.length; k++){
				items[k].classList.remove('is-active');
			}
			item.classList.add('is-active');
		}
	
		init(obj);
			
		window.onload = function(){
			bindingEvent();
		}
	
	},

	hubSearchUI : function () {

			const el = {
				hubSearchBtn: $('#hubSearchBtn'),
				hubVisual: $('#hubVisual'),
				hubHotProduct: $('#hubHotProduct'),
				hubSearchResult: $('#hubSearchResult'),
				hubSearchResultClose: $('#hubSearchResultClose')
			}

			el.hubSearchResult.css('display', 'none');

			el.hubSearchBtn.on('click', function () {
				el.hubSearchResult
				.css('display', 'block')
				.animate({
					top: '250px'
				}, 500);

				el.hubVisual.animate({
					height:'0', 
					display: 'none', 
					marginTop: '1rem',
					opacity: 0
				}, 200);
				el.hubHotProduct.animate({
					display: 'none', 
					padding: '0',
					opacity: 0,
				}, 500);
		});
		el.hubSearchResultClose.on('click', function () {
		  el.hubSearchResult.css('display', 'none');
			el.hubVisual.animate({
					height:'23rem', 
					display: 'block', 
					marginTop: 'auto',
					opacity: 1,
				}, 200)
			el.hubHotProduct.animate({
					display: 'block', 
					padding: 'auto',
					opacity: 1,
				}, 500);
		});
	},

	branchSearchUI : function () {

		const el = {
			branchSearchBtn: $('#branchSearchBtn'),
			branchVisual: $('#branchVisual'),
			branchSearchResult: $('#branchSearchResult'),
			branchSearchResultClose: $('#branchSearchResultClose')
		}
	
		el.branchSearchResult.css('display', 'none');
	
		el.branchSearchBtn.on('click', function () {
				el.branchSearchResult
				.css('display', 'block')
				.animate({ top: '200px'}, 200);
		
				el.branchVisual.animate({
					height:'0', 
					display: 'none', 
					marginTop: '-2rem',
					opacity: 0
				}, 200);
				
		});

		el.branchSearchResultClose.on('click', function () {
			el.branchSearchResult.css('display', 'none');
			el.branchVisual.animate({
					height:'23rem', 
					display: 'block', 
					marginTop: 'auto',
					opacity: 1,
				}, 200);
		});
	},
  swipePack: function (obj, options, count, space, navi) {
		var $obj = null;
		var $count = count;
		var $space = space;
    var $naviName = navi;

		var $options = {
		
			perViewAuto: {
				slidesPerView: $count,
				spaceBetween: $space,
				centeredSlides: false,
				freeMode: true,
				draggable: true,
				nested:true,
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
					clickable: true,
				},
				navigation: {
					nextEl: $naviName + '.swiper-button-next',
					prevEl: $naviName + '.swiper-button-prev',
				},
			},
      coverFlow: {
        autoplay: true,
        loop: true,
        effect: "coverflow",
        grabCursor: 1.5,
        centeredSlides: true,
        slidesPerView: 1.5,
        coverflowEffect: {
          rotate: 75,
          stretch: 50,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: $naviName + '.swiper-button-next',
          prevEl: $naviName + '.swiper-button-prev'
        }
      }
		}
	
		function init (obj, options) {
				var optionsObj = $options[options];
				
				$obj = $(obj);
				var swiper = new Swiper($obj, optionsObj);
			}
		
			init(obj, options);
	},

	bottomFixedButton: function () {
		'use strict'
    var $obj = $('.messagelist .btn-top__fixed');
    var footerHeight =  $('.compt-footer__wrap').innerHeight();
    var messageHeight = $('.messagelist').innerHeight() + $('.compt-footer__wrap').innerHeight();
 
    $obj.css({'bottom': '0', 'transition': '10ms'});

    if (messageHeight === $(window).height()) { // 데이터가 적을때
      $obj.css({'bottom': footerHeight, 'transition': '10ms'});
    } else {
      $obj.css({'bottom': '0', 'transition': '10ms'});
    }

    
    $(window).scroll(function (event) { 
      event.preventDefault();
      
      var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

      $obj.css({'bottom': '0', 'transition': '10ms'});

      if(scrollBottom < $('.compt-footer__wrap').innerHeight()) {
        $obj.css({'bottom': footerHeight, 'transition': '10ms'});
      } else {
        $obj.css({'bottom': '0', 'transition': '10ms'});
      }
    }); 
	},

  scrollFixedEvent : function() {

    var $obj = $('.messagelist .btn-top__fixed');
    var footerHeight =  $('.compt-footer__wrap').innerHeight();
    var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

    $obj.css({'bottom': '0', 'transition': '10ms'});

    if(scrollBottom < $('.compt-footer__wrap').innerHeight()) {
      $obj.css({'bottom': footerHeight, 'transition': '10ms'});
    } else {
      $obj.css({'bottom': '0', 'transition': '10ms'});
    }
  }

}

const mybUICompt = {

  /* Plugin - Form Control */
  form: function () {
    'use strict'

    var pluginName = "formCtrl";

    var defaults = {
      input: "[data-element=form-ctrl__input]",
      textarea: "[data-element=form-ctrl__textarea]",
      delete: "[data-element=form-ctrl__delete]",
      count: "[data-element=form-ctrl__count]",
      countCurrent: "[data-element=form-ctrl__count-current]",
      countTotal: "[data-element=form-ctrl__count-total]",
      activeClassName: "is-active",
      autoHeight: false //true
    };

    function Plugin(element, options) {
      this.element = element;
      this._name = pluginName;
      this._defaults = defaults;
      this.options = $.extend({}, this._defaults, options);
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function () {
        var plugin = this;
        plugin.buildCache();
        plugin.bindEvents();
      },
      buildCache: function () {
        var plugin = this;
        plugin.$element = $(plugin.element);
        plugin.$input = plugin.$element.find(plugin.options.input);
        plugin.$textarea = plugin.$element.find(
          plugin.options.textarea
        );
        plugin.$delete = plugin.$element.find(plugin.options.delete);
        plugin.$count = plugin.$element.find(plugin.options.count);
        plugin.$countCurrunt = plugin.$element.find(
          plugin.options.countCurrent
        );
        plugin.$countTotal = plugin.$element.find(
          plugin.options.countTotal
        );
      },
      bindEvents: function () {
        var plugin = this;

        plugin.$input
          .on("keyup." + plugin._name, function (e) {
            plugin.toggle(this);
          })
          .keyup();

        plugin.$delete.on("click." + plugin._name, function (e) {
          e.preventDefault();
          plugin.delete();
        });

        plugin.$textarea
          .on(
            "keyup." + plugin._name + " input." + plugin._name,
            function (e) {
              plugin.count(e);
              if (plugin.options.autoHeight) {
                plugin.resize();
              }
            }
          )
          .keyup();
      },
      toggle: function (self) {
        var plugin = this;
        var $self = $(self);

        $self.val().length > 0 ? plugin.show() : plugin.hide();
      },
      show: function () {
        var plugin = this;

        if (plugin.$input.attr("class").indexOf("search") != -1) {
          $(".search__COMMON-button-box").hide();
        }
        plugin.$delete.addClass(plugin.options.activeClassName);
      },
      hide: function () {
        var plugin = this;

        plugin.$delete.removeClass(plugin.options.activeClassName);
        if (plugin.$input.attr("class").indexOf("search") != -1) {
          $(".search__COMMON-button-box").show();
        }
      },
      delete: function () {
        var plugin = this;
        plugin.$input.val("").focus();
        plugin.hide();
      },
      count: function (e) {
        var plugin = this;
        var maxLength = plugin.$countTotal.text() || 500;
        var curruntLength = plugin.$textarea.val().length;

        if (curruntLength <= maxLength) {
          plugin.$countCurrunt.text(curruntLength);
        } else {
          plugin.$countCurrunt.text(plugin.$countTotal.text());
        }
      },
      resize: function () {
        var plugin = this;
        var paddingTop = plugin.$textarea
          .css("padding-top")
          .replace("px", "");
        var paddingBtm = plugin.$textarea
          .css("padding-bottom")
          .replace("px", "");
        plugin.$textarea
          .css({
            height: "auto",
            overflow: "hidden"
          })
          .height(
            plugin.$textarea[0].scrollHeight -
            paddingTop -
            paddingBtm
          );
      }
    });

    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(
            this,
            "plugin_" + pluginName,
            new Plugin(this, options || $(this).data("options"))
          );
        }
      });
    };

    $(function () {
      $("[data-element=form-ctrl]").formCtrl();
    });
  },
  
  /* Plugin - Modal */
  modal: function () {
    var pluginName = "modal";

    var defaults = {
      closeExisting: true,
      stackLevel: 10,
      mobileResolution: 1280,
      activeClassName: 'is-open',
      wrapperClassName: '.app, .modal-full',
      modalClassName: 'pualugin-modal',
      modalMaskClassName: 'pualugin-modal__mask',
      container: '[data-element=modal]',
      modal: '[data-element=modal__element]',
      modalInner: '[data-element=modal__element-container]',
      mask: '[data-element=modal__mask]',
      close: '[data-element=modal__close]',
      open: '[data-element=modal__open]',
      focus : '[data-element=focus]',
      slideClass : '.modal--slide'
    }

    function Plugin(element, options) {
      this.element = element;
      this._name = pluginName;
      this._defaults = defaults;
      this.options = $.extend({}, this._defaults, options);
      this.flag = false;
      this.stackLevel = this.options.stackLevel;
      this.currentScrollTop = 0;
      this.isMobile = false;
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function() {
        var plugin = this;

        // 모달 컨테이너 생성
        var container = $('<div />')
          .addClass(plugin.options.modalClassName)
          .attr('data-element', 'modal')
          .appendTo('body');

        // document에 있는 모달을 찾아서 모달 컨테이너에 append
        $( plugin.options.modal ).appendTo( container );

        plugin.buildCache();
        plugin.bindEvents();
      },
      destroy: function() {
        var plugin = this;

        plugin.flag = false;
        plugin.stackLevel = 10;

        plugin.$element.removeData('plugin_' + plugin._name);
        plugin
          .unbindEvents()
          .removeCache();
      },
      buildCache: function() {
        var plugin = this;

        plugin.$element = $(plugin.element);
        plugin.$container = plugin.$element.find(plugin.options.container);
        plugin.$modal = plugin.$element.find( plugin.options.modal );
        plugin.$modalInner = plugin.$element.find( plugin.options.modalInner );
        plugin.$open = plugin.$element.find( plugin.options.open );
        plugin.$close = plugin.$element.find( plugin.options.close );
        plugin.$focus = plugin.$element.find( plugin.options.focus );
        plugin.$wrap = $(plugin.options.wrapperClassName);
        plugin.$win = $(window);
        plugin.$doc = $(document);

        // 모바일 체크
        plugin.isMobile = plugin.$element.width() < plugin.options.mobileResolution && true;

        plugin.$modal.attr({
          'role': 'dialog',
          'aria-modal': true,
          'aria-hidden': true
        })

        plugin.$open.each(function(i,e){
          $(e).attr({
            'aria-controls': plugin.$open.eq(i).data('target')
          })
        })

      },
      remoevCache: function() {
        var plugin = this;

        plugin.$modal
          .removeClass( plugin.options.activeClassName )
          .removeAttr('role aria-modal aria-hidden z-index');
          
        plugin.$open.removeAttr('aria-controls');

      },
      bindEvents: function() {
        var plugin = this;

        plugin.$close.on('click.' + plugin._name, function(e) {
          e.preventDefault();

          plugin.close( $(this).closest(plugin.options.modal) );
        })

        plugin.$open.on('click.' + plugin._name, function(e) {
          e.preventDefault();

          var $this = $(this);
          plugin.open( $this.data('target') );
          
        })
      },
      unbindEvents: function () {
        var plugin = this;

        plugin.$open !== null && plugin.$open.off('.' + plugin._name);
        plugin.$close.off('.' + plugin._name);
        plugin.$doc.off('.' + plugin._name);
      },
      open: function( target ) {
        var plugin = this;
        var $target = $(target);

        // 모달이 이미 열려 있는 경우 return
        if ( $(target).hasClass('is-open') ) return;

        // 모달에 타이틀이 있는 경우 포커스 받을 data 속성 추가
        if ($target.find('h1').length) {
          $target.find('h1').attr({
            'data-element' : 'focus'
          })
        }

        // 모달 형제노드 aria-hidden 유무 체크
        if(!$('body').is('.modal-open')){
          $('body').children().each(function(i,e){
            if ($(e).is('[aria-hidden=true]')) {
              $(e).attr({
                'data-aria-hidden' : 'has'
              });
            }
          })
        }

        // 모달 형제노드 aria-hidden 속성 추가
        if($('body').is('.modal-open')){
          $('body').addClass('stack');
          $target.siblings().attr('aria-hidden', 'true');
        }else{
          plugin.$container
            .siblings()
            .not('[data-aria-hidden=has]')
            .attr({
              'aria-hidden' : true
            })
        }

        plugin.fixedContents();

        if($target.is(plugin.options.slideClass)){
          
          var $slideLayer = $target.find(plugin.options.modalInner);
          
          $target.addClass(plugin.options.activeClassName);
          $slideLayer
            .css({
              'bottom' : - $slideLayer.outerHeight(true) + 'px'
            })
            .animate({
              'bottom' : 0
            }, 300, function(){
              $target
                .attr({
                  'aria-hidden': false,
                  'z-index': plugin.stackLevel
                })
                .find(plugin.options.focus)
                .focus();
            })

            //슬라이드팝업내 탭이 있는 경우
            if($slideLayer.find('[data-element=tab]').length){
              $slideLayer.find('.modal__contents').addClass('modal__contents--tabscroll');
            }
          
        }else{
          $target.addClass(plugin.options.activeClassName);
          $target
                .attr({
                  'aria-hidden': false,
                  'z-index': plugin.stackLevel
                })
                .find(plugin.options.focus)
                .focus();
        }

        plugin.$element.trigger('modalOpen', [plugin, $target]);
      },
      close: function( target ) {
        var plugin = this;
        var $target = $(target);
        var $targetID = $target.attr('id');
        var $targetButton = $('[data-target="#' + $targetID + '"]');

        // 모달이 닫혀 있는 경우 return
        if ( !$(target).hasClass('is-open') ) return;

        setTimeout(function(){
          plugin.unfixedContents();
        }, 0)
        

        $target
          .removeClass(plugin.options.activeClassName)
          .attr({
            'aria-hidden': true,
            'z-index': ''
          });

        // 모달 호출 버튼으로 포커스 이동
        $targetButton.focus();

        // 모달 형제노드 aria-hidden 속성 제거
        plugin.$container
          .siblings()
          .not('[data-aria-hidden=has]')
          .removeAttr('aria-hidden')
        
        // 모달 형제노드 aria-hidden 유무 data 속성 제거
        $('body').children().removeAttr('data-aria-hidden');

        $target.siblings().each(function(i,e){
          if($(e).is('.is-open')){
            $(e).attr('aria-hidden', 'false');
          }
        })

        plugin.$element.trigger('modalClose', [plugin, $target]);
      },
      fixedContents: function() {
        var plugin = this;
        var $header = $('.app-header, .modal-full .modal__header');
        var $sticky = $('[data-sticky=app]');

        if( $('body').is('.modal-open') ) return

        if($('body').is('.nav-open')){
          plugin.currentScrollTop = plugin.$wrap.scrollTop();
        }else{
          plugin.currentScrollTop = plugin.$win.scrollTop();
        }

        if($sticky.is('.is-active')){
          $sticky.hide();  
        }
        
        plugin.$wrap
          .css({
            "position": "fixed",
            "width": "100%",
            "height": "100%",
            "overflow": "hidden"
          })
          .scrollTop( plugin.currentScrollTop )
        
        $('body').addClass('modal-open');
      },
      unfixedContents: function() {
        var plugin = this;
        var $header = $('.app-header, .modal-full .modal__header');

        if( $('body').is('.stack') ) {
          $('body').removeClass('stack')
          return
        }

        $('body').removeClass('modal-open');
        if($('body').is('.nav-open')){
        
        }else{
          plugin.$wrap
          .css({
            "position": "",
            "width": "",
            "height": "",
            "overflow": ""
          })
        }
          
        plugin.$win.scrollTop( plugin.currentScrollTop );
        $('[data-sticky=app]').show();
      }
    });

    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
        }
      });
    }

    $(function () {
      $('body').modal();
    });

  },

  /* Plugin - Checkbox Control */
  checkbox: function() {
    var pluginName = "checkbox";

    var defaults = {
      checkbox: "[data-element=checkbox__input]",
      all: "[data-element=checkbox__all]"
    };

    function Plugin(element, options) {
      this.element = element;
      this._defaults = defaults;
      this.options = $.extend({}, this._defaults, options);
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function () {
        var plugin = this;

        plugin.buildCache();
        plugin.bindEvents();
      },
      buildCache: function () {
        var plugin = this;

        plugin.$element = $(plugin.element);
        plugin.$checkbox = plugin.$element
          .find(plugin.options.checkbox)
          .not(":disabled");
        plugin.$all = plugin.$element
          .find(plugin.options.all)
          .not(":disabled");
      },
      bindEvents: function () {
        var plugin = this;

        plugin.$checkbox.on("change", function (e) {
          plugin.checkedAction();
        });

        plugin.$all.on("change", function (e) {
          plugin.allCheckedAction(this);
        });
      },
      checkedAction: function () {
        var plugin = this;

        var checkboxLength = plugin.$checkbox.length,
          checkedLength = plugin.$checkbox.filter(":checked").length;

        if (checkboxLength === checkedLength) {
          plugin.$all.prop("checked", true);
        } else {
          plugin.$all.prop("checked") &&
            plugin.$all.prop("checked", false);
        }
      },
      allCheckedAction: function (target) {
        var plugin = this;

        if ($(target).prop("checked")) {
          plugin.$checkbox.prop("checked", true);
        } else {
          plugin.$checkbox.prop("checked", false);
        }
      }
    });

    $.fn[pluginName] = function (options) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(
            this,
            "plugin_" + pluginName,
            new Plugin(this, options || $(this).data("options"))
          );
        }
      });
    };

    $(function () {
      $("[data-element=checkbox]").checkbox();
    });
  },

  /* Plugin - Select	*/
  select: function () {
    var pluginName = 'select';

    var defaults = {
      mode: "static", // slide
      containerClassName: "pualugin-select"
    }

    function Plugin( element, options ) {
      this.element = element;
      this._defaults = defaults;
      this.options = $.extend({}, this._defaults, options);
      this._basket = [];
      this._name = pluginName;
      this.flag = false;
      this.init();
    }

    $.extend(Plugin.prototype, {
      init: function() {
        var plugin = this;

        plugin.buildCache();
        plugin.setOptions();
        plugin.bindEvents();
      },
      buildCache: function() {
        var plugin = this;

        // Elements cache
        plugin.$win = $(window);
        plugin.$doc = $(document);
        plugin.$body = $('body');
        plugin.$element = $(plugin.element);
        plugin.$elementWrap = $('<div class="pualugin-select"></div>');
        plugin.$trigger = $('<button class="pualugin-select__trigger" />');
        plugin.$listbox = $('<ul class="pualugin-select__container"/>');
        plugin.$option = $('<div class="pualugin-select__option" />');

        plugin.$elementWrap
          .insertAfter(plugin.$element)
          .append(plugin.$element);

        // Initislized elements
        plugin.$trigger
          .text(
            plugin.$element
              .find('option:selected')
              .text()
          )
          .attr({
            "aria-haspopup": "listbox",
            "tabindex": "0"
          })
          .prependTo(plugin.$elementWrap);

        // Initialized aria-role
        plugin.$listbox.attr({
          role: "listbox",
          tabindex: -1
        });

        // Append elements
        // plugin.$element.prepend(plugin.$trigger);
        plugin.$body.append(plugin.$listbox);
      },
      bindEvents: function() {
        var plugin = this;

        plugin.$trigger
          .on('keydown.' + plugin._name, function(e) {
            if (e.which === 40) {
              e.preventDefault();
              plugin.open();
            }
          })
          .on('click.' + plugin._name, function(e) {
            e.preventDefault();
            plugin.toggle();
          });

        plugin.$listitem.not('.is-disabled')
          .on('click.' + plugin._name, function(e) {
            plugin.selected( this );
          })
          .on('keydown.' + plugin._name, function(e) {
            var key = e.which || e.keyCode;

            switch(key) {
              case 13:
                e.preventDefault();
                plugin.selected( this );
                break;

              case 9:
                e.preventDefault();
                plugin.close();
                break;
              case 40:
                e.preventDefault();
                plugin.next(this);
                break;
              case 38:
                e.preventDefault();
                plugin.prev(this);
                break;
              case 27:
                e.preventDefault();
                plugin.close();
                break;
            }
          });

        plugin.$element.on('change.' + plugin._name, function(e) {
          plugin.$element.trigger('onChange', [$(this), $(this).val()]);
        });

        plugin.$element
          .on('onChange.' + plugin._name, function( e, target, targetVal ) {
          })
          .on('refresh.' + plugin._name, function() {
            plugin.setOptions();
            plugin.bindEvents();
          })

        plugin.$win
          .on('load.' + plugin._name, function() {
            plugin.setPosition();
          })
          .on('resize.' + plugin._name, function() {
            plugin.setPosition();
          })
          .on('click.' + plugin._name , function(e) {
            if ( plugin.flag ) {
              if (
                !plugin.$trigger.is(e.target)
                && plugin.$trigger.has(e.target).length === 0
                && !plugin.$listbox.is(e.target)
                && plugin.$listbox.has(e.target).length === 0
              ) {
                plugin.close();
              }
            }
          });
      },
      getOptions: function() {
        var plugin = this;

        plugin.$element.find('option').each(function() {
          plugin._basket.push({
            name: $(this).text(),
            selected: $(this).attr('selected') !== undefined ? true : false,
            disabled: $(this).attr('disabled') !== undefined ? true : false
          });
        })

        return plugin._basket;
      },
      setOptions: function() {
        var plugin = this;

        var options = plugin.getOptions();

        options.forEach(function(option, idx) {
          $("<li/>")
            .appendTo(plugin.$listbox)
            .text( option.name )
            .attr({
              "class": option.selected ? 'pualugin-select__container-li is-selected' : 'pualugin-select__container-li',
              "role": "option",
              "data-index": idx
            })
            .addClass( option.disabled ? 'is-disabled' : '' );
        })

        plugin.$listitem = plugin.$listbox.find('li');
        plugin.$listitem
          .not('.is-disabled')
          .attr('tabindex', 0);
      },
      setPosition: function() {
        var plugin = this;

        var triggerPositionTop = plugin.$trigger.offset().top;
        var triggerPositionLeft = plugin.$trigger.offset().left;
        var triggerButtonWidth = plugin.$trigger.outerWidth();
        var triggerButtonHeight = plugin.$trigger.outerHeight();

        plugin.$listbox.css({
          position: "absolute",
          top: triggerPositionTop + triggerButtonHeight,
          left: triggerPositionLeft,
          width: triggerButtonWidth,
          zIndex: 111
        });
      },
      toggle: function() {
        var plugin = this;
        plugin.flag ? plugin.close() : plugin.open();
      },
      open: function() {
        var plugin = this;

        if ( plugin.flag ) return false;

        plugin.flag = true;

        plugin.$listbox.show();
        plugin.$trigger.addClass('is-active');
        plugin.$listitem.filter('.is-selected').focus();
      },
      close: function() {
        var plugin = this;

        if ( !plugin.flag ) return false;

        plugin.flag = false;

        plugin.$trigger
          .removeClass('is-active')
          .focus();

        plugin.$listbox.hide();
      },
      selected: function( option ) {
        var plugin = this;
        var $option = $(option);

        $option.addClass('is-selected');

        plugin.$listitem
          .not($option)
          .removeClass('is-selected');

        plugin.$trigger.text($option.text());

        plugin.$element
          .find('option')
          .eq($option.data('index'))
          .prop('selected', true)
          .change();

        plugin.close();
      },
      next: function( option ) {
        $(option).nextAll('[tabindex="0"]').first().focus();
      },
      prev: function( option ) {
        $(option).prevAll('[tabindex="0"]').first().focus();
      }
    });

    $.fn[pluginName] = function ( options ) {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options || $(this).data('options')));
        }
      });
    }

    $(function() {
      $('[data-element=select]').select();
    })
  }

}


 