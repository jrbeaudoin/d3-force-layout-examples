(function () {
  figureRepulsion = d3.select('#d3-force-layout-repulsion').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var force = d3.layout.force()
  .friction(0.9)
  .gravity(0)
  .charge(-10)
  .size([w, h]);

  force.on('tick', function () {
    figureRepulsion.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
  });

  var previousMousePosition;

  figureRepulsion.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1],
      px: (previousMousePosition || (previousMousePosition = mousePosition))[0],
      py: previousMousePosition[1]
    };

    previousMousePosition = mousePosition;

    figureRepulsion.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 5)
    .attr('fill', 'white');

    force.nodes().push(node);
    force.start();
  });

  figureRepulsion.on('mouseleave', function () {
    figureRepulsion.selectAll('circle').remove();
    force.nodes([]);
  });
})();
