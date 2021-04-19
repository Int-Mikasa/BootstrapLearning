import $ from 'jquery'
$(".navbar a").click(function () {
  $("body,html").animate(
    {
      scrollTop: $("#" + $(this).data("value")).offset().top,
    },
    1000
  );
});
