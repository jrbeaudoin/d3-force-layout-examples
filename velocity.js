(function () {
  figureVelocity = d3.select('#d3-force-layout-velocity').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var force = d3.layout.force()
  .friction(1)
  .gravity(0)
  .charge(0)
  .size([w, h]);

  force.on('tick', function () {
    figureVelocity.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
  });

  var previousMousePosition;

  figureVelocity.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1],
      px: (previousMousePosition || (previousMousePosition = mousePosition))[0],
      py: previousMousePosition[1]
    };

    previousMousePosition = mousePosition;

    figureVelocity.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 5)
    .attr('fill', 'white');

    force.nodes().push(node);
    force.start();
  });

  figureVelocity.on('mouseleave', function () {
    figureVelocity.selectAll('circle').remove();
    force.nodes([]);
  });
})();
