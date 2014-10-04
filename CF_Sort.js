$(document).ready(function(){

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

  function shuffle(m){                                      //modifying code from class
    var rand = Math.floor(Math.random() * m);               //get a random number between 0 and the number passed as m
    var $rand;                                              //gets used later

    $('li').removeClass('selected');                        //remove "selected" class from all list items when shuffling

    $mth = $('.card:eq(' + m + ')')                         //get the mth card
        .addClass('selected')                               //apply "selected" class to the mth card
        .hide()                                             //hide the mth card
        .fadeIn();                                          //and fade it back in
    $rand = $('.card:eq(' + rand + ')')                     //get the rand card
        .addClass('selected')                               //do as above
        .hide()
        .fadeIn();

    $mth.before($rand);                                     //this places the mth card in the random card's position
    $('.card:eq(' + rand + ')').before($mth);               //this places the random card in the mth position

    if (m > 0) {                                            //If we haven't reached the end  of the deck
      setTimeout(shuffle, 500, m - 1);                      //on a delay of 500ms, shuffle two cards and reduce m by 1
    } else {                                                //or, if at the end
      $('li').removeClass('selected');                      //remove the selected class
    }
  }

  $('#shuffle').on('click', function() {
    shuffle($(".card").length - 1);                         //call shuffle function passing length of deck -1 (0-array)
  });

  var deck = new Deck();



});
/**
 * Created by evilOlive on 10/2/2014.
 */

