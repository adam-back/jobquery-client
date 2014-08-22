app.controller('AdminCompaniesNewCtrl', ['$scope', '$rootScope', 'Company', '$state', function ($scope, $rootScope, Company, $state) {

  var newCompany = {};
  newCompany.name = '';
  newCompany.tagline = '';
  newCompany.description = '';
  newCompany.city = '';
  newCompany.address = '';
  newCompany.state = '';
  newCompany.country = '';
  newCompany.media = [];
  newCompany.links = [];
  $scope.newCompany = newCompany;

  var removeEmptyFields = function () {
    newCompany.media = newCompany.media.filter(function (item) {
      return item.caption && item.url;
    });

    newCompany.links = newCompany.links.filter(function (item) {
      return item.title && item.url;
    });
  };

  $scope.create = function () {
    removeEmptyFields();
    newCompany.uid = $rootScope.uid;
    newCompany.targetDisplayName = newCompany.name;
    Company.create(newCompany).then(function (company) {
      $state.go('admin.companies.detail', {_id: company._id});
    });
  };

  $scope.addMedia = function () {
    newCompany.media.push({text: ''});
  };

  $scope.removeMedia = function (index) {
    newCompany.media.splice(index, 1);
  };

  $scope.addLink = function () {
    newCompany.links.push({text: ''});
  };

  $scope.removeLink = function (index) {
    newCompany.links.splice(index, 1);
  };

}]);
