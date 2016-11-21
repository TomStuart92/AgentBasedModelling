var Agent = require('./agent');
'use strict';

function AgentFactory (agentClass) {
  this.agentClass = agentClass || Agent;
}






module.exports = AgentFactory;
