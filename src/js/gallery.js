import $ from "jquery";

let hiddenItems = $(".hidden");

$(document).on("click", "#load-more", function () {
  if (hiddenItems.hasClass("hidden")) {
    for (let j = 0; j < 8; j++) {
      hiddenItems[j].classList.remove("hidden");
    }
  } else {
    $("#load-more").text("No Content").addClass("noContent");
  }

  return (hiddenItems = $(".hidden"));
});
