app.controller('UsersOpportunitiesDetailCtrl',
  ['$scope', 'UsersOpportunity', '$stateParams', 'GuidanceService', 'generateGlyphs',
  function($scope, UsersOpportunity, $stateParams, GuidanceService, generateGlyphs) {

  $scope.submitText = '✔  Submit Answers';
  $scope.pendingRequests = 0;

  var addIndexAsProperty = function(arrayOfObjects){
    return arrayOfObjects.map(function(item, index){
      item.index = index;
      return item;
    });
  };

  $scope.updateInterest = function (value) {
    if (!$scope.match) { return undefined; }
    var answersFilled = $scope.match.answers.every(function (answerObj) {
      return answerObj.answer !== "" && answerObj.answer !== undefined;
    }); // returns true if $scope.match.answers is empty
    if (answersFilled === false) { 
      window.alert("Please fill out the additional guidance questions below before indicating interest.");
    } else {
      $scope.match.userInterest = value;
      UsersOpportunity.update($scope.match).then(function () { });      
    }
  };
  $scope.hasInterest = function (value) {
    if (!$scope.match) { return undefined; }
    return $scope.match.userInterest === value;
  };

  UsersOpportunity.get($stateParams._id).then(function(data){
    var match = data.match;
    var opportunity = match.opportunity;
    var questions = opportunity.questions;
    var user = data.user;

    var numQuestions = questions.length;
    var numAnswers = match.answers.length;
    var difference = numQuestions - numAnswers;

    if(questions.length !== match.answers.length){
      for(var i = 0; i < difference; i++){
        match.answers.push({
          answer: ''
        });
      }
    }

    $scope.match = match;
    $scope.answers = $scope.match.answers;
    $scope.questions = addIndexAsProperty(questions);
    $scope.opportunity = opportunity;
    var guidanceResult = GuidanceService.processTags(opportunity, user);
    var processedTags = guidanceResult[0];
    $scope.score = guidanceResult[1];
    $scope.processedTags = [processedTags.must, processedTags.nice];
    $scope.calculateFit = generateGlyphs.calculateFit;
  });

  $scope.submit = function() {
    $scope.submitText = 'Submitting...';
    $scope.pendingRequests++;
    UsersOpportunity.update($scope.match).then(function(){
      $scope.submitText = '✔  Save Successful';
      $scope.pendingRequests--;
    });
  };

}]);
