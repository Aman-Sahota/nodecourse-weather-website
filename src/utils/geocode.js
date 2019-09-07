const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoib2JpdG91Y2hpaGExOTk2IiwiYSI6ImNrMDUzejF0MTAxcm8zaG52NHM1cnRmNmgifQ.TT0v7y8K8-9QZbMuoZCI8g&limit=1'
    
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Network connection not available',undefined)
        }else if(body.features.length===0){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }    
    })    
}

module.exports=geocode;