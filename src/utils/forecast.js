const request=require('request')

const weather=(longitude,latitude,callback)=>{
    const url=`https://api.darksky.net/forecast/39ce4afa0478e3882e527d84a0fccd1b/${latitude},${longitude}?units=si`
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the network',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,{
                summary:body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipProbability:body.daily.data[0].precipProbability
            })
        }            
    })
}

module.exports=weather;