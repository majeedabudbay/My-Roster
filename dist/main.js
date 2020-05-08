$("#btn").on("click", function(){
    const team = $("#input").val()
    // console.log(team)
    $.get(`/teams/${team}`, function (response) {
        
        renderTeam(response)
        
    })


    $("#input").val("")
})



const renderTeam = function(team){
    // console.log(team)
    $("#players").empty()


    const source = $('#player-template').html()
    const template = Handlebars.compile(source)
    let newHTML = template({ player: team })
    $("#players").append(newHTML) 


}