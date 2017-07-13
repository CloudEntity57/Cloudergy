var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
var selector='';
var beds_search='';
var baths_search='0';
var priceFrom_search='0';
var priceTo_search='1000000000';
var min_square_feet_search='0';
var year_built_after_search='1';
var min_lot_size_search='';
var property_type_search='';
var pool_on_property_search='';
var is_gated_community_search='';
var basement_search='';
var min_garage_spaces_search='';
var zip_search='';
var Fireplace_search='';
var mls_number_search='';
var neighborhood_name='';
var listing_agent_id=153489;
// southwest=39.89696267426371,-75.32793045043944&northeast=39.99908446483972,-74.99834060668945
// 39.9480781,-75.1631477
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
if(hashes.length>1){
    listing_agent_id=getParameterByName('listing_agent_id');
    if(listing_agent_id){
     listing_agent_id=listing_agent_id;
    }else
    {
        listing_agent_id='';

    }

}



var beds='';
var baths='0';
var priceFrom='';
var priceTo='';
var min_square_feet='';
var year_built_after='';
var min_lot_size='';
var property_type='';
var pool_on_property='';
var is_gated_community='';
var basement='';
var min_garage_spaces='';
var zip='';
var Fireplace='';
var neighborhood_url='';
var view='';
var listing_agent_id_url='153489';
var map_zoom=13;
var map_center=[39.9480781,-75.1631477];
var southWest='';
var northEast='';
if(hashes.length>1){
// map zoom start
var map_zoom_temp=getParameterByName('zoom');
if(map_zoom_temp!=null) map_zoom=map_zoom_temp;
// map zoom End
// map center point start
map_center=getParameterByName('center');
var southwest=getParameterByName('southwest');
var northeast=getParameterByName('northeast');

if(map_center!=null){
map_center=map_center.split(',');
map_center=[map_center[0],map_center[1]];
}else if(southwest!=null && northeast!=null){
    if (southwest.indexOf("%2C") >= 0){
    southwest=southwest.toString().split('%2C');
    northeast=northeast.toString().split('%2C');
    centerlat=(Number(southwest[0])+Number(northeast[0]))/2;
    centerlng=(Number(southwest[1])+Number(northeast[1]))/2;
    }else if (southwest.indexOf(",") >= 0){
    southwest=southwest.toString().split(',');
    northeast=northeast.toString().split(',');
    centerlat=(Number(southwest[0])+Number(northeast[0]))/2;
    centerlng=(Number(southwest[1])+Number(northeast[1]))/2;
    }else
    {
        centerlat=39.9480781;
        centerlng=-75.1631477;
    }


    map_center=[centerlat,centerlng];
}
else
{
    map_center=[39.9480781,-75.1631477];
}
// map center point end
// check if mccann only start
var listing_agent_id_url_temp=getParameterByName('listing_agent_id');
if(listing_agent_id_url_temp!=null) listing_agent_id_url=listing_agent_id_url_temp;
// check if mccann only end
// get the beds search start
beds=getParameterByName('min_bedrooms');

if(beds!='' && beds!=null){
beds_search=beds.split(',');
}
// get the beds search end
// get the baths search start
var baths_temp=getParameterByName('min_bathrooms');
if(baths_temp!=null) baths=baths_temp;

baths_search=baths.split(',');
// get the baths search end
// get the priceFrom search start
var priceFrom_temp=getParameterByName('min_list_price');
if(priceFrom_temp!=null) priceFrom=priceFrom_temp;

if(priceFrom=='') priceFrom='1';
priceFrom_search=priceFrom;
// get the priceFrom search end
// get the priceTo search start
var priceTo_temp=getParameterByName('max_list_price');
if(priceTo_temp!=null) priceTo=priceTo_temp;
if(priceTo=='') priceTo='9999999';
priceTo_search=priceTo;
// get the priceTo search end
// get the square_feet search start
var min_square_feet_temp=getParameterByName('min_square_feet');
if(min_square_feet_temp!=null) min_square_feet=min_square_feet_temp;
if(min_square_feet=='') min_square_feet='1';
min_square_feet=min_square_feet_search;
// get the square_feet search end
// get the square_feet search start
var year_built_after_temp=getParameterByName('year');
if(year_built_after_temp!=null) year_built_after=year_built_after_temp;
if(year_built_after=='') year_built_after='1';
year_built_after=year_built_after_search;
// get the square_feet search end

// get the min_lot_size search start
var min_lot_size_temp=getParameterByName('lot_size');
if(min_lot_size_temp!=null) min_lot_size=min_lot_size_temp;

if(min_lot_size=='') min_lot_size='1';
min_lot_size=min_lot_size_search;
// get the min_lot_size search end
var neighborhood_url_temp=getParameterByName('neighborhood');
if(neighborhood_url_temp!=null) neighborhood_url=neighborhood_url_temp;

neighborhood_name=neighborhood_url;

view=getParameterByName('view');



}
var url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
L.mapbox.accessToken = 'pk.eyJ1IjoiYWhtZWRiYWRhaCIsImEiOiJjaWtlN25leXQwMDJjdmtrcXpidnNjanVqIn0.3bjgv04qY-LWuNPLk50Bgw';
var map ;

