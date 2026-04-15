function initMybUIProduct (pageNum) { 
    if(pageNum==null || pageNum=="" ){pageNum = 0;}
	mybUIproduct.tabLoan('.product-loan-tab');
    mybUIproduct.productAccodian('.product-accodian>li');	
    mybUIproduct.swipePack('.compt-slide__productmall-cont', 'slideThumb', 1, 0, pageNum);	
    mybUIproduct.swipePack('.product-loan-slide', 'pagination', 1, 0);
} 
	
const mybUIproduct = {
	swipePack: function (obj, options, count, space, pageNum) {
		var $obj = null; 
		var $count = count;
		var $space = space;
		var $options = {
			pagination : {
				slidesPerView:$count,
				spaceBetween: $space,
                autoHeight: true,
                nested:true,
                pagination: {
                    el: '.loan-swiper-pagination',
                    type: 'bullets',
                    clickable: true
                }
			},
            slideThumb : {
                slidesPerView:$count,
				spaceBetween: $space,
                autoHeight: true,
                slideToClickedSlide: true,
                initialSlide:pageNum,
                thumbs: {
                    swiper: swiper = new Swiper('.compt-slide__productmall-top', {slidesPerView:'auto', touchRatio: 0, spaceBetween:0})
                },
            } 
		}
	
		function init (obj, options) {
				var optionsObj = $options[options];				
				$obj = $(obj);
				var swiper = new Swiper($obj, optionsObj);

			}		
			init(obj, options);
	},

    tabLoan: function(obj) { 
        var $el = $(obj);
        var $target= $('.product-loan-tabList>li>a')
        var $el1= '.product-loan-tabList';
        var $el2 = '.product-loan-tabContent';
        var prH = $('.product-loan-slide').outerHeight();
        
        function init(){
            $el.each(function(i){       
                var activeIdx = $el.eq(i).children($el1).children('li.active').index();
                $el.eq(i).children($el1).children('li').children('a').attr({'aria-selected': 'false'});
                $el.eq(i).children($el1).children('li.active').children('a').attr({'aria-selected': 'true'});       
                $el.eq(i).find($el2).css({'display':'none'});
                $el.eq(i).find($el2).eq(activeIdx).css({'display':'block'});

                if( $el.eq(i).hasClass('slide-inner__tap')){
                    var elH =  $el.outerHeight();
                    $('.compt-slide__productmall-cont>.swiper-wrapper').css('height', (prH + elH + 80));
                }             
            });
        }
        function event(){
            $target.on({
                'click' : function(e){
                       
                    $(this).parents($el1).children('li').removeClass('active');
                    $(this).closest('li').addClass('active');                
                    init(); 
                   
                }
            });
        }
        init();
        event();           
    },
    productAccodian: function(obj) { 
        var $el = $(obj);
        var $target= $('.product-accodian>li>a');
        var $active=$('.product-accodian>li>a.active');
        var $elCon = '.product-accodian__cont';

        function event(){
            $active.next($elCon).slideDown(100); 
            $target.on({
                'click' : function(e){
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                        // $(this).next($elCon).css('display', 'none');
                        $(this).next($elCon).slideUp(100);                 
                    }else{
                        $(this).addClass('active');
                        // $(this).next($elCon).css('display', 'block');
                        $(this).next($elCon).slideDown(100);   
                    }
                }
            });
        }       
        event();           
    }	
} 