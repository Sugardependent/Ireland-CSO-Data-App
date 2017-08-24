
window.onload = function() {

  var map_trigs_ulster = [
    "cn",
    "dl",
    "mn"
  ];

  var map_trigs_connacht = [
    "ga",
    "le",
    "mo",
    "rn",
    "so"
  ];

  var map_trigs_munster = [
    "ce",
    "ck",
    "ke",
    "li",
    "tp",
    "wd"
  ];

  var map_trigs_leinster = [
    "cw",
    "db",
    "kd",
    "kl",
    "la",
    "lg",
    "lh",
    "mh",
    "oy",
    "wh",
    "wx",
    "ww"
  ];

  var map_trigs_prov_nation = [
    "roi",
    "uls",
    "con",
    "mun",
    "lei"
  ]

  var map_ni = [
    "an",
    "ar",
    "de",
    "do",
    "fe",
    "ty"
  ]

  var map_trigs_all = [];
  map_trigs_all = map_trigs_all.concat(map_trigs_ulster);
  map_trigs_all = map_trigs_all.concat(map_trigs_connacht);
  map_trigs_all = map_trigs_all.concat(map_trigs_munster);
  map_trigs_all = map_trigs_all.concat(map_trigs_leinster);
  map_trigs_all = map_trigs_all.concat(map_trigs_prov_nation);

  $("a.trig_county").click(function() {
    var current_t = "none";
    var county_t = "none";
    for ( var i = 0; i < map_trigs_all.length; i++ ) {
      county_t = map_trigs_all[i];
      if ( $(this).hasClass(county_t) ) {
        current_t = county_t;
      };
    };

    if (current_t != "none") {

      if (jQuery.inArray(current_t, map_trigs_prov_nation) > -1) {

        if (current_t === "roi") {

          $(".indicator-map li").css('color', '#009900');

        } else if (current_t === "uls") {

          $(".indicator-map li").css('color', '#999');
          for (var i = 0; i < map_trigs_ulster.length; i++) {
            $(".indicator-map li." + map_trigs_ulster[i]).css('color', '#009900');
          }

        } else if (current_t === "con") {

          $(".indicator-map li").css('color', '#999');
          for (var i = 0; i < map_trigs_connacht.length; i++) {
            $(".indicator-map li." + map_trigs_connacht[i]).css('color', '#009900');
          }

        } else if (current_t === "mun") {

          $(".indicator-map li").css('color', '#999');
          for (var i = 0; i < map_trigs_munster.length; i++) {
            $(".indicator-map li." + map_trigs_munster[i]).css('color', '#009900');
          }

        } else if (current_t === "lei") {

          $(".indicator-map li").css('color', '#999');
          for (var i = 0; i < map_trigs_leinster.length; i++) {
            $(".indicator-map li." + map_trigs_leinster[i]).css('color', '#009900');
          }

        }
      } else {
        console.log("---color trig---");
        $(".indicator-map li").css('color', '#999');
        $(".indicator-map li." + current_t).css('color', '#009900');
      }
    }

  });

  /* Hover Dropdown JS */
  $('ul.nav li.dropdown').hover(function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
  }, function() {
    $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
  });

   $(function(){
     var i = 0;
     while(i<100){
      $(".graph-container").append("<p>here</p>");
      i++;
     }
    })
};
