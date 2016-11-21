'use strict';

function AgentFactory (agentClass, agentManager) {
  this.agentClass = agentClass || Agent;
  this.agentManager = agentManager || new AgentManager;
}

AgentFactory.prototype = {
  seedData: function(alternateData){
    self = this;
    var dataLocation = alternateData || './data'
    $.get(dataLocation, function(data) {
      var result = $.csv.toObjects(data);
      result.forEach(function(object){
        var agent = new self.agentClass(object);
        self.agentManager.addAgent(agent);
      });
    }).then(function(){
      self.agentManager._recordState();
    });
  }
}
