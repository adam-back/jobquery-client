app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin.candidates', {
      abstract: true,
      url: '/candidates',
      template: '<ui-view/>'
    })
      .state('admin.candidates.all', {
        url: '',
        templateUrl: '/js/admin/subroutes/candidates/templates/candidates.tpl.html',
        controller: 'AdminCandidatesCtrl'
      })
      .state('admin.candidates.new', {
        url: '/new',
        templateUrl: '/js/admin/subroutes/candidates/templates/new.tpl.html',
        controller: 'AdminCandidatesNewCtrl'
      })
      .state('admin.candidates.detail', {
        url: '/:_id',
        templateUrl: '/js/admin/subroutes/candidates/templates/detail.tpl.html',
        controller: 'AdminCandidatesDetailCtrl'
      });

}]);
