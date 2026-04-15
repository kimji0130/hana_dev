function initMybUI () {
	mybUI.divider('.divider-menu, .header-btn__divider');
	mybUI.swipePack('.compt-slide__single', 'manualSingle', 1, 0);			
	mybUI.swipePack('.compt-exchangeInfo__slide-wrap', 'centerLoop', 2, 0);			
	mybUI.swipePack('.compt-slide__news', 'vertical', 1, 0);			
	mybUI.swipePack('.compt-slide__type3', 'scrollbar', 2.8, 24);			
	mybUI.swipePack('.compt-slide__financial', 'scrollbar', 2.4, 24);			
	mybUI.swipePack('.main-skinbase .compt-slide__financial', 'scrollbar', 2, 24);			
	mybUI.swipePack('.main.main-branch .compt-slide__financial', 'scrollbar', 2, 24);			
	mybUI.swipePack('.main.main-cardscroll .compt-cardscroll', 'cardScroll', 1.2, 24, {delay: 3000});
	mybUI.swipePack('.main.main-employee .compt-slide__financial', 'scrollbar', 2.4, 24);			
	mybUI.swipePack('.main.main-employee .compt-cardscroll', 'cardScroll', 1.1, 24, {delay: 3000});
	mybUI.swipePack('.compt-slide__banner', 'basic', 1, 15);		
	mybUI.swipePack('.main-employee .compt-slide__cardtxt', 'basic', 1, 15);
	mybUI.swipePack('.main-newcardscroll .compt-cardscroll', 'cardScroll', 1, 24, {delay: 3000});
	mybUI.swipePack('.main-skinbase .compt-cardscroll', 'cardScroll', 1, 24, {delay: 3000});
	mybUI.toggleEvent('.icon-like');
	mybUI.inputField('.input, .textarea'); 
}

function initMybUIExcDrivider() {
	mybUI.swipePack('.compt-slide__single', 'manualSingle', 1, 0);			
	mybUI.swipePack('.compt-exchangeInfo__slide-wrap', 'centerLoop', 2, 0);			
	mybUI.swipePack('.compt-slide__news', 'vertical', 1, 0);			
	mybUI.swipePack('.compt-slide__type3', 'scrollbar', 2.8, 24);			
	mybUI.swipePack('.compt-slide__financial', 'scrollbar', 2.4, 24);			
	mybUI.swipePack('.main-skinbase .compt-slide__financial', 'scrollbar', 2, 24);					
	mybUI.swipePack('.main.main-branch .compt-slide__financial', 'scrollbar', 2, 24);		
	mybUI.swipePack('.main.main-cardscroll .compt-cardscroll', 'cardScroll', 1.2, 24, {delay: 3000});
	mybUI.swipePack('.main.main-employee .compt-slide__financial', 'scrollbar', 2.4, 24);		
	mybUI.swipePack('.main.main-employee .compt-cardscroll', 'cardScroll', 1.1, 24, {delay: 3000});
	mybUI.swipePack('.compt-slide__banner', 'basic', 1, 15);		
	mybUI.swipePack('.main-employee .compt-slide__cardtxt', 'basic', 1, 15);
	mybUI.swipePack('.main-newcardscroll .compt-cardscroll', 'cardScroll', 1, 24, {delay: 3000});
	mybUI.swipePack('.main-skinbase .compt-cardscroll', 'cardScroll', 1, 24, {delay: 3000});
	mybUI.toggleEvent('.icon-like');
	mybUI.inputField('.input, .textarea'); 
}

function initMybComponents () {
  mybUICompt.form();
  mybUICompt.modal();
}

/* Scroll Animation */
document.addEventListener("DOMContentLoaded", function(){
	AOS.init({
		easing : "ease-out",
		duration : 650
	});
});


