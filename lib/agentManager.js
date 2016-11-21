var Agent = require('./agent');
'use strict';

function AgentManager () {
  this._agents = [];
  this._currentRun = {};
  this._breedFactor = null;
}

AgentManager.prototype =  {
  addAgent: function(agent){
    this._agents.push(agent);
  },
  setBreedFactor: function(breedFactor){
    this._breedFactor = breedFactor;
  }
}


module.exports = AgentManager;



// Output:	Agents in each Breed
// 	Breed_C Lost (Switched to Breed_NC)
// 	Breed_C Gained (Switch from Breed_NC)
// 	Breed_C Regained (Switched to NC, then back to C)
