(function () {
  figurePoints = d3.select('#d3-force-layout-points').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  figurePoints.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1]
    };

    figurePoints.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 5)
    .attr('fill', 'white');
  });

  figurePoints.on('mouseleave', function () {
    figurePoints.selectAll('circle').remove();
  });
})();
