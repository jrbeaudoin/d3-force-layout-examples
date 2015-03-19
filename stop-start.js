(function () {
  figureStopStart = d3.select('#d3-force-layout-stop-start').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var force = d3.layout.force()
  .friction(0.9)
  .gravity(0.1)
  .charge(-10)
  .size([w, h]);

  force.on('tick', function () {
    figureStopStart.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
  });

  var previousMousePosition;

  figureStopStart.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1],
      px: (previousMousePosition || (previousMousePosition = mousePosition))[0],
      py: previousMousePosition[1]
    };

    previousMousePosition = mousePosition;

    figureStopStart.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 5)
    .attr('fill', 'white');

    force.nodes().push(node);
    if (isSimulationRunning) {
      force.start();
    }
  });

  figureStopStart.on('mouseleave', function () {
    figureStopStart.selectAll('circle').remove();
    force.nodes([]);
  });

  var isSimulationRunning = false;

  figureStopStart.on('click', function () {
    if (isSimulationRunning) {
      force.stop();
    } else {
      force.start();
    }
    isSimulationRunning = !isSimulationRunning;
  });
})();
