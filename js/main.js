
$(".navbar a").click(function(){
  $("body,html").animate({
   scrollTop:$("#" + $(this).data('value')).offset().top
  },1000)
  
 })

let hiddenItems = $('.hidden');

$(document).on("click","#loadmore", function () {
    if (hiddenItems.hasClass('hidden')) {
      for (j = 0; j < 4 ; j++) {
        hiddenItems[j].classList.remove('hidden')
      }
    } else {
      $('#loadmore').text('No Content').addClass("noContent")
    }

  return hiddenItems = $('.hidden');
});
