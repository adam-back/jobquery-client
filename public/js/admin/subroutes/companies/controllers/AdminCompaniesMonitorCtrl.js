app.controller('AdminCompaniesMonitorCtrl', ['$scope', '$http', 'SERVER_URL', function ($scope, $http, SERVER_URL) {

  $http({
    method: 'POST',
    url: SERVER_URL + '/api/companies/indeed',
    data: {keyword: 'Google'},
    cache: true
  }).then(function(res) {
    console.log(res.data, '  data');
    $scope.companies = res.data;
    // $scope.test = res.data;
  });

}]);