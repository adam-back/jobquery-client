app.controller('AdminMatchesCtrl',
  ['$scope', '$state', '$http', 'Match', 'Opportunity', 'User', 'Scheduler', 'SERVER_URL',
  function ($scope, $state, $http, Match, Opportunity, User, Scheduler, SERVER_URL) {

  Match.getAll().then(function (matchData) {
    User.getAll().then(function (users) {
      $scope.users = users;
      $scope.matches = matchData.matches;
      $scope.opportunities = matchData.opportunities;

      var oppColumnMap = {};
      var userMap = {};
      var matrix = {};

      // generate key map
      $scope.opportunities.forEach(function (opportunity, i) { oppColumnMap[opportunity._id] = i; });
      $scope.users.forEach(function (user, i) {
        if (user.name) {
          userMap[user._id] = user.name;
        } else {
          // default to email if user has not filled in name
          userMap[user._id] = user.email;
        }
      });

      $scope.matches.forEach(function (matchData) {
        var match = matchData;
        var column = oppColumnMap[match.opportunity];
        var row = match.user;
        match.value = (match.adminOverride > 0) ? match.adminOverride : match.userInterest;
        if (!matrix.hasOwnProperty(row)) { matrix[row] = []; }
        matrix[row][column] = match;
      });

      $scope.matrix = matrix;
      $scope.userMap = userMap;
    });
  });

  $scope.edit = function(match) {
    // if user leaves blank, clear adminOverride and reverse to userInterest
    if (match.value === undefined) {
      console.log('undefined!');
      match.adminOverride = 0;
      match.value = match.userInterest;
    } else {
      // set adminOverride to be the new value
      match.adminOverride = match.value;
    }

    // save update to server
    Match.update(match);

  };

  $scope.isOverridden = function (match) {
    // no adminOverride
    if (match.adminOverride === 0) {
      if (match.userInterest === 4) {
        return 'gridbox-highlight-4';
      } else if (match.userInterest === 3) {
        return 'gridbox-highlight-3';
      } else if (match.userInterest === 2) {
        return 'gridbox-highlight-2';
      } else if (match.userInterest === 1) {
        return 'gridbox-highlight-1';
      } else if (match.userInterest === 0) {
        return 'gridbox-highlight-0';
      }
    // with adminOverride
    } else {
      if (match.adminOverride > match.userInterest) {
        return 'gridbox-highlight-green';
      } else if (match.adminOverride === match.userInterest) {
        return 'gridbox-highlight-grey';
      } else if (match.adminOverride < match.userInterest) {
        return 'gridbox-highlight-red';
      }
    }
  };

  $scope.downloadData = function () {
    $http.get(SERVER_URL + '/api/matches/download')
    .success(function () {
      if (arguments[1] === 200) {
        $scope.dataToDownload = arguments[0];
        download(arguments[0], 'exported', 'text/csv');
      }
    });
  };

  $scope.downloadSchedule = function () {
    Scheduler.schedule(
    $scope.rounds,
    $scope.maxInterviews,
    $scope.minInteviews,
    function(output) {
      $scope.opportunities = output.opportunities;
      $scope.schedule = output.schedule;
      $scope.candidates = output.candidates;
      // console.log(output);

      // reformat opportunities so lookup by id
      var oppsById = {};
      $scope.opportunities.forEach(function (opp) {
        oppsById[opp._id] = opp;
      });
      $scope.opportunities = oppsById;

      readyData();
    });

  };

  function download(strData, strFileName, strMimeType) {
    var D = document,
        a = D.createElement("a");
        strMimeType= strMimeType || "application/octet-stream";


    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([strData], {type: strMimeType}), strFileName);
    } /* end if(navigator.msSaveBlob) */


    if ('download' in a) { //html5 A[download]
        a.href = "data:" + strMimeType + "," + encodeURIComponent(strData);
        a.setAttribute("download", strFileName);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            a.click();
            D.body.removeChild(a);
        }, 66);
        return true;
    } /* end if('download' in a) */


    //do iframe dataURL download (old ch+FF):
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" +  strMimeType   + "," + encodeURIComponent(strData);

    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
  } /* end download() */

  /* SCHEDULER */

  $scope.slots = [
    {time: '09:00am'},
    {time: '09:15am'},
    {time: '09:30am'},
    {time: '09:45am'},
    {time: '10:00am'},
    {time: '10:15am'},
    {time: '10:30am'},
    {time: '10:45am'},
    {time: '11:00am'},
    {time: '11:15am'},
    {time: '11:30am'}
  ];

  var output;
  var readyData = function () {
    output = '';

    // create header row (user names, degrading to emails)
    var userOrder = []; // array of userIds
    $scope.candidates.forEach(function (user) {
      userOrder.push(user._id);
      var displayName = user.name || user.email;
      output += ',' + displayName;
      // console.log(user);
    });
    // add break column
    output += ',' + 'Break' + '\n';

    // iterate through opportunities
    for (var oppId in $scope.schedule) {
      var emptySchedule = new Array(userOrder.length + 1); // +1 for break
      output +=
        ($scope.opportunities[oppId].jobTitle).replace(/\,/, ' ') + '(' +
        ($scope.opportunities[oppId].company.name).replace(/\,/, ' ') + ')';
      for (var i = 0; i < $scope.schedule[oppId].length; i += 1) {
        var scheduleObj = $scope.schedule[oppId][i];
        if (scheduleObj === 'BREAK') {
          // set last column value to this index (i) + 1
          emptySchedule[emptySchedule.length] = i + 1;
        } else {
          var userId = scheduleObj.id;
          // find where userId is in userOrder array
          var idx = userOrder.indexOf(userId);
          // then replace that value in the emptySchedule array with (i) + 1
          emptySchedule[idx] = i + 1;
        }
      }
      // join emptySchedule array together with commas, plus new line
      emptySchedule = emptySchedule.join(',') + '\n';
      // replace 'undefined' with empty strings
      emptySchedule.replace(/undefined/g, '');
      output += emptySchedule;
    }
    // console.log(output);
    download(output, 'exported', 'text/csv');
  };

  $scope.rounds = 11;
  $scope.maxInterviews = 10;
  $scope.minInterviews = 6;


  // var schedulerOutput = Scheduler.schedule(
  //   $scope.rounds,
  //   $scope.maxInterviews,
  //   $scope.minInteviews,
  //   function(output) {
  //     $scope.opportunities = output.opportunities;
  //     $scope.schedule = output.schedule;
  //     $scope.candidates = output.candidates;
  //     // console.log(output);

  //     // reformat opportunities so lookup by id
  //     var oppsById = {};
  //     $scope.opportunities.forEach(function (opp) {
  //       oppsById[opp._id] = opp;
  //     });
  //     $scope.opportunities = oppsById;

  //     readyData();
  // });

  $scope.slots = 6;
  $scope.slotRowMap = {};
  $scope.oppColumnMap = {};
  $scope.userMap = {};

  $scope.schedule = [];

  var init = function () {
    $scope.slotRowMap = {
      0: '09:00',
      1: '09:15',
      2: '09:30',
      3: '09:45',
      4: '10:00',
      5: '10:15'
    };
  };
  init();

}]);
