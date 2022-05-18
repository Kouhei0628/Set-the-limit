"use strict";
//これがready関数
// window.on('load', () => {
//     $('#js-loader').css('display', 'none');
// });
$(function() {

    if ($("body").css("opacity", 1)) {
        $(".loader").css("display", "none");
    }
});