'use strict';
$(document).ready(function() {
  var agentManager = new AgentManager();
  var agentFactory = new AgentFactory(Agent, agentManager);
  agentFactory.seedData();

  function runSimulation() {
    for(var i=1; i<=15; i++){
      console.log("Year = "+ i);
      agentManager.tick();
      updateTable(i)
    }
  }

  function updateTable(year){
    var stats = agentManager._currentRun[year]
    var content = "<tr><td>"+year+"</td>"
    content += '<td>'+ getStatistic(stats, 'Remains: Breed_C') +'</td>';
    content += '<td>'+ getStatistic(stats, 'Remains: Breed_NC')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Becomes: Breed_C')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Becomes: Breed_NC')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Regained: Breed_C')+'</td>';
    content += "</tr>"
    console.log(content);
    $("#tableResults").append(content);
  }

  function getStatistic(object, item){
    return typeof object[item] != 'undefined' ? object[item] : 0
  }

  function clearTable(){
    var headers = "<table id='tableResults'><tr><td>Year</td><td>Remains: Breed_C</td><td>Remains: Breed_NC</td><td>Becomes: Breed_C</td><td>Becomes: Breed_NC</td><td>Regained: Breed_C</td></tr></table>"
    $("#tableResults").replaceWith(headers)
  }

  $("#startSim").click(function() {
    clearTable();
    var breedFactor = $("#BreedFactorInput").val()
    agentManager.setBreedFactor(breedFactor);
    updateTable(0);
    runSimulation();
  });
});
