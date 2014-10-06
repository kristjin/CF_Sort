$(document).ready(function(){

  var $holdingDiv = $('#holding').hide();
  var $hdi = $('#holding>img');
  var $hdiSrc = $hdi.attr('src');
  var $i, $m, $mSrc, c, $c, $cSrc, m;

  function Deck() {
    this.suits = ['C','D','H','S'];
    this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    var theDeck = this;

    $.each(this.suits, function(index, suit) {
      $.each(theDeck.ranks, function(index, rank) {
        var card = new Card(suit, rank);
        $('#deck').append('<li class="card sorted"> <img src="'+card.img+'"/> </li>');
      });
    });
  }

  function Card(suit, rank){
    this.suit = suit;
    this.rank = rank;
    this.img = 'img/' + suit + rank + '.png';
  }

  function en($source){
    //enumerates the position of the card in the deck
    //by first checking the rank, 1-13
    //and adding the appropriate additional value for the suit

    var r = parseInt($source.substr(5));

    switch ($source.charAt(4)){
      case 'C':
        return r;
      case 'D':
        return (r+13);
      case 'H':
        return (r+26);
      case 'S':
        return (r+39);
      default:
        return null;
    }
  }

  function blank($img){
    $img.attr('src', 'img/0.png');
  }

  function change($img, toThis){
    $img.attr('src', toThis);
  }



  function shuffle(m){                                      //modifying code from class
    var rand = Math.floor(Math.random() * m);               //get a random number between 0 and the number passed as m
    var $rand;                                              //gets used later
    var $m;

    $('li').removeClass('selected');                        //remove "selected" class from all list items when shuffling

    $m = $('.card:eq(' + m + ')')                           //get the mth card
        .addClass('selected')                               //apply "selected" class to the mth card
        .hide()                                             //hide the mth card
        .fadeIn();                                          //and fade it back in
    $rand = $('.card:eq(' + rand + ')')                     //get the rand card
        .addClass('selected')                               //do as above
        .hide()
        .fadeIn();

    $m.before($rand);                                     //this places the mth card in the random card's position
    $('.card:eq(' + rand + ')').before($m);               //this places the random card in the mth position

    if (m > 0) {                                            //If we haven't reached the end  of the deck
      setTimeout(shuffle, 50, m - 1);                      //on a delay of 500ms, shuffle two cards and reduce m by 1
    } else {                                                //or, if at the end
      $('li').removeClass('selected');                      //remove the selected class
    }
  }

  function sort(){                                          //sort all cards for m
    $holdingDiv.show();
    m=1;
    c=0;
    $m = $('.card:eq(' + m + ')>img');                    //get the img element for the $m card
    $mSrc = $m.attr('src');
    $i = $m;
    var mIsSorted=false;
    console.log('calling timerID loop');
    var timerID = setInterval(function(){
      console.log('timerID is looping again, m is: ' + m);
      if (m>51) {
        clearInterval(timerID);
      } else if (mIsSorted) {
        console.log(m+'th card has been sorted');
        m++;
        console.log('m is now: ' + m);
        c = (m-1);
        console.log('and c is now: ' + c);
        $m = $('.card:eq(' + m + ')>img');                    //get the img element for the $m card
        $mSrc = $m.attr('src');                               //get the src for the $m card image
        console.log('updated $mSrc to: ' + $mSrc);
        change($hdi, $mSrc);                                      //set the holding div img to the mth card img
        $i = $m;                                              //insert point, begins at the mth position
        blank($i);                                                //set the $i (insert point) to blank card
        mIsSorted=false;
        console.log('mIsSorted set to false');
      } else if (c==-1) {       //you're at the top of the list so put m in position 1
        console.log('at top of list c=0');
        $i = $('.card:eq(0)>img');
        change($i, $mSrc);
        blank($hdi);
        mIsSorted=true;
        console.log('set mIsSorted to true.')
      } else {
        console.log('not at top of list, so comparing');
        console.log('c is: '+c);
        $c = $('.card:eq(' + c + ')>img');                        //set $c to the cth card
        $cSrc = $c.attr('src');                                   //and get its src
        console.log('$cSrc is: '+$cSrc);
        console.log('$mSrc is: ' + $mSrc);
        if(en($mSrc)<en($cSrc)){                                  //if m rank < c rank
          console.log('*** m<c so butt down');
          change($i, $cSrc);                                        //Change $i (blank) to $c img
          blank($c);                                                //blank the comparison point
          $i = $c;                                                  //set the insert point to the comparison point
          c--;
        } else {                                                  //if m rank > c rank, then m belongs in $i so
          console.log('*** m>c so m belongs in $i');
          change($i, $mSrc);                                        //move m into to the insert point
          blank($hdi);                                              //blank the holding div img
          mIsSorted=true;
        }
      }
    }, 10);                                                  //end timerID (comparison) loop                                                          //end while loop, advancing M 1-52
  }                                                         //end sort()


  $('#shuffle').on('click', function() {
    shuffle($(".card").length - 1);                         //call shuffle function passing length of deck -1 (0-array)
  });

  $('#sort').on('click', function(){
    sort();
  });


  var deck = new Deck();



});
/**
 * Created by evilOlive on 10/2/2014.
 */

