$(document).ready(function () {
  var FLAG_wobblyness = 20; //range of movement from centre
  var FLAG_intervalRate = 500;
  var FLAG_RotRange = 25;
  var FLAG_SkewRange = 25;
  var wobblyTextSpans = ".wobblyText span";

  var interval = 0;
  var eachletter = init();

  /***** startup stuff ******/

  function init() {
    $(".wobblyText").each(function () {
      var wobbleHTML;

      if (this.classList && Object.values(this.classList).includes("word")) {
        wobbleHTML = addSpans(splitStringOnSpaces($(this).text()));
      } else {
        wobbleHTML = addSpans(splitString($(this).text()));
      }
      replaceWobbleTextHTML(wobbleHTML, this);
    });

    interval = setInterval(intervalFunction, FLAG_intervalRate);
  }

  //split all characters in string into array
  function splitString(strInput) {
    return strInput.split("");
  }

  // split string into array on 'space' character
  function splitStringOnSpaces(strInput) {
    return strInput.split(" ");
  }

  //make a string of each character inside a span
  function addSpans(arrInput) {
    var strInputSpans = " ";

    function addSpan(charInput) {
      var charToInput = charInput;

      if (charToInput === "") charToInput = "&nbsp";
      strInputSpans += "<span>" + charToInput + "</span>";
    }

    arrInput.forEach(addSpan);

    return strInputSpans;
  }

  /***** element HTML & CSS modification ******/

  function setWobbleCSS($element, top, left, rot, skew) {
    var tranform = "rotate(" + rot + "deg) skew(" + skew + "deg)";
    $element.css("top", top);
    $element.css("left", left);
    $element.css("transform", tranform);
  }

  function replaceWobbleTextHTML(strInputHTML, inputElement) {
    $(inputElement).html(strInputHTML);
  }

  /***** maths ******/

  //return random number within range min and max
  function intRandomRange(range) {
    return Math.random() * (range * 2) - range;
  }

  /***** main loop ******/

  function intervalFunction() {
    $(wobblyTextSpans).each(function (index) {
      setWobbleCSS(
        $(this),
        intRandomRange(FLAG_wobblyness),
        intRandomRange(FLAG_wobblyness),
        intRandomRange(FLAG_RotRange),
        intRandomRange(FLAG_SkewRange)
      );
    });
  }
});

/* image stuff */
