'use strict';

function AgentFactory (agentClass, agentManager) {
  this.agentClass = agentClass || Agent;
  this.agentManager = agentManager || new AgentManager;
}

AgentFactory.prototype = {
  seedData: function(alternateData){
    self = this;
    if (alternateData)
      self._parseData(alternateData)
    else {
      $.get('./data', function(data) {
        self._parseData(data)
      })
    }
  },
  _parseData: function(data){

    self = this;
    var result = $.csv.toObjects(data);
    result.forEach(function(object){
      var agent = new self.agentClass(object);
      self.agentManager.addAgent(agent);
    })
    self.agentManager._recordState();
  }
}
