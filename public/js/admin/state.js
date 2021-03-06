//Admin State
app.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('admin', {
      url: '/admin',
      resolve: {
        redirect: ['$location', 'localStorageService', '$state', function ($location, $state, localStorageService) {
          var isAdmin = localStorageService.get('isAdmin');
          if(isAdmin === 'false'){
            $location.path('/login');
          } else {
            if($location.path() === '/admin') {
              $location.path('/admin/opportunities');
            }
          }
        }]
      },
      views: {
        'sidebar': {
          templateUrl: '/js/admin/templates/sidebar.tpl.html',
          controller: 'AdminSidebarCtrl'
        },
        'main': {
          templateUrl: '/js/admin/templates/admin.tpl.html',
          controller: 'AdminCtrl'
        }
      }
    });

}]);
