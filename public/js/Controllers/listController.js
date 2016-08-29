/*
    Element List Area Ctrl
    */
    myApp.controller('ElementCtrl', ElementCtrl);

    function ElementCtrl($scope, BroadCastFactory){
        $scope.elements = {
            1 : '<img>',
            2 : '<article></article>',
            3 : '<textarea"></textarea>'
        }
        $scope.addElement = function(e,ele){
            console.log("From new function layout");
            $scope.event = e = 'elementSend';
            BroadCastFactory.prepForBroadcast(e,ele);
        };

        $scope.useCount = 3;
    }

    myApp.controller('ElementListCtrl', ElementListCtrl);

    function ElementListCtrl($scope, BroadCastFactory, ModalService){

        $scope.showImageDiv = {toggle:false};

        $scope.imageList = ["building1.jpg","construction1.jpg","shipyard1.jpg"];

        $scope.show = {message : false};

        var tags = $scope.dataItems = ["Image"];

        

        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson(model, true);
        }, true);

        $scope.dropElement = function(e,ele){
            console.log("Newer function test");
            $scope.event = e = 'elementDrop';
            BroadCastFactory.prepForBroadcast(e,ele);
            console.log(BroadCastFactory);
        };
    }

/*
    Content Area Ctrl for Drop Elements
    */
    myApp.controller('ContentAreaCtrl', ContentAreaCtrl);

    function ContentAreaCtrl($scope, $window, PageFactory, $routeParams,BroadCastFactory){

        $scope.createNewFromBlank = function(){
            $window.location.href = ('#/projects/new');
        }

        $scope.my = { message: false };
        $scope.toggleClass1 = function(){
            if($scope.pageObj ==null){
                $scope.createNewFromBlank();
            }else{
                console.log("toggle 1");
                $scope.pageObject.columns[0].items[0].cssClass = "defaultClass5";
                $scope.pageObject.columns[0].items[1].cssClass = "defaultClass6";        
            };

        }

        $scope.my = { message2: false };
        $scope.toggleClass2 = function(){
            if($scope.pageObj ==null){
                $scope.createNewFromBlank();
            }else{
                console.log("toggle 2");
                //cycle through classes array and bind new value to columns object
                $scope.pageObject.columns[0].items[0].cssClass = "defaultClass3";
                $scope.pageObject.columns[0].items[1].cssClass = "defaultClass4";
            }
        }

        $scope.my = { message3: false };
        $scope.toggleClass3 = function(){
             if($scope.pageObj ==null){
                $scope.createNewFromBlank();
            }else{
                console.log("toggle 3");
                //add a new "item" to the columns object
                $scope.pageObject.columns[0].items[0].cssClass = "defaultClass7";
                $scope.pageObject.columns[0].items[1].cssClass = "defaultClass8";
                $scope.pageObject.columns[0].items[2] = {"cssClass":"defaultClass9"};
                //toggle 3rd div
                $scope.addDiv3 = {boolean:true};
            }
                   
        }

        $scope.$on('cssToggle1', function(event,data){
            var newClass = $scope.newClass = data;
            console.log($scope.newClass);
        })

        $scope.$on('cssToggle2', function(event,data){
            var newClass2 = $scope.newClass2 = data;
            console.log($scope.newClass2);
        })

        $scope.$on('cssToggle3', function(event,data){
            console.log("toggle 3 event handle");
        })

        $scope.updateHtml = function(){
            console.log("update");
            //json component
            console.log($scope.pageObject);
            var jsonPage = $scope.pageObject;
            $scope.pageClassToBeUploaded = $scope.pageObject;
            $scope.pageWithNewClasses = function(){
                PageFactory.update({id:$scope.pageObjectAll._id}, $scope.pageClassToBeUploaded);
            };

            $scope.pageWithNewClasses();

        };  
        /*Click function displays text editor*/
        $scope.textEditorShow = function(){
            console.log("Text Area Click");
            $scope.textEditor = {boolean: true};
        }

        $scope.$on('eventSend', function(event,data){  
            var num = $scope.pageToLoad = data;

            $scope.pageObj = PageFactory.get({id : num},
                function(page){
                    $scope.pageObjectAll = page;
                    $scope.pageObject = page.body;                            
                })
        })

        $scope.$on('elementSend', function(event, data){
            $scope.textEditor = {boolean: true};
        })
        
        $scope.savePtext = function(){
            alert("Are you sure?")
            var currentId = $scope.pageToLoad;
            //new empty text variable 
            var newText = $scope.nextTextBound = "";
            //Bind new text to variable
            var textToBeBound = $scope.htmlVariable;
            //Bind back to JSON object's text value
            $scope.pageObject.columns[0].items[1].text = textToBeBound;
            $scope.testString = JSON.stringify($scope.pageObject);
            $scope.pageToBeUploaded = {page_number:$scope.pageLoad.page_number,title:$scope.pageLoad.title, jsonObj:$scope.testString};
            //Update data base 
            $scope.pText = PageFactory.update({id:$scope.pageToLoad}, $scope.pageToBeUploaded);
            //pageObject is just the json value
            
        }

        $scope.closeModal = function(){
            $scope.textEditor = {boolean: false};  
        }

        $scope.dropFunc = function(e){
            //console.log(e);
            // $scope.event = ev = 'imageDrop';
            // BroadCastFactory.prepForBroadcast(ev);
            $scope.dropEventWatch = {boolean: true};
            console.log($scope.dropEventWatch);
            if($scope.pageObj == null){
                $window.location.href = ('#/projects/new');
            }else{
                var id = e.target.attributes.idno.value;
                var newDivType = e.toElement.attributes.elementType.value;
                var pageNo = $scope.pageObj.body.columns[0].items[id];
                pageNo.type = newDivType;
                if(pageNo.type == 'Image'){
                    $scope.addImage = {boolean:true};
                }
                $scope.imgX = e.pageX - 260;
                $scope.imgY = e.pageY - 130;

                $scope.srcVar = "";
            //onDrop - showImage
            
            //boolean triggers directive to add image?
            //upload file
            //bind filename to src in jsonObj
            //bind width & height?
            }

            $scope.changeFunc = function(e){
                console.log("changeFunc");
            }

            $scope.onFilesSelected = function(files) {
             console.log("files - " + files);
            };
        }

    }


//     /*Generate initial model in JSON format*/
//     // for (var i = 1; i <= 3; ++i) {
//     //     $scope.models.lists.A.push({label: "Image" + i});
//     //     $scope.models.lists.B.push({label: "Item B" + i});
//     // }

//     // // Model to JSON for demo purpose
//     // $scope.$watch('pageArray', function(pageArray) {
//     //     $scope.modelAsJson = angular.toJson(pageArray, true);
//     //     console.log($scope.modelAsJson);
//     //     console.log($scope.pageArray);
//     // }, true);

// }]);

// myApp.controller('MyCtrl', MyCtrl);

// function MyCtrl($scope, $window) {
//     $scope.name = 'Superhero';
//     MyCtrl.prototype.$scope = $scope;
// }

// MyCtrl.prototype.setFile = function(element) {
//     var $scope = this.$scope;
//     $scope.$apply(function() {
//         $scope.theFile = element.files[0];
//     });
// };

