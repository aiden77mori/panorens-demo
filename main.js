var panorama1, panorama2, panorama3, panorama4, panorama5, viewer, container;

container = document.querySelector( '#container' );
// panel = document.querySelector('#panel');

$(document).ready(function(){
    // DeviceMotionEvent.requestPermission().then(response => {
    //     if (response == 'granted') {
    //     // Add a listener to get smartphone acceleration 
    //         // in the XYZ axes (units in m/s^2)
    //         window.addEventListener('devicemotion', (event) => {
    //             console.log(event);
    //         });
    //    // Add a listener to get smartphone orientation 
    //        // in the alpha-beta-gamma axes (units in degrees)
    //         window.addEventListener('deviceorientation',(event) => {
    //             console.log(event);
    //         });
    //     }
    // });
    
});

if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
    // (optional) Do something before API request prompt.
    DeviceMotionEvent.requestPermission()
        .then( response => {
        // (optional) Do something after API prompt dismissed.
        if ( response == "granted" ) {
            window.addEventListener( "devicemotion", (e) => {
                // do something for 'e' here.
            });
            window.addEventListener('deviceorientation',(event) => {
                console.log(event);
            });
        }
    })
        .catch( console.error )
} else {
    if (window.DeviceMotionEvent) {
        window.addEventListener( "devicemotion", (e) => {
            // do something for 'e' here.
        })
    } else {
        console.log( "DeviceMotionEvent is not defined" );
    }
    
}

function onTap(){
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {
                    // do something for 'e' here.
                });
                window.addEventListener('deviceorientation',(event) => {
                    console.log(event);
                });
            }
        })
            .catch( console.error )
    } else {
        

        if (window.DeviceMotionEvent) {
            window.addEventListener( "devicemotion", (e) => {
                // do something for 'e' here.
            })
        } else {
            console.log( "DeviceMotionEvent is not defined" );
        }
        
    }
}

// Focus tweening parameter
parameters = {
    duration: 1000,
    curve: 'Exponential',
    easing: 'Out',
    iterative: false
  };
infospots = {
    pano1:[{x:5000.00,y:-3292,z:-1629},{x:5000.00,y:-2878,z:-512},{x:5000.00,y:-3006,z:792},{x:5000.00,y:-2248,z:-1883},{x:3814,y:-1987,z:5000}],
    pano2:[{x:5000, y:-1881, z:-3309},{x:5000, y:-1934, z:176},{x:4032.27, y:-3613, z:5000}],
    pano3:[],
    pano4:[]
}


//panorama1
panorama1 = new PANOLENS.ImagePanorama( 'asset/field.jpg' );

//panorama2
panorama2 = new PANOLENS.ImagePanorama( 'asset/field2.jpg' );

//panorama3
panorama3 = new PANOLENS.ImagePanorama( 'asset/field3.jpg' );

//panorama4
panorama4 = new PANOLENS.ImagePanorama( 'asset/field4.jpg' );

//panorama5
// panorama5 = new PANOLENS.ImagePanorama( 'asset/field5.jpg' );




viewer = new PANOLENS.Viewer( {output: 'console', container: container } );

viewer.add( panorama1, panorama2, panorama3, panorama4);
addInfoSpot(1,infospots.pano1);
addInfoSpot(2,infospots.pano2);

//linking
panorama1.link( panorama2, new THREE.Vector3(5000.00, -2154.40, 3922.95 ));
panorama1.link( panorama3, new THREE.Vector3(-610.86, -2797.19, 5000.00));
panorama1.link( panorama4, new THREE.Vector3(1028.27, -1694.76, 5000.00));

panorama2.link( panorama1, new THREE.Vector3(-5000.00, -1090.89, 2744.19));
panorama2.link( panorama3, new THREE.Vector3(-1016.82, -1721.03, 5000.00));
panorama2.link( panorama4, new THREE.Vector3(1635.62, -2409.00, 5000.00));

panorama3.link( panorama1, new THREE.Vector3(1288.05, -1956.80, -5000.00 ));
panorama3.link( panorama2, new THREE.Vector3(5000.00, -1729.64, 610.19));
panorama3.link( panorama4, new THREE.Vector3(4368.01, -5000.00, 3671.53));

