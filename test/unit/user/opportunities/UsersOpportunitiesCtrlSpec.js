describe('UsersOpportunitiesCtrl', function(){

  var $httpBackend, SERVER_URL;

  beforeEach(module('jobQuery'));

  beforeEach(inject(function($injector){

    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    var Opportunity = $injector.get('Opportunity');
    $httpBackend = $injector.get('$httpBackend');
    SERVER_URL = $injector.get('SERVER_URL');

    createController = function(){
      return $controller('UsersOpportunitiesCtrl', {
        $scope: $rootScope.$new(),
        Opportunity: Opportunity
      });
    };

  }));

  it('should exist', function(){
    var controller = createController();
    expect(typeof controller).toBe('object');
  });

  it('should make a GET request for all opportunities', function(){
    $httpBackend.expectGET(SERVER_URL + '/api/opportunities').respond([{}, {}]);
    var controller = createController();
    $httpBackend.flush();
  });

});