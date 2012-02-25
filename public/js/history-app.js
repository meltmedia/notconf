var Site = {};
(function($) {

  var hasHistory = function() {
        return !!(window.history && history.pushState);
      };
  
  Site.Wufoo = {
    'base': {
      'userName':'meltmedia', 
      'autoResize':true,
      'header':'show', 
      'ssl':true
    },
    '/register' : { 
      'formHash':'z7x0w7',
      'height':'520'
    },
    '/register/sponsor' : { 
      'formHash':'z7x0r3',
      'height':'576'
    },
    '/register/speaker' : {
      'formHash':'z7x1z5',
      'height':'746'
    },
    '/register/volunteer' : {
      'formHash':'z7x0k1',
      'height':'703'
    }
  };

  document.write = function() {
    Site.currentFormHolder.append($(arguments[0]));
  };

  $(function() {
    var $contentHolder = $('#content .section-content'),
        $contentArea = $('#content .section-content .swap-content'),
        $initForm = $contentArea.find('.wufoo-form-holder'),
        rootUrl = History.getRootUrl(),
        $body = $('body'),
        $title = $('title'),
        $scrollTo = $('#navigation'),
        addForm = function($c, pageUrl) {
          var formSpecifics = Site.Wufoo['/'+pageUrl.replace(rootUrl, '')],
              $formHolder = $c.find('.wufoo-form-holder');
          
          if (typeof formSpecifics !== 'undefined' && $formHolder.length > 0) {
            var formObj = $.extend(Site.Wufoo.base, formSpecifics);
            Site.currentForm = new WufooForm();
            Site.currentForm.initialize(formObj);
            Site.currentFormHolder = $formHolder;
            $formHolder.append("<scr"+"ipt>Site.currentForm.display();</scr"+"ipt>");
          }
        };
        
    addForm($contentArea, window.location.href);
    
    if (!hasHistory()) {
      return;
    }
    
    $.expr[':'].internal = function(obj, index, meta, stack) {
      // Prepare
      var $link = $(obj),
          url = $link.attr('href') || '';
          
      // It is internal if it begins with the root url or if it has no :, also ignore named anchors
      return ((url.substring(0, rootUrl.length) === rootUrl || url.indexOf(':') === -1) && url.charAt(0) !== "#");
    };

    // Ajaxify Helper
    $.fn.ajaxify = function() {
      // Prepare
      var $this = $(this);
      
      // Ajaxify
      $this.find('a:internal').click(function(event) {
        // Prepare
        var $link = $(this),
            url = $link.attr('href');

        // Continue as normal for cmd clicks etc
        if (event.which == 2 || event.metaKey) {
          return true;
        }

        // Ajaxify this link
        History.pushState(null, null, url);
        event.preventDefault();
        return false;
      });

      // Chain
      return $this;
    };

    $body.ajaxify();

    $(window).bind('statechange', function() {
      
      var State = History.getState(),
          url = State.url,
          relativeUrl = '/' + url.replace(rootUrl, ''),
          successFn = function(data) {
            var $data = $(data),
                $content = $data.filter('section.section-content').ajaxify(),
                title = "NotConf - " + $content.data('title'),
                id = $content.attr('id');
                
            $contentHolder.attr('id', id);
            
            // Reset active nav states
            $scrollTo.find('a').removeClass('active').filter('[href^="/'+relativeUrl.split('/')[1]+'"]').addClass('active');
            // Append any wufoo scripts back into their rightful parent
            addForm($content, url);

            $contentArea.fadeOut(400, function() {
              var $swapContent = $content.find('.swap-content');
              $(this).replaceWith($swapContent).fadeIn(400);
              $contentArea = $swapContent;
            });

            $title.text(title);
            _gaq.push(['_trackPageview', relativeUrl]);

            var currentTopPx = $body.scrollTop(),
                scrollTopPx = $scrollTo.offset().top,
                distance = (currentTopPx > scrollTopPx) ? currentTopPx - scrollTopPx : 0;

            if (distance > $scrollTo.outerHeight()) {
              $('html, body').animate({
                scrollTop: scrollTopPx
              }, distance * 2);
            }
          },
          errorFn = function(jqXHR, textStatus, errorThrown) {
            document.location.href = url;
            return false;
          };

      $.ajax({
        url: '/_' + relativeUrl,
        dataType: 'html',
        success: successFn,
        error: function(jqXHR, textStatus, errorThrown) {
          if (jqXHR.status === 404) {
            $.ajax({
              url: '/_/404',
              dataType: 'html',
              success: successFn,
              error: errorFn
            });
          } else {
            document.location.href = url;
          }
        }
      });

      return false;
    });

  });
})(jQuery);
