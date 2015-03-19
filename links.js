(function () {
  figureLinks = d3.select('#d3-force-layout-links').append('svg:svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var force = d3.layout.force()
  .linkDistance(0.5)
  .linkStrength(1.5)
  .friction(0.9)
  .gravity(0.2)
  .charge(-80)
  .size([w, h]);

  function collide (node) {
    var r = node.size + 16,
        nx1 = node.x - r,
        nx2 = node.x + r,
        ny1 = node.y - r,
        ny2 = node.y + r;

    return function (quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.size + quad.point.size;
        if (l < r) {
          l = (l - r) / l * .5;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    };
  }

  force.on('tick', function (e) {
    var nodes = force.nodes();
    var k = e.alpha * .1;

    var q = d3.geom.quadtree(nodes),
    i = 0,
    n = nodes.length;

    while (++i < n) q.visit(collide(nodes[i]));

    figureLinks.selectAll('circle')
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });

    figureLinks.selectAll('line')
    .attr('x1', function(d) { return d.source.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y2', function(d) { return d.target.y; });
  });

  var color = d3.scale.linear()
  .domain([0, 1])
  .range(['hsl(150,50%,50%)', 'hsl(210,100%,100%)'])
  .interpolate(d3.interpolateHsl);

  var previousMousePosition;

  figureLinks.on('mousemove', function() {
    var mousePosition = d3.mouse(this),
    node = {
      x: mousePosition[0],
      y: mousePosition[1],
      size: 10 * Math.random() + 2,
      value: Math.random()
    },
    link = {
      source: node,
      target: force.nodes()[Math.floor(Math.random() * force.nodes().length)] || node
    };

    previousMousePosition = mousePosition;

    figureLinks.append('svg:circle')
    .data([node])
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return d.size; })
    .attr('fill', function (d) { return color(d.value); });

    figureLinks.append('svg:line')
    .data([link])
    .attr('stroke', 'red')
    .attr('stroke-width', 1.5);

    force.nodes().push(node);
    force.links().push(link);
    force.start();
  });

  figureLinks.on('mouseleave', function () {
    figureLinks.selectAll('circle').remove();
    figureLinks.selectAll('line').remove();
    force.nodes([]);
    force.links([]);
  });
})();
