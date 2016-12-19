$("#img_input").on("change", function(event) {

  var file = event.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(arg) {

    var img = '<img class="preview" width="400px" src="' + arg.target.result + '" alt="preview"/>';
    $(".preview_box").empty().append(img);
  }
});