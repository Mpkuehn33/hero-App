
//Displays first Hero
$(document).ready(function(){
  getHero()
})


//edit API key here
var url = "https://hero-merge.herokuapp.com/b34ec9d5/heroes/"


//After getHero retrieves Data, showHero displays it
var showHero = function(hero_name, real_name, gender, attributes, powers, weaknesses){
  $('.hero').append("<p>Hero Name: " + hero_name + "</p>" +
                   "<p>Real Name: " + real_name+ "</p>" +
                    "<p>Gender: " + gender + "</p>" +
                    "<p>Intelligence: " + attributes.intelligence + "</p>" +
                    "<p>Strength: " + attributes.strength + "</p>" +
                    "<p>Speed: " + attributes.speed + "</p>" +
                    "<p>Durability: " + attributes.durability + "</p>" +
                    "<p>Power: " + attributes.power + "</p>" +
                    "<p>Combat: " + attributes.combat + "</p>" +
                    "<p>Powers: " + powers + "</p>" +
                    "<p>Weaknesses: " + weaknesses + "</p>"
                   );
}

//gets hero data
var getHero = function(){
  $.getJSON(url  + currentHero.toString(), function(data){
    showHero(data.hero_name, data.real_name, data.gender, data.attributes, data.powers, data.weaknesses);
    console.log(data);
  });
}

var clearDiv = function(){
  $('.hero').html("");
}

// Keep track of displayed hero
var currentHero = 1;

var nextHero = function(){
  clearDiv();
  currentHero += 1;
  getHero();
}

var prevHero = function(){
  //empty the div before new data is displayed
  clearDiv();
  //get data on hero, then display hero
  currentHero -= 1;
  getHero();
  //keep track of which hero is on display
  
}



// ***** Create Hero *****
var newHero = "";

//Pulls form data, calls post function
var createHero = function(){
  var hero_name = $('#hero_name').val();
  var real_name = $('#real_name').val();
  var gender = $('#gender').val();
  var intelligence1 = $('#intelligence').val();
  var intelligence = parseInt(intelligence1);
  var strength1 = $('#strength').val();
  var strength = parseInt(strength1);
  var speed1 = $('#speed').val();
  var speed = parseInt(speed1);
  var durability1 = $('#durability').val();
  var durability = parseInt(durability1);
  var power1 = $('#power').val();
  var power = parseInt(power1);
  var combat1 = $('#combat').val();
  var combat = parseInt(combat1);
  var powers1 = $('#powers').val();
  var powers = powers1.split(",");
  var weaknesses1 = $('#weaknesses').val();
  var weaknesses = weaknesses1.split(",");

  console.log(hero_name, real_name, gender, intelligence, strength, speed, durability, power, combat);



  newHero= {"hero_name" : hero_name,
              "real_name" : real_name,
              "gender" : gender,
              "attributes" : {
              "intelligence": intelligence,
              "strength": strength,
              "speed": speed,
              "durability": durability,
              "power": power,
              "combat": combat
              },
              "powers" : powers,
              "weaknesses" : weaknesses
             };
  postHero();
};

//posts created hero
var postHero = function(){
  $.post( {
    url: url,
    data: JSON.stringify(newHero),
    contentType: 'application/json',
    success: function(data){
        alert("Your hero has been created and added to the existing heroes list");
        $('.merge').css("display", "inline-block");
        $('.create').css("display", "none");
    }
});
}


// **** Merge Heroes **** 
function mergeInstead(){
  $('.merge').css("display", "inline-block");
  $('.create').css("display", "none");
}

//updates chosen heroes
var chooseHero = function(id){
  $.getJSON(url  + currentHero.toString(), function(data){
    if (hero1 === ""){
      hero1 = new Hero(data.hero_name, data.real_name, data.gender, data.attributes, data.powers, data.weaknesses);
      $('#picked').append("<p>Hero 1: " + data.hero_name);
    } else if (hero2 === "") {
        hero2 = new Hero(data.hero_name, data.real_name, data.gender, data.attributes, data.powers, data.weaknesses);
        $('#picked').append("<p>Hero 2: " + data.hero_name);
    } 
    if(hero1 !== "" && hero2 !== ""){
      //adds collective powers of heroes into dropdown
      heroTraits();
    }
    console.log(data);
  });
}
var hero1 = "";
var hero2 = "";


//hero constructor obj
function Hero(hero_name, real_name, gender, attributes, powers, weaknesses){
  this.hero_name = hero_name;
  this.real_name = real_name;
  this.gender = gender;
  this.attributes = attributes;
  this.powers = powers;
  this.weaknesses = weaknesses; 
}

//adds powers to list of options
var heroTraits = function(){
  for(x = 0; x < hero1.powers.length; x++){
    $('#powerlist').append("<option value='" + hero1.powers[x] +"'>")
  }
  for(x = 0; x < hero2.powers.length; x++){
    $('#powerlist').append("<option value='" + hero2.powers[x] +"'>")
  }
};

var heroPowers = [];

//adds selected power heroPowers array
var addPower = function(){
  if (heroPowers.length < 5){
    heroPowers.push($('#powerslist').val())
    $('#pickedPowers').append("<br>" + $('#powerslist').val());
  }
  else{
    alert("Your hero is allowed only 5 powers. You are creating a Hero, not a god!");
  }
}
var mergedHero = "";

//Pulls all necessary data, creates the merged hero
var mergeHero = function(){
  var newName = $('#heroName').val();
  var civName = $('#civName').val();
  var gendR = $('#gendR').val();
  var attributes = {
              "intelligence": (hero1.attributes.intelligence + hero2.attributes.intelligence) / 2,
              "strength": (hero1.attributes.strength + hero2.attributes.strength) / 2,
              "speed": (hero1.attributes.speed + hero2.attributes.speed) / 2,
              "durability": (hero1.attributes.durability + hero2.attributes.durability) / 2,
              "power": (hero1.attributes.power + hero2.attributes.power) / 2,
              "combat": (hero1.attributes.combat + hero2.attributes.combat) / 2
              }
  var powers = heroPowers;
  var weaknesses = hero1.weaknesses.concat(hero2.weaknesses);   

  mergedHero = new Hero(newName, civName, gendR, attributes, powers, weaknesses);
  addMergedHero();

}

//posts the merged hero 
var addMergedHero = function(){
  $.post( {
    url: url,
    data: JSON.stringify(mergedHero),
    contentType: 'application/json',
    success: function(data){
        alert("You have officially merged " + hero1.hero_name + " and " + hero2.hero_name + " into a new entity known as " + mergedHero.hero_name + ". Science! You can now find " + mergedHero.hero_name + " in the existing heroes list.");
        $('.merge').css("display", "inline-block");
        $('.create').css("display", "none");
    }
});
}

