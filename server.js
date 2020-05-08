
const express = require('express')

const path = require('path')
const app = express()
const requestJSON = require('request')

app.use(express.static(path.join(__dirname, 'dist')))


const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}



const port = 3000
app.listen(port, function(){
    console.log(`Running server on port ${port}`)
})





app.get('/teams/:teamName', function (request, resp) {
    
    const teamId = teamToIDs[request.params.teamName]

    if(teamId){
        requestJSON("http://data.nba.net/10s/prod/v1/2018/players.json", function(error, response, body){

            const unfilteredTeam = JSON.parse(response.body).league.standard
            let filteredTeam = []
            
            for(let player of unfilteredTeam){

                
                if(player.teamId == teamId && player.isActive){
                   
                    
                    filteredTeam.push({
                        firstName:player.firstName, 
                        lastName: player.lastName,
                        jerseyNumber: player.jersey,
                        position: player.pos,
                        
                    })
                
                }
            }
            
            resp.send(filteredTeam)
        })
    }
    

})