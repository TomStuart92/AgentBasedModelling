'use strict';

function AgentManager () {
  this._agents = [];
  this._currentRun = {};
  this._year = 0;
  this._brandFactor = null;
}

AgentManager.prototype =  {
  addAgent: function(agent){
    this._agents.push(agent);
  },
  setBrandFactor: function(brandFactor){
    this._brandFactor = brandFactor;
  },
  tick: function(){
    var brandFactor = this._brandFactor;
    this._year++;
    this._agents.forEach(function(agent){
      agent.tick(brandFactor);
    });
    return this._recordState();
  },
  _recordState: function(){
    var currentState = this._agents.map(function(agent){
      return agent.statusUpdate();
    });
    this._currentRun[this._year] = this._aggregateState(currentState);
  },
  _aggregateState: function(agents){
    return agents.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
  }
}