function fillmap(neighborhood){

   selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
   console.log(listing_agent_id);
    console.log(selector);
    window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
map = L.mapbox.map('map', 'mapbox.streets',{
    maxZoom: 17,
    minZoom: 12}
    )
    .setView(map_center, map_zoom);
    var bounds=map.getBounds();
    southWest=bounds._southWest;
    southWest=[southWest.lat,southWest.lng];
    northEast=bounds._northEast;
    northEast=[northEast.lat,northEast.lng];
    url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
    window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
var markers = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 40,
    zoomToBoundsOnClick: false,
    spiderfyOnMaxZoom: false,
    iconCreateFunction: function(cluster) {
        var children = cluster.getAllChildMarkers();
        cluster.bindPopup('<div class="cluster-pop-up-container">Looding...</div>');
        cluster.on('click',function(allchild){
            var result='';
            var childrennew = allchild.target.getAllChildMarkers();
            jQuery(childrennew).each(function() {
                var b=this.options.icon.options;
                var result_node='';

                if(b.eventday!=null)
                {
                    result_node='<a class="infowindow" zip="'+b.zip+'" url="'+b.listing_url+'" href="#" img="'+b.img+'" mls_number="'+b.mls_number+'"><div class="img-container"><img src="'+b.img+'"></div><div class="infowindow-content"><h1>'+b.title+'</h1><h2>'+b.neighborhood+' - <span>'+b.price+'</span></h2><h2>Beds/Baths: '+b.bedroom+'/'+b.bathroom+'</h2><div class="open-timed"><div class="opened-datee">'+b.eventday+'</div> <div class="opened-timee">'+b.eventtime+'</div></div></div></a>';
                }else
                {
                    result_node='<a class="infowindow" zip="'+b.zip+'" url="'+b.listing_url+'" href="#" img="'+b.img+'" mls_number="'+b.mls_number+'"><div class="img-container"><img src="'+b.img+'"></div><div class="infowindow-content"><h1>'+b.title+'</h1><h2>'+b.neighborhood+' - <span>'+b.price+'</span></h2><h2>Beds: '+b.bedroom+'</h2><h2>Baths: '+b.bathroom+'</h2></div></a>';
                }
                result=result+result_node;
            });
            jQuery('.cluster-pop-up-container').html(result);

        });

        return L.divIcon({
                    className: "single-map-marker",
                    html: '<div class="single-map-point">'+children.length+'</div>',
                    iconSize: [43, 56],
                });
    }


});
var markers_top = new L.MarkerClusterGroup();