const mybUI = {	
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
	swipePack: function (obj, options, count, space, auto) {
		var $obj = null;
		var $count = count;
		var $space = space;
		var $auto = auto;

		var $options = {
			basic : {
				slidesPerView: $count,
				spaceBetween: $space,
				centeredSlides: false,
				autoplay: { delay: 3000 },
				nested:true,
				loop: true,
				pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
			},
			manualSingle: {
				slidesPerView: $count,
				spaceBetween: $space,
				loop: true,
				autoplay: true,
				pagination: { el: '.swiper-pagination', clickable: true }
			},
			centeral: {
				slidesPerView: $count,
				spaceBetween: $space,
				pagination: { el: '.swiper-pagination', clickable: true }
			},
			scrollbar: {
				slidesPerView: $count,
				spaceBetween: $space,
				autoplay: $auto,
				scrollbar: { el: '.swiper-scrollbar', hide: false },
				pagination: { el: '.swiper-pagination', type: 'fraction'}
			},
			vertical: {
				slidesPerView: $count,
				spaceBetween: $space,
				autoplay: $auto,
				loop: true,
				direction: 'vertical',
				autoplay: { delay: 3000 }
			},
			centerLoop: {
				slidesPerView: $count,
				spaceBetween: $space,
				loop: true,
				loopAdditionalSlides: 1,
				autoplay: true
			},
			horizontalScrollbar: { 
				direction: 'horizontal',
				slidesPerView: 'auto',
				centeredSlides: false,
				freeMode: true,
				draggable: true,
				nested:true,
				scrollbar:{el: '.swiper-scrollbar'},
				mousewheel: true
			},
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
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			},
			cardScroll: {
				slidesPerView: $count,
				spaceBetween: $space,
				/*autoplay: $auto,*/
				loop: true,
				nested:true,
				pagination: { 
					el: '.slider-swiper-pagination',
					clickable: true
				},
				on:{
					slideChangeTransitionStart : function(swiper){
						setTimeout(function(){
							var pageTotal = $obj.children('.slider-swiper-pagination').find('.swiper-pagination-bullet').length;
							var pageIndex = $obj.children('.slider-swiper-pagination').find('.swiper-pagination-bullet-active').index();
							$obj.find('.active-pageNum').text(pageIndex + 1);
							$obj.find('.total-pageNum').text(pageTotal);
						}, 10);
					},
				},

			},
		}
	
		function init (obj, options) {
				var optionsObj = $options[options];
				
				$obj = $(obj);

				var swiper = new Swiper($obj, optionsObj);

				//compt-cardscroll : only one image
				if ($('.compt-cardscroll .swiper-slide').length <= 1) { 
						$(' .swiper-wrapper').addClass('disabled');
						$(' .swiper-pagination').addClass('disabled');
						$(' .compt-cardscroll').addClass('space');
						$(' .slider-swiper-pagination').css('display', 'none');
						$(' .slider-swiper-pageNum').css('display', 'none');
				}

			}


			init(obj, options);
	},
	toggleEvent: 	function (obj) {
		var $obj = null
		
		function init (obj) {
			$obj = $(obj);

			$obj.on('click', function () {
				$obj.toggleClass('active')
			});
		};

		init(obj)
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

        // 紐⑤떖 而⑦뀒�대꼫 �앹꽦
        var container = $('<div />')
          .addClass(plugin.options.modalClassName)
          .attr('data-element', 'modal')
          .appendTo('body');

        // document�� �덈뒗 紐⑤떖�� 李얠븘�� 紐⑤떖 而⑦뀒�대꼫�� append
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

        // 紐⑤컮�� 泥댄겕
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

        // 紐⑤떖�� �대� �대젮 �덈뒗 寃쎌슦 return
        if ( $(target).hasClass('is-open') ) return;

        // 紐⑤떖�� ���댄��� �덈뒗 寃쎌슦 �ъ빱�� 諛쏆쓣 data �띿꽦 異붽�
        if ($target.find('h1').length) {
          $target.find('h1').attr({
            'data-element' : 'focus'
          })
        }

        // 紐⑤떖 �뺤젣�몃뱶 aria-hidden �좊Т 泥댄겕
        if(!$('body').is('.modal-open')){
          $('body').children().each(function(i,e){
            if ($(e).is('[aria-hidden=true]')) {
              $(e).attr({
                'data-aria-hidden' : 'has'
              });
            }
          })
        }

        // 紐⑤떖 �뺤젣�몃뱶 aria-hidden �띿꽦 異붽�
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

            //�щ씪�대뱶�앹뾽�� ��씠 �덈뒗 寃쎌슦
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

        // 紐⑤떖�� �ロ� �덈뒗 寃쎌슦 return
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

        // 紐⑤떖 �몄텧 踰꾪듉�쇰줈 �ъ빱�� �대룞
        $targetButton.focus();

        // 紐⑤떖 �뺤젣�몃뱶 aria-hidden �띿꽦 �쒓굅
        plugin.$container
          .siblings()
          .not('[data-aria-hidden=has]')
          .removeAttr('aria-hidden')
        
        // 紐⑤떖 �뺤젣�몃뱶 aria-hidden �좊Т data �띿꽦 �쒓굅
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

  }
}