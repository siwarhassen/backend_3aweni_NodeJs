$(document).on("click","#emoji-picker",function(e){
   e.stopPropagation();
    $('.intercom-composer-emoji-popover').toggleClass("active");
});

$(document).click(function (e) {
    if ($(e.target).attr('class') != '.intercom-composer-emoji-popover' && $(e.target).parents(".intercom-composer-emoji-popover").length == 0) {
        $(".intercom-composer-emoji-popover").removeClass("active");
    }
});

$(document).on("click",".intercom-emoji-picker-emoji",function(e){
  $("#chat-input").val($("#chat-input").val()+$(this).html());
});

$('.intercom-composer-popover-input').on('input', function() {
    var query = this.value;
    if(query != ""){
      $(".intercom-emoji-picker-emoji:not([title*='"+query+"'])").hide();
    }
    else{
      $(".intercom-emoji-picker-emoji").show();
    }
});


$(document).on("click",".file-input-tool",function(e){
$('#imgupload').trigger('click');
});


$(document).on("click","#editcover",function(e){
  $('#imguploadoo').trigger('click');
  });
  

$(document).on("click","#close-chat",function(e){
$('.chat-box').hide();
});