if(neighborhood==null){
    var count_mccann=jQuery('mappoint'+selector).filter(function(){
        if(listing_agent_id=='') {
            return true;}
        else
        {
            var results_lai=false
            if(jQuery(this).attr('lai')==listing_agent_id) results_lai=true;
            if(jQuery(this).attr('lai2')==listing_agent_id) results_lai=true;
            return results_lai;
        }

    }).length;
    console.log(count_mccann);
    jQuery('mappoint'+selector).filter(function() {
        if(jQuery.isArray(beds_search) && beds_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('bed'),beds_search) >= 0);
        }else{
            return true;
        }
    }).filter(function(){
        if(listing_agent_id=='') {
            return true;}
        else
        {
            var results_lai=false
            if(jQuery(this).attr('lai')==listing_agent_id) results_lai=true;
            if(jQuery(this).attr('lai2')==listing_agent_id) results_lai=true;
            return results_lai;
        }

    }).filter(function(){
        return jQuery(this).attr('my')>=year_built_after_search;
    }).filter(function(){
        if(Fireplace_search)
        {
            return jQuery(this).attr('f')>=Fireplace_search;
        }else
        {
            return true;
        }
    }).filter(function(){
        return jQuery(this).attr('bth')>=baths_search;
    }).filter(function(){
        return jQuery(this).attr('ls')>=min_lot_size_search;
    }).filter(function(){

        var listing_sqf=parseInt(jQuery(this).attr('sf'));
        search_value=parseInt(min_square_feet_search);
        return listing_sqf>=search_value;
    }).filter(function(){
        return jQuery(this).attr('gs')>=min_garage_spaces_search;
    }).filter(function(){
        if(zip_search!='')
        {

         if(!jQuery.isArray(zip_search)){
                zip_search=zip_search.split(',');
            }
        if(jQuery.isArray(zip_search) && zip_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('zip'),zip_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        if(mls_number_search!='')
        {

         if(!jQuery.isArray(mls_number_search)){
                mls_number_search=mls_number_search.split(',');
            }
        if(jQuery.isArray(mls_number_search) && mls_number_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('mls'),mls_number_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        var from = Number(priceFrom_search.replace(/[^0-9\.]+/g,""));
        var to =Number(priceTo_search.replace(/[^0-9\.]+/g,""));
        var price=Number(jQuery(this).attr('fp').replace(/[^0-9\.]+/g,""));
        from=parseInt(from);

        to=parseInt(to);

        price=parseInt(price);

        return (price>=from && to>=price);
    }).filter(function() {
        if(jQuery.isArray(property_type_search) && property_type_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('pt'),property_type_search) >= 0);
        }else{
            return true;
        }
    }).each(function(){
            var lat=jQuery(this).attr('lat');
            var lng=jQuery(this).attr('lng');
            var zip=jQuery(this).attr('zip');
        if(lat!='' && lng!=''){
        var marker = L.marker(new L.LatLng(lat, lng));
        var a=jQuery(this);
        var o=a.find('op');

        var new_data={};
        var bindPopup_result='';

        if(o.length)
        {
            openhouseTime = '';
            for(x = 0; x < o.length; x++) {
                house = $(o[x]);
                openhouseTime += '<div class="open-timed"><div class="opened-datee">'+house.attr('ed')+'</div> <div class="opened-timee">'+house.attr('ts')+'</div></div>';
            }
            new_data={
                className: "single-map-marker",
                html: '<div class="single-map-point">1</div>',
                iconSize: [43, 56],
                listing_url: listing_url_new,
                img: a.attr('bi'),
                title: a.attr('ttl'),
                neighborhood: a.attr('n'),
                price: a.attr('fp'),
                bedroom: a.attr('bed'),
                bathroom: a.attr('bth'),
                mls_number: a.attr('mls'),
                zip: a.attr('zip'),
                eventday: o.attr('ed'),
                eventtime: o.attr('ts')
            };
            bindPopup_result='<a class="infowindow" url="'+a.attr('url')+'" zip="'+a.attr('zip')+'" href="#" img="'+a.attr('bi')+'" mls_number="'+a.attr('mls')+'"><div class="img-container"><img src="'+a.attr('img')+'"/></div><div class="infowindow-content"><h1>'+a.attr('ttl')+'</h1><h2>'+a.attr('n')+' - <span>'+a.attr('fp')+'</span></h2><h2>Beds/Baths: '+a.attr('bed')+'/'+a.attr('bth')+'</h2>'+openhouseTime+'</div></a>';
        }else
        {
            new_data={
                className: "single-map-marker",
                html: '<div class="single-map-point">1</div>',
                iconSize: [43, 56],
                listing_url: listing_url_new,
                img: a.attr('bi'),
                title: a.attr('ttl'),
                neighborhood: a.attr('n'),
                price: a.attr('fp'),
                bedroom: a.attr('bed'),
                bathroom: a.attr('bth'),
                mls_number: a.attr('mls'),
                zip: a.attr('zip'),
            };
            bindPopup_result='<a class="infowindow" url="'+listing_url_new+'" zip="'+a.attr('zip')+'" href="#" img="'+a.attr('bi')+'" mls_number="'+a.attr('mls')+'"><div class="img-container"><img src="'+a.attr('img')+'"/></div><div class="infowindow-content"><h1>'+a.attr('ttl')+'</h1><h2>'+a.attr('n')+' - <span>'+a.attr('fp')+'</span></h2><h3>Beds: '+a.attr('bed')+'</h3><h3>Baths: '+a.attr('bth')+'</h3></div></a>';
        }

        var listing_url_new=a.attr('url');
        marker.setIcon(L.divIcon(new_data));

            marker.bindPopup(bindPopup_result);


            markers.addLayer(marker);
        }
        });

}else
{
    jQuery('mappoint[n="'+neighborhood+'"]'+selector).filter(function() {
        if(jQuery.isArray(beds_search) && beds_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('bed'),beds_search) >= 0);
        }else{
            return true;
        }
    }).filter(function(){
        if(listing_agent_id=='') {
            return true;}
        else
        {
            var results_lai=false
            if(jQuery(this).attr('lai')==listing_agent_id) results_lai=true;
            if(jQuery(this).attr('lai2')==listing_agent_id) results_lai=true;
            return results_lai;
        }

    }).filter(function(){
        if(Fireplace_search)
        {
            return jQuery(this).attr('f')>=Fireplace_search;
        }else
        {
            return true;
        }
    }).filter(function(){
        return jQuery(this).attr('bth')>=baths_search;
    }).filter(function(){
        return jQuery(this).attr('ls')>=min_lot_size_search;
    }).filter(function(){
        var listing_sqf=parseInt(jQuery(this).attr('sf'));
        search_value=parseInt(min_square_feet_search);
        return listing_sqf>=search_value;
    }).filter(function(){
        return jQuery(this).attr('my')>=year_built_after_search;
    }).filter(function(){
        return jQuery(this).attr('gs')>=min_garage_spaces_search;
    }).filter(function(){
       if(zip_search)
        {
            if(!jQuery.isArray(zip_search)){
                zip_search=zip_search.split(',');
            }
        if(jQuery.isArray(zip_search) && zip_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('zip'),zip_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        if(mls_number_search!='')
        {

         if(!jQuery.isArray(mls_number_search)){
                mls_number_search=mls_number_search.split(',');
            }
        if(jQuery.isArray(mls_number_search) && mls_number_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('mls'),mls_number_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        var from = Number(priceFrom_search.replace(/[^0-9\.]+/g,""));
        var to =Number(priceTo_search.replace(/[^0-9\.]+/g,""));
        var price=Number(jQuery(this).attr('fp').replace(/[^0-9\.]+/g,""));
        from=parseInt(from);
        to=parseInt(to);
        price=parseInt(price);

        return (price>=from && to>=price);
    }).filter(function() {
        if(jQuery.isArray(property_type_search) && property_type_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('pt'),property_type_search) >= 0);
        }else{
            return true;
        }
    }).each(function(){
            var lat=jQuery(this).attr('lat');
            var lng=jQuery(this).attr('lng');
            var zip=jQuery(this).attr('zip');
        if(lat!='' && lng!=''){
        var marker = L.marker(new L.LatLng(lat, lng));
        var a=jQuery(this);
        var o=a.find('op');
        var new_data={};
        var bindPopup_result='';
        if(a.find('op').length)
        {
            new_data={
                className: "single-map-marker",
                html: '<div class="single-map-point">1</div>',
                iconSize: [43, 56],
                listing_url: listing_url_new,
                img: a.attr('bi'),
                title: a.attr('ttl'),
                neighborhood: a.attr('n'),
                price: a.attr('fp'),
                bedroom: a.attr('bed'),
                bathroom: a.attr('bth'),
                mls_number: a.attr('mls'),
                zip: a.attr('zip'),
                eventday: o.attr('ed'),
                eventtime: o.attr('ts')
            };
            bindPopup_result='<a class="infowindow" url="'+a.attr('url')+'" zip="'+a.attr('zip')+'" href="#" img="'+a.attr('bi')+'" mls_number="'+a.attr('mls')+'"><div class="img-container"><img src="'+a.attr('img')+'"/></div><div class="infowindow-content"><h1>'+a.attr('ttl')+'</h1><h2>'+a.attr('n')+' - <span>'+a.attr('fp')+'</span></h2><h3>Beds/Baths: '+a.attr('bed')+'/'+a.attr('bth')+'</h3><div class="open-timed"><div class="opened-datee">'+o.attr('ed')+'</div> <div class="opened-timee">'+o.attr('ts')+'</div></div></div></a>';
        }else
        {
            new_data={
                className: "single-map-marker",
                html: '<div class="single-map-point">1</div>',
                iconSize: [43, 56],
                listing_url: listing_url_new,
                img: a.attr('bi'),
                title: a.attr('ttl'),
                neighborhood: a.attr('n'),
                price: a.attr('fp'),
                bedroom: a.attr('bed'),
                bathroom: a.attr('bth'),
                mls_number: a.attr('mls'),
                zip: a.attr('zip'),
            };
            bindPopup_result='<a class="infowindow" url="'+listing_url_new+'" zip="'+a.attr('zip')+'" href="#" img="'+a.attr('bi')+'" mls_number="'+a.attr('mls')+'"><div class="img-container"><img src="'+a.attr('img')+'"/></div><div class="infowindow-content"><h1>'+a.attr('ttl')+'</h1><h2>'+a.attr('n')+' - <span>'+a.attr('fp')+'</span></h2><h2>Beds: '+a.attr('bed')+'</h3><h3>Baths: '+a.attr('bth')+'</h2></div></a>';
        }

        var listing_url_new=a.attr('url').replace('http://mccannteam-staging-new.com.nmsrv.com/','http://mccannteams-staging.com.nmsrv.com/');
        marker.setIcon(L.divIcon(new_data));

            marker.bindPopup(bindPopup_result);


            markers.addLayer(marker);
        }
        });

}

map.on('move', function () {
    // marker.setLatLng(map.getCenter());
    var bounds=map.getBounds();
    southWest=bounds._southWest;
    southWest=[southWest.lat,southWest.lng];
    northEast=bounds._northEast;
    northEast=[northEast.lat,northEast.lng];
    map_center=[map.getCenter().lat,map.getCenter().lng];
 url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);


});

