'use strict';
$(document).ready(function() {
  var agentManager = new AgentManager();
  var agentFactory = new AgentFactory(Agent, agentManager);
  agentFactory.seedData();

  function runSimulation() {
    for(var i=1; i<=15; i++){
      console.log("Year = "+ i);
      agentManager.tick();
      $("#results").append(JSON.stringify(agentManager._currentRun));
    }
  }

  $("#startSim").click(function() {
    var breedFactor = $("#BreedFactorInput").val()
    agentManager.setBreedFactor(breedFactor)
    runSimulation();
  });
});