panorama4.link( panorama1, new THREE.Vector3(-181.01, -1753.86, -5000.00));
panorama4.link( panorama2, new THREE.Vector3(5000.00, -1966.73, 87.61));
panorama4.link( panorama3, new THREE.Vector3(1-1663.74, -5000.00, -4065.05));




// var renderer, camera, scene, box;

// renderer = new THREE.WebGLRenderer();
// renderer.setClearColor(0xffffff);
// renderer.setSize(panel.clientWidth, panel.clientHeight);
// camera = new THREE.PerspectiveCamera(45, panel.clientWidth / panel.clientHeight, 1, 2000);
// scene = new THREE.Scene();
// infospot.element.appendChild( renderer.domElement );

// box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
// box.position.z = -20;
// scene.add( box );

// viewer.addUpdateCallback(function(){
//   renderer.render(scene, camera);
//   box.rotation.y += 0.03;
// });


function addInfoSpot(panoId, panoInfo){
    
    for(let i = 0; i < panoInfo.length; i ++){
        var infospot = new PANOLENS.Infospot( 350, PANOLENS.DataImage.Info );
        infospot.position.set( panoInfo[i].x, panoInfo[i].y, panoInfo[i].z);
        
        
        var panel_id = 'panel'+panoId+'_'+(i+1);
        var panel_html = '<div id='+panel_id+' class="panel" ><model-viewer  src="asset/car4.gltf" alt="A 3D model of an astronaut" ar ar-modes="webxr scene-viewer quick-look" environment-image="neutral" auto-rotate camera-controls></model-viewer><h4  class="product-name">Good Car</h4><div>Nice Fast Econoimc Car<a class="product-link" href="https://www.google.com/search?q=Modway+Prim+Mid-Back+Task+Chair&source=univ&tbm=shop" target="_blank">...more</a></div><div class="proudct-price">US$90.99</div><div class="product-attribute">Rating</div><div> <i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star</i><i class="material-icons">star_half</i><i class="material-icons">star_border</i></div></div>';

        // $('#container').after(panel_html);
        // var panel = document.querySelector('#'+panel_id);
        // panel = $('#panel')[0];
        // infospot.addHoverElement( panel, 200 );

        $("#product_detail").append(panel_html);
        infospot.addEventListener( 'click', function(){
            this.focus( parameters.duration, TWEEN.Easing[ parameters.curve ][ parameters.easing ] );
            onFocus(panel_id)},false );
        switch(panoId){
            case 1:
                panorama1.add( infospot );
                break;
            case 2:
                panorama2.add( infospot );
                break;
            case 3:
                panorama3.add( infospot );
                break;
            case 4:
                panorama4.add( infospot );
                break;
            default:
                panorama1.add( infospot );
                break;
        }

        
        // var renderer, camera, scene, box;
        // renderer = new THREE.WebGLRenderer();
        // renderer.setClearColor(0xffffff);
        // renderer.setSize(panel.clientWidth, panel.clientHeight);
        // camera = new THREE.PerspectiveCamera(45, panel.clientWidth / panel.clientHeight, 1, 2000);
        // scene = new THREE.Scene();
        
        // infospot.element.appendChild( renderer.domElement );
        
        // box = new THREE.Mesh(new THREE.BoxGeometry(10, 10, 10), new THREE.MeshNormalMaterial());
        // box.position.z = -20;
        // scene.add( box );
        
        // viewer.addUpdateCallback(function(){
        //     renderer.render(scene, camera);
        //     var panorama_infospot = viewer.panorama.children;
        //     for(var j = 0; j < panorama_infospot.length; j ++){
        //         if(panorama_infospot[j].type == 'infospot' && panorama_infospot[j].toPanorama ==null){
        //             panorama_infospot[j].rotation.y += 0.01;
        //         }
        //     }
        // });
        
       
    }
    return;
}
function animate(){
    
}
function onFocus (param) {
    
    $('.panel').hide();
    $('#'+param).show();
   $('#product_detail').modal();
}

$(document).ready(function(){
    $(".header").click(function(){
        $(this).children(".children").toggle();
    });
});