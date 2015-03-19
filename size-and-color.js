(function () {
  figureSizeColor = d3.select('#d3-force-layout-size-color').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var force = d3.layout.force()
  .friction(0.9)
  .gravity(0.1)
  .charge(-10)
  .size([w, h]);

  force.on('tick', function () {
    figureSizeColor.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
  });

  var color = d3.scale.linear()
  .domain([0, 1])
  .range(['hsl(150,50%,50%)', 'hsl(210,100%,100%)'])
  .interpolate(d3.interpolateHsl);

  var previousMousePosition;

  figureSizeColor.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1],
      px: (previousMousePosition || (previousMousePosition = mousePosition))[0],
      py: previousMousePosition[1],
      size: 10 * Math.random() + 2,
      value: Math.random()
    };

    previousMousePosition = mousePosition;

    figureSizeColor.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return d.size; })
    .attr('fill', function (d) { return color(d.value); });

    force.nodes().push(node);
    force.start();
  });

  figureSizeColor.on('mouseleave', function () {
    figureSizeColor.selectAll('circle').remove();
    force.nodes([]);
  });
})();
