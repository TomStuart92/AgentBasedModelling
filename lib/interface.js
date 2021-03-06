'use strict';
$(document).ready(function() {
  var graphData = [['Year', 'Breed_C', 'Breed_NC']];
  var year = 0;
  var inProgress = false;
  var agentManager = new AgentManager();
  var agentFactory = new AgentFactory(Agent, agentManager);
  agentFactory.seedData();

  function runSimulation() {
    for(;year<15;){
      console.log(year);
      singleYear();
    }
  }

  function singleYear(){
    year++;
    agentManager.tick();
    updateTable(year);
    updateGraphData(year);
    updateGraph();
  }

  function updateGraphData(year){
    var stats = agentManager._currentRun[year];
    var Breed_C = getStatistic(stats, 'Remains: Breed_C') + getStatistic(stats, 'Becomes: Breed_C') + getStatistic(stats, 'Regained: Breed_C');
    var Breed_NC = getStatistic(stats, 'Remains: Breed_NC') + getStatistic(stats, 'Becomes: Breed_NC') + getStatistic(stats, 'Regained: Breed_NC');
    graphData.push([year, Breed_C, Breed_NC]);
  }

  function updateTable(year){
    var stats = agentManager._currentRun[year];
    var content = "<tr><td>"+year+"</td>";
    content += '<td>'+ getStatistic(stats, 'Remains: Breed_C') +'</td>';
    content += '<td>'+ getStatistic(stats, 'Remains: Breed_NC')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Becomes: Breed_C')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Becomes: Breed_NC')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Regained: Breed_C')+'</td>';
    content += '<td>'+ getStatistic(stats, 'Regained: Breed_NC')+'</td>';
    content += "</tr>";
    $("#tableResults").append(content);
  }

  function updateGraph(){
    google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);
     function drawChart() {
       var data = google.visualization.arrayToDataTable(graphData);
       var options = {
         title: 'Breed Retention',
         curveType: 'function',
         legend: { position: 'bottom' },
         hAxis: { maxValue: 15, title: 'Year'},
         vAxis: { title: "Number in Population"}
       };
       var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
       chart.draw(data, options);
     }
  }

  function getStatistic(object, item){
    return typeof object[item] != 'undefined' ? object[item] : 0;
  }

  function startSimulation(){
    inProgress = true;
    setBrandFactor();
    updateGraphData(0);
    updateGraph(graphData);
    updateTable(0);
  }

  function setBrandFactor(){
    var brandFactor = $("#BrandFactorInput").val()
    agentManager.setBrandFactor(parseFloat(brandFactor));
  }


  $("#clearSim").click(function() {
    location.reload();
  });

  $("#nextYear").click(function() {
    if (!inProgress) {startSimulation()};
    if (year == 15) {return};
    singleYear();
  });

  $("#startSim").click(function() {
    if (!inProgress) {startSimulation()};
    runSimulation();
  });
});
