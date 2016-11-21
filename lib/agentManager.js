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
  clearAgents: function(){
    this._agents = [];
    this._currentRun = {};
    this._year = 0;
    this._breedFactor = null;
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
      return agent.statusUpdate();
    });
    this._currentRun[this._year] = this._aggregateState(currentState);;
  },
  _aggregateState: function(agents){
    return agents.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
  }
}
