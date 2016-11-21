'use strict';

function AgentManager () {
  this._agents = [];
  this._currentRun = {};
  this._year = 0;
  this._breedFactor = null;
}

AgentManager.prototype =  {
  addAgent: function(agent){
    this._agents.push(agent);
  },
  setBreedFactor: function(breedFactor){
    this._breedFactor = breedFactor;
  },
  tick: function(){
    var breedFactor = this._breedFactor
    this._year++;
    this._agents.forEach(function(agent){
      agent.tick(breedFactor);
    });
    return this._recordState();
  },
  _recordState: function(){
    var currentState = this._agents.map(function(agent){
      return agent.currentBreed();
    });
    this._currentRun[this._year] = this._aggregateState(currentState);;
  },
  _aggregateState: function(agents){
    return agents.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }
}


// Output:	Agents in each Breed
// 	Breed_C Lost (Switched to Breed_NC)
// 	Breed_C Gained (Switch from Breed_NC)
// 	Breed_C Regained (Switched to NC, then back to C)
