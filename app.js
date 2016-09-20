angular.module('app',['ui.bootstrap','ui.router']);
angular.module('app').controller('EgitmenController', ['$scope','egitimler',function($scope,egitimler){
	$scope.model =[];
	$scope.searchText = {};
	$scope.searchText.egitmen = "osman";
	var egitims= egitimler;
	egitimler.getAll();
	$scope.model = egitimler.egitimler;

	/*var z = 0;
	for (var i=0;i<20;i++){
		if(i%3 == 0 && i!= 0)
		{
			z++
		}
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'};
		var options2 = {hour: '2-digit', minute: '2-digit'};
		

		$scope.model[i]={_id:i,'date':(new Date(2016,8,z,i*3+9,0,0,0)).toLocaleDateString("tr-TR",options),'finDate':(new Date(2016,8,z,i*3+9+3,0,0,0)).toLocaleDateString("tr-TR",options2),'durum':'Gelecek',lokasyon:'kayıkhane','egitmen':'osman'};
		console.log(new Date());
		var temp = $scope.model[i].finDate.substr(-5);
		$scope.model[i].finDateT = $scope.model[i].finDate.substr(-5);
		//$scope.model[i].finDateT = ("0"+temp.getHours()).slice(-2);
		if($scope.model[i].date < new Date().toLocaleDateString("tr-TR",options))		{

			$scope.model[i].durum = 'tamamlandı';
		}

	}*/
	//$scope.searchText.$ = ""; 
	//$scope.searchText.egitmen = 'osman';

	    $scope.$watch('model', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);

    }, true);
}]);

angular.module('app').factory('egitimler',['$http',function($http){
	var o = {
		egitimler: []
	};
	o.getAll = function() {
					

	var z = 0;
	for (var i=0;i<20;i++){
		if(i%3 == 0 && i!= 0)
		{
			z++;
		}
		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'};
		var options2 = {hour: '2-digit', minute: '2-digit'};
		
		console.log(z);
		o.egitimler[i]={_id:i,'date':(new Date(2016,8,z+6,i*3+9,0,0,0,0)).toLocaleDateString("tr-TR",options),'milis':new Date(2016,8,z+6,i*3+9,0,0,0),'finDate':(new Date(2016,8,z,i*3+9+3,0,0,0)).toLocaleDateString("tr-TR",options2),'durum':'Gelecek',lokasyon:'kayıkhane','egitmen':'osman'};
		console.log(new Date());
		console.log("today is "+(new Date()).getTime())
		var temp = o.egitimler[i].finDate.substr(-5);
		o.egitimler[i].finDateT = o.egitimler[i].finDate.substr(-5);
		//$scope.model[i].finDateT = ("0"+temp.getHours()).slice(-2);
		console.log(o.egitimler[i].milis.getTime());
		if(o.egitimler[i].milis.getTime() < (new Date()).getTime())		{

			o.egitimler[i].durum = 'tamamlandı';
		}

	}




	};

	o.get = function(id){

		var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' , hour: '2-digit', minute: '2-digit'};
		var options2 = {hour: '2-digit', minute: '2-digit'};
		

		o.egitimler[0]={_id:id,'date':(new Date(2016,8,5,3+9,0,0,0)).toLocaleDateString("tr-TR",options),'finDate':(new Date(2016,8,5,3+9+3,0,0,0)).toLocaleDateString("tr-TR",options2),'durum':'Gelecek',lokasyon:'kayıkhane','egitmen':'osman','katilimcilar':[{name:'osman','konular':['izbarço']},{name:'kezo'},{name:'mahmut'}]};
		console.log(new Date());
		var temp = o.egitimler[0].finDate.substr(-5);
		o.egitimler[0].finDateT = o.egitimler[0].finDate.substr(-5);
		o.egitimler[0].konular= ["izbarço","camadan","tramola"];



		return o.egitimler[0];
	};

return o;



}]);

angular.module('app').controller('EgitimControllerDetay',['$scope','egitimler','egitim',function($scope,egitimler,egitim){
	$scope.egitim = egitim;
	console.log($scope.egitim._id);
	$scope.egitim.tarih=egitim.date + egitim.finDateT;
	$scope.konular = egitim.konular;

	    $scope.$watch('konular', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);

    }, true);
	

}]);

angular.module('app').config(['$stateProvider',
'$urlRouterProvider',
function($stateProvider,$urlRouterProvider){
	$stateProvider
		.state('home',{
			url: '/home',
			templateUrl: './egitmenTakip.html',
			controller: 'EgitmenController',

		})
		.state('egitimler',{
			url: '/egitimler/{id}',
			templateUrl: './egitim.html',
			controller: 'EgitimControllerDetay',
			resolve: {
				egitim: ['$stateParams','egitimler',function($stateParams,egitimler){
					return  egitimler.get($stateParams.id);
				}]
			}
		});

		$urlRouterProvider.otherwise('home');
}]);