map.on('zoomend', function() {
    map_zoom=map.getZoom();
    url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
    window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
    if(map.getZoom()<14)
    {
        map.addLayer(neighborhoods);
        map.removeLayer(markers);
        jQuery('.neighborhood-marker').show();
    }
    if(map.getZoom()>14)
    {

        jQuery('.neighborhood-marker').hide();
        map.addLayer(markers);


    }
});

// Create array of lat,lon points.
var neighborhoods = L.mapbox.featureLayer();
jQuery.getJSON( stylesheet_directory+"/json/map-neighborhood.json", function( data ) {

    jQuery.each(data,function(key, val){
    var lat=val.latitude;
    var lng=val.longitude;
    var neighborhood_name=val.name;
    var nieghborhood_number=jQuery('mappoint[n="'+neighborhood_name+'"]'+selector).filter(function() {
        if(jQuery.isArray(beds_search) && beds_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('bed'),beds_search) >= 0);
        }else{
            return true;
        }
    }).filter(function(){
        if(listing_agent_id=='') {
            return true;}
        else
        {
            var results_lai=false
            if(jQuery(this).attr('lai')==listing_agent_id) results_lai=true;
            if(jQuery(this).attr('lai2')==listing_agent_id) results_lai=true;
            return results_lai;
        }

    }).filter(function(){
        if(Fireplace_search)
        {
            return jQuery(this).attr('f')>=Fireplace_search;
        }else
        {
            return true;
        }
    }).filter(function(){
        return jQuery(this).attr('bth')>=baths_search;
    }).filter(function(){
        return jQuery(this).attr('ls')>=min_lot_size_search;
    }).filter(function(){
        var listing_sqf=parseInt(jQuery(this).attr('sf'));
        search_value=parseInt(min_square_feet_search);
        return listing_sqf>=search_value;
    }).filter(function(){
        return jQuery(this).attr('my')>=year_built_after_search;
    }).filter(function(){
        return jQuery(this).attr('gs')>=min_garage_spaces_search;
    }).filter(function(){
        if(zip_search)
        {
            if(!jQuery.isArray(zip_search)){
                zip_search=zip_search.split(',');
            }
        if(jQuery.isArray(zip_search) && zip_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('zip'),zip_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        if(mls_number_search!='')
        {

         if(!jQuery.isArray(mls_number_search)){
                mls_number_search=mls_number_search.split(',');
            }
        if(jQuery.isArray(mls_number_search) && mls_number_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('mls'),mls_number_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function() {
        if(jQuery.isArray(property_type_search) && property_type_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('pt'),property_type_search) >= 0);
        }else{
            return true;
        }
    }).filter(function(){
        var from = Number(priceFrom_search.replace(/[^0-9\.]+/g,""));
        var to =Number(priceTo_search.replace(/[^0-9\.]+/g,""));
        var price=Number(jQuery(this).attr('fp').replace(/[^0-9\.]+/g,""));
        from=parseInt(from);
        to=parseInt(to);
        price=parseInt(price);

        return (price>=from && to>=price);
    }).length;
    if(nieghborhood_number>0){
    var marker = L.marker(new L.LatLng(lat, lng));
    marker.setIcon(L.divIcon({
                className: "listing-marker neighborhood-marker",
                html: '<div id="'+neighborhood_name+'" class="inner-point neighborhood-name"><div class="neighborhood_name">'+val.name+'</div><span>'+nieghborhood_number+'</span></div>',
                iconSize: null,

            }));
    marker.on('click',function(e){
        map.setView(e.latlng, map.getZoom() + 2);
    });
    neighborhoods.addLayer(marker);
    }
 });
    // map.addLayer(neighborhoods);
});
// Create array of lat,lon points.
jQuery.getJSON( stylesheet_directory+"/json/neighborhoods.json", function( data ) {




 jQuery.each(data.features,function(key, val){
    var polyline_options = {
        color: '#30A3A6',
        weight: 2,
        };
    if(val.properties.mapname==neighborhood_name){
        L.polygon(val.geometry.coordinates[0][0], polyline_options).addTo(map);
    }

     L.polyline(val.geometry.coordinates[0][0], polyline_options).addTo(map);
 });

});
if(map.getZoom()<14)
{

    map.addLayer(neighborhoods);
    jQuery('.neighborhood-marker').show();
}
if(map.getZoom()>14)
{

    jQuery('.neighborhood-marker').hide();
    map.addLayer(markers);


}
}
function grid_listing(index,neighborhood)
{
    var index_end=index+9;
    var result='';
    var i=0;
    var j=0;

    if(neighborhood!=null && neighborhood!=''){
        var neighborhoodstring='[n="'+neighborhood+'"]';
    selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search+neighborhoodstring;
    }
    // console.log('mappoint'+selector);
    jQuery('mappoint'+selector).filter(function() {
    if(jQuery.isArray(beds_search) && beds_search.length)
    {
        return (jQuery.inArray(jQuery(this).attr('bed'),beds_search) >= 0);
    }else{
        return true;
    }
    }).filter(function(){
    if(listing_agent_id=='') {
        return true;}
    else
    {
        var results_lai=false
        if(jQuery(this).attr('lai')==listing_agent_id) results_lai=true;
        if(jQuery(this).attr('lai2')==listing_agent_id) results_lai=true;
        console.log(results_lai);
        return results_lai;
    }

    }).filter(function(){
        return jQuery(this).attr('my')>=year_built_after_search;
    }).filter(function(){
        if(Fireplace_search)
        {
            return jQuery(this).attr('f')>=Fireplace_search;
        }else
        {
            return true;
        }
    }).filter(function(){
        return jQuery(this).attr('bth')>=baths_search;
    }).filter(function(){
        return jQuery(this).attr('ls')>=min_lot_size_search;
    }).filter(function(){

        var listing_sqf=parseInt(jQuery(this).attr('sf'));
        search_value=parseInt(min_square_feet_search);
        return listing_sqf>=search_value;
    }).filter(function(){
        return jQuery(this).attr('gs')>=min_garage_spaces_search;
    }).filter(function(){
        if(zip_search!='')
        {

         if(!jQuery.isArray(zip_search)){
                zip_search=zip_search.split(',');
            }
        if(jQuery.isArray(zip_search) && zip_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('zip'),zip_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        if(mls_number_search!='')
        {

         if(!jQuery.isArray(mls_number_search)){
                mls_number_search=mls_number_search.split(',');
            }
        if(jQuery.isArray(mls_number_search) && mls_number_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('mls'),mls_number_search) >= 0);
        }else
        {
            return true;
        }}else
        {
            return true;
        }
    }).filter(function(){
        var from = Number(priceFrom_search.replace(/[^0-9\.]+/g,""));
        var to =Number(priceTo_search.replace(/[^0-9\.]+/g,""));
        var price=Number(jQuery(this).attr('fp').replace(/[^0-9\.]+/g,""));
        from=parseInt(from);

        to=parseInt(to);

        price=parseInt(price);

        return (price>=from && to>=price);
    }).filter(function() {
        if(jQuery.isArray(property_type_search) && property_type_search.length)
        {
            return (jQuery.inArray(jQuery(this).attr('pt'),property_type_search) >= 0);
        }else{
            return true;
        }
    }).each(function(){

        var a=jQuery(this);
        if(i>=index && i<=index_end){
            var url_new_test=a.attr('url');
            url_new_test=url_new_test.replace('http://mccannteam-staging-new.com.nmsrv.com/','http://mccannteams-staging.com.nmsrv.com/');
            url_new_test=url_new_test+''+a.attr('mls');
        result=result+'<div class="col-md-4 col-sm-6 prop-cols"><a class="overlayeda" href="'+url_new_test+'"></a><div class="single-prop" style="background-image: url('+a.attr('bi')+');"><div class="overlayed"><div class="prop-details"><h4><a class="prop-url" href="'+url_new_test+'">'+a.attr('ttl')+'</a></h4><span class="prop-desc">'+a.attr('n')+'</span><span class="prop-price">'+a.attr('fp')+'</span></div></div></div></div>';
        j++;
        }
        i++;
        if(j==9) return false;
    });

    return result;
}
if(jQuery(window).width() <= 767 || view=='grid'){
    //here
    //fillmap();
    //jQuery('#big-map-sec').remove();
    var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
    result=result+grid_listing(0,neighborhood_name);
    result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
    jQuery('#view-tabs').append(result);
}else{
    fillmap();

}



