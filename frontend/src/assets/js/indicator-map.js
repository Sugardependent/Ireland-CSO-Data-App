
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

  var map_crime_dub = [
    "db"
  ]

  var map_crime_northern = [
    "cn",
    "dl",
    "mn",
    "le",
    "so",
    "lh"
  ]

  var map_crime_western = [
    "mo",
    "ga",
    "rn",
    "ce",
    "lg"
  ]

  var map_crime_eastern = [
    "mh",
    "wh",
    "la",
    "oy",
    "kd",
    "ww"
  ]

  var map_crime_southern = [
    "tp",
    "kl",
    "cw",
    "wx",
    "wd"
  ]

  var map_crime_south_eastern = [
    "li",
    "ck",
    "ke"
  ]

  var map_crime_all = [ "dbc", "noc", "wec", "eac", "soc", "nec" ];

  var map_trigs_all = [];
  map_trigs_all = map_trigs_all.concat(map_trigs_ulster);
  map_trigs_all = map_trigs_all.concat(map_trigs_connacht);
  map_trigs_all = map_trigs_all.concat(map_trigs_munster);
  map_trigs_all = map_trigs_all.concat(map_trigs_leinster);
  map_trigs_all = map_trigs_all.concat(map_trigs_prov_nation);
  map_trigs_all = map_trigs_all.concat(map_crime_all);



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
        $(".indicator-map li").css('color', '#999');

        if (current_t === "roi") {

          $(".indicator-map li").css('color', '#009900');

        } else if (current_t === "uls") {

          for (var i = 0; i < map_trigs_ulster.length; i++) {
            $(".indicator-map li." + map_trigs_ulster[i]).css('color', '#009900');
          }

        } else if (current_t === "con") {

          for (var i = 0; i < map_trigs_connacht.length; i++) {
            $(".indicator-map li." + map_trigs_connacht[i]).css('color', '#009900');
          }

        } else if (current_t === "mun") {

          for (var i = 0; i < map_trigs_munster.length; i++) {
            $(".indicator-map li." + map_trigs_munster[i]).css('color', '#009900');
          }

        } else if (current_t === "lei") {

          for (var i = 0; i < map_trigs_leinster.length; i++) {
            $(".indicator-map li." + map_trigs_leinster[i]).css('color', '#009900');
          }

        }

      } else if (jQuery.inArray(current_t, map_crime_all) > -1) {

        $(".indicator-map li").css('color', '#999');

        if (current_t === "dbc") {

          $(".indicator-map li." + "db").css('color', '#003366');

        } else if (current_t === "noc") {

          for (var i = 0; i < map_crime_northern.length; i++) {
            $(".indicator-map li." + map_crime_northern[i]).css('color', '#003366');
          }

        } else if (current_t === "wec") {

          for (var i = 0; i < map_crime_western.length; i++) {
            $(".indicator-map li." + map_crime_western[i]).css('color', '#003366');
          }

        } else if (current_t === "eac") {

          for (var i = 0; i < map_crime_eastern.length; i++) {
            $(".indicator-map li." + map_crime_eastern[i]).css('color', '#003366');
          }

        } else if (current_t === "soc") {

          for (var i = 0; i < map_crime_southern.length; i++) {
            $(".indicator-map li." + map_crime_southern[i]).css('color', '#003366');
          }

        } else if (current_t === "sec") {

          for (var i = 0; i < map_crime_south_eastern.length; i++) {
            $(".indicator-map li." + map_crime_south_eastern[i]).css('color', '#003366');
          }

        }

      } else {
        //console.log("---color trig---");
        $(".indicator-map li").css('color', '#999');
        $(".indicator-map li." + current_t).css('color', '#009900');
      }
    }

  });

  /* Hover Dropdown JS */
  /*
  $('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500);
}, function() {
$(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);
});
*/

/*
$(function(){
var i = 0;
while(i<100){
$(".graph-container").append("<p>here</p>");
i++;
}
})
*/
};
