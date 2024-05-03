
  if (typeof window.jQuery !== 'undefined') {
    if(jQuery('body').length > 0) {

      setTimeout(function(){
        jQuery('#popup-banner').modal('show');
      }, 5000);
    }    
  }
