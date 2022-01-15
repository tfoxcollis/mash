function getRandomNumber(array) {
  return Math.floor(Math.random() * array.length)
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1
}

var numberButton = $("#num-gen");
numberButton.on("click", numberGenerator);
var randomNumber

function numberGenerator() {
  randomNumber = generateRandomNumber();
  var finalNumber = $("#random-number");
  finalNumber.text(randomNumber);
}

var futureButton = $("#future-btn");
futureButton.on("click", showFuture);

function getCars () {
  var cars = [];
  var carOne = $("#car-1").val();
  var carTwo = $("#car-2").val();
  var carThree = $("#car-3").val();
  return [carOne, carTwo, carThree];
}

function getLocations () {
  var locations = [];
  var locationOne = $("#live-1").val();
  var locationTwo = $("#live-2").val();
  var locationThree = $("#live-3").val();
  return [locationOne, locationTwo, locationThree];
}

function getJobs() {
  var jobs = [];
  var jobOne = $("#job-1").val();
  var jobTwo = $("#job-2").val();
  var jobThree = $("#job-3").val();
  return [jobOne, jobTwo, jobThree]
}

function getPartners() {
  var partners = [];
  var partnerOne = $("#partner-1").val();
  var partnerTwo = $("#partner-2").val();
  var partnerThree = $("#partner-3").val();
  return [partnerOne, partnerTwo, partnerThree];
}

function getKids() {
  var kids = [];
  var kidOne = $("#kid-1").val();
  var kidTwo = $("#kid-2").val();
  var kidThree = $("#kid-3").val();
  return [kidOne, kidTwo, kidThree];
}

function showFuture() {
  var future = ""
  var homes = ["Mansion", "Apartment", "Shack", "House"];

  cars = getCars();
  locations = getLocations();
  jobs = getJobs();
  partners = getPartners();
  kids = getKids();

  var bigArray = homes.concat(jobs, locations, partners, kids, cars);
  var allArrays = [homes, jobs, locations, partners, kids, cars];

  if (cars.includes("") || locations.includes("") || jobs.includes("") || partners.includes("") || kids.includes("")) {
    future = "Please fill out all fields."
  } else if (randomNumber == undefined) {
    future = "Don't forget to generate your number!"
  } else {
    while (bigArray.length > 0) {
      // remove the nth element in the big array
      var randomIndex = randomNumber - 1;
      if (randomIndex > bigArray.length - 1) {
        randomIndex = randomNumber % bigArray.length - 1;
      }
      var removedElement = bigArray.splice(randomIndex, 1).toString();

      // remove that element from the smaller category array
      allArrays.forEach(array => {
        if (array.includes(removedElement)) {
          var index = array.indexOf(removedElement);
          var removed = array.splice(index, 1);
        }
      })

      // reorder the big array to start with the next element
      var remainderOfArray = bigArray.splice(randomIndex);
      var beginningOfArray = bigArray.splice(0, randomIndex);
      var bigArray = remainderOfArray.concat(beginningOfArray);

      // if it's the last element in that category, remove it from the big array --> this is the one that has been selected
      allArrays.forEach(array => {
        if (array.length === 1 && bigArray.includes(array[0])) {
          var index = bigArray.indexOf(array[0]);
          var removed = bigArray.splice(index, 1);
        }
      })
    }

    future = `You will live in a(n) ${homes[0]}. You will spend your days as a ${jobs[0]} and drive a ${cars[0]}. You will have ${kids[0]} kid(s) with ${partners[0]} and live in ${locations[0]}.`

    $(":input").val("");

  }
  var futureParagraph = $("#future");
  futureParagraph.text(future);


}