jQuery(document).ready(function(){
    jQuery('#nighborhood').select2({placeholder: "Select a neighborhood ..."});
    jQuery('#search_form').on('select2:select','#nighborhood',function(e){
        if(jQuery('#big-map-sec').length)
        {
            // var page_url = document.location;
        // document.location = page_url + "?neighborhood=";
        JSON.stringify(e.params, function (key, value) {
            var point=value.data.id;
            neighborhood_name=value.data.text;
            neighborhood_url=neighborhood_name;

            url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
            window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);

            point=point.split(',');
            // map.setZoom(14);
            // window.history.replaceState("", "", '');
            map.eachLayer(function(layer) {

                if (layer.options.fill) {

                    map.removeLayer(layer);

                }
            });
            jQuery.getJSON( stylesheet_directory+"/json/neighborhoods.json", function( data ) {
                 var polygons = L.mapbox.featureLayer();
             jQuery.each(data.features,function(key, val){

                if(val.properties.mapname==neighborhood_name){

                var polyline_options = {
                    color: '#30A3A6',
                    weight: 2,
                    };

                L.polygon(val.geometry.coordinates[0][0], polyline_options).addTo(map);
                }
             });

            });
            map.panTo(new L.LatLng(point[0], point[1]));

        });
        }else
        {
            JSON.stringify(e.params, function (key, value) {
            var point=value.data.id;
            neighborhood_name=value.data.text;
            neighborhood_url=neighborhood_name;
            url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
            window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,nieghborhood,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
            });
        }

    });


    jQuery('#listing_modal').on('click','a.mike-btn.contact-agent',function(event){
        event.preventDefault();
        jQuery('#listing_modal_contact').modal('show');
    });


    jQuery('#search_form').on('click','#all_listings',function(){
        jQuery('#loader').show();

        if(listing_agent_id!=''){
        listing_agent_id_url='';

        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);

        listing_agent_id='';
        selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
        if(jQuery('#big-map-sec').length)
        {
        jQuery('#loader').show();
        jQuery('#map-container #map').remove();
        jQuery('#map-container').html('<div id="map"></div>');


        fillmap();
        jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }

    });

    jQuery('#search_form').on('click','#mccan_only',function(){
        if(listing_agent_id!='153489'){
        listing_agent_id_url='153489';
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        listing_agent_id='153489';
        selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }

    });
    jQuery('#search_form').on('click','.num_bedrooms',function(){
        jQuery('#loader').show();
        beds_search=new Array();
        jQuery('.num_bedrooms').each(function(){
            if(jQuery(this).is(':checked'))
            {
                var bedrooms=jQuery(this).attr('value');
                beds_search.push(bedrooms);
            }
        });
        beds=beds_search;
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }

    });
    jQuery('#search_form').on('click','.bathrooms_number',function(){

        if(baths_search !=jQuery(this).attr('value')){
        jQuery('#loader').show();
        baths_search=jQuery(this).attr('value');
        baths=baths_search;
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    });


    jQuery('#search_form').on('focusout keypress','#priceFrom',function(event){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var priceFrom_search_temp=priceFrom_search;
        priceFrom_search=jQuery(this).val();
        priceFrom=priceFrom_search;
        if(priceFrom_search=='') priceFrom_search='1';
        if(priceFrom_search_temp !=priceFrom_search){

        jQuery('#loader').show();

        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
        }
    });
    jQuery('#search_form').on('focusout keypress','#priceTo',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var priceTo_search_temp=priceTo_search;
        priceTo_search=jQuery(this).val();
        priceTo=priceTo_search;
        if(priceTo_search=='') priceTo_search='100000000000';
    if(priceTo_search_temp!=priceTo_search ){

        jQuery('#loader').show();


        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    }
    });
    jQuery('#search_form').on('focusout keypress','#min_squarefeet',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var min_square_feet_search_temp=min_square_feet_search;
        min_square_feet_search =jQuery(this).val();
        min_square_feet=min_square_feet_search;
        if(min_square_feet=='') min_square_feet='1';
        if(min_square_feet_search_temp!=min_square_feet_search){
        jQuery('#loader').show();

        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    }
    });

    jQuery('#search_form').on('focusout keypress','#year_built_after',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var year_built_after_search_temp=year_built_after_search;
        year_built_after_search =jQuery(this).val();
        year_built_after=year_built_after_search;
        if(year_built_after=='') year_built_after='1';
        if(year_built_after_search_temp!=year_built_after_search){
        jQuery('#loader').show();

        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }

        }
    }
    });

    jQuery('#search_form').on('focusout keypress','#min_lot_size',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var min_lot_size_search_temp = min_lot_size_search;
        min_lot_size_search =jQuery(this).val();
        min_lot_size=min_lot_size_search;
        if(min_lot_size=='') min_lot_size='1';
        if(min_lot_size_search_temp !=min_lot_size_search){
        jQuery('#loader').show();

        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    }
    });

    jQuery('#search_form').on('click','.property_type input',function(){
        var property_type_search_temp=property_type_search;
        property_type_search=jQuery(this).attr('value');
        if(property_type_search!='')
        {
        property_type_search=property_type_search.split('/');
        }
        if(property_type_search_temp != property_type_search){
        jQuery('#loader').show();
        property_type=property_type_search;
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }

    });
    jQuery('#search_form').on('click','#pool_on_property',function(){
        if(jQuery(this).is(':checked')){
        pool_on_property_search='[pool="Y"]';
        }else
        {
            pool_on_property_search='';
        }
        jQuery('#loader').show();

        selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');

            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }


    });

    jQuery('#search_form').on('click','#is_gated_community',function(){

        is_gated_community_search=jQuery(this).attr('value');

        if(jQuery(this).is(':checked')){
        is_gated_community_search='[gated-community="Y"]';
        }else
        {
            is_gated_community_search='';
        }
        selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');

            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }

    });

    jQuery('#search_form').on('click','#basement',function(){
        basement_search=jQuery(this).attr('value');

        if(jQuery(this).is(':checked')){
        basement_search='[basement="Y"]';
        }else
        {
            basement_search='';
        }
        selector=pool_on_property_search+is_gated_community_search+basement_search+min_garage_spaces_search+Fireplace_search;
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');

            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }


    });

    jQuery('#search_form').on('click','#min_garage_spaces',function(){
        if(jQuery(this).is(':checked')){
            min_garage_spaces_search=jQuery(this).attr('value');
        }else
        {
            min_garage_spaces_search='';
        }


        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }


    });

    jQuery('#search_form').on('focusout keypress','#zip_code',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var zip_search_temp=zip_search;
        zip_search =jQuery(this).val()+'';
        if(zip_search_temp!=zip_search){
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    }
    });
    jQuery('#search_form').on('click','#Fireplace',function(){

        if(jQuery(this).is(':checked')){
        Fireplace_search=1;
        }else
        {
            Fireplace_search=0;
        }

        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }

    });
    jQuery('#search_form').on('focusout keypress','#mls_number',function(){
        var run=false;
        if(event.type=='focusout'){
            run=true;
        }else{
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                run=true;
            }
        }

        if(run){
        var mls_number_search_temp=mls_number_search;
        mls_number_search=jQuery(this).val()+'';
        if(mls_number_search_temp != mls_number_search){
        if(jQuery('#big-map-sec').length)
        {
            jQuery('#loader').show();
            jQuery('#map-container #map').remove();
            jQuery('#map-container').html('<div id="map"></div>');
            fillmap();
            jQuery('#loader').hide();
        }else
        {
            jQuery('#listin-grids').remove();
            var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
            result=result+grid_listing(0,neighborhood_name);
            result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
            jQuery('#view-tabs').append(result);
        }
        }
    }
    });



    jQuery('.right-changer').on('click','#grid-tab-link',function(event){
        event.preventDefault();
        view='grid';
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        jQuery('#big-map-sec').remove();
        if(jQuery('#listin-grids').length) jQuery('#listin-grids').remove();
        var result='<section id="listin-grids"><div id="ajax-contianer"><div class="row props-row">';
        result=result+grid_listing(0,neighborhood_name);
        result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div></div></div></section>';
        jQuery('#view-tabs').append(result);
    });
    var clicked=0;
    jQuery('body').on('click','#load_more',function(event){
        event.preventDefault();
        clicked++;
        var index=clicked*9;
        var result=grid_listing(index,neighborhood_name);
        result=result+'<div class="row props-row" id="load_more_container"><div class="col-md-12 load-more-class"><a href="javascript:;" id="load_more">Load more</a></div></div>';
        jQuery('#load_more_container').remove();
        jQuery('#ajax-contianer .row.props-row').append(result);
    });
    jQuery('.right-changer').on('click','#map-tab-link',function(event){
        view='map';
        url_string='?zoom='+map_zoom+'&center='+map_center+'&listing_agent_id='+listing_agent_id_url+'&fireplace='+Fireplace+'&zip='+zip+'&min_bedrooms='+beds+'&min_bathrooms='+baths+'&min_list_price='+priceFrom+'&max_list_price='+priceTo+'&min_square_feet='+min_square_feet+'&year='+year_built_after+'&lot_size='+min_lot_size+'&property_type='+property_type+'&pool='+pool_on_property+'&is_gated_community='+is_gated_community+'&basement='+basement+'&garage='+min_garage_spaces+'&neighborhood='+neighborhood_url+'&view='+view+'&southwest='+southWest+'&northeast='+northEast;
        window.history.replaceState({}, "Buy - The McCann Team", page_url+''+url_string);
        jQuery('#view-tabs').html('<section id="big-map-sec"><div id="loader"><img style="padding-top: 442px;" src="'+stylesheet_directory+'/assets/img/ajax-loader.gif"></div><div id="map-container"><div id="map"></div></div></section>');
        fillmap();
    });



});
jQuery(document).ready(function($){
    setTimeout(function(){
        var view = getParameterByName('view');
        if(view == 'grid') {
            $('#grid-tab-link').click();
        }
    }, 500);
});
