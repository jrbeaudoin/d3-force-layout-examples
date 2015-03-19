(function () {
  var root;

  var force = d3.layout.force()
  .size([w, h])
  .on('tick', tick);

  var figureGraph = d3.select('#d3-force-layout-graph').append('svg')
  .attr('width', w)
  .attr('height', h)
  .style('background', backgroundColor);

  var link = figureGraph.selectAll('.link'),
  node = figureGraph.selectAll('.node');

  d3.json('//mbostock.github.io/d3/talk/20111116/flare.json', function (json) {
    root = flatten(json);

    root.forEach(function (node) {
      node.x = w * Math.random();
      node.y = h * Math.random();
    });

    update();
  });

  function update () {
    var nodes = root,
    links = d3.layout.tree().links(nodes);

    // Restart the force layout.
    force
    .nodes(nodes)
    .links(links);

    // Update the links…
    link = link.data(links, function (d) { return d.target.id; });

    // Enter any new links.
    link.enter().insert('line', '.node')
    .attr('class', 'link')
    .attr('x1', function(d) { return d.source.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y2', function(d) { return d.target.y; });

    // Update the nodes…
    node = node.data(nodes, function(d) { return d.id; });

    // Enter any new nodes.
    node.enter().append('circle')
    .attr('class', 'node')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', function(d) { return Math.sqrt(d.size) / 10 || 4.5; })
    .style('fill', 'white');
  }

  function tick() {
    link.attr('x1', function(d) { return d.source.x; })
    .attr('y1', function(d) { return d.source.y; })
    .attr('x2', function(d) { return d.target.x; })
    .attr('y2', function(d) { return d.target.y; });

    node.attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; });
  }

  // Returns a list of all nodes under the root.
  function flatten (root) {
    var nodes = [], i = 0;

    function recurse (node) {
      if (node.children) node.children.forEach(recurse);
      if (!node.id) node.id = ++i;
      nodes.push(node);
    }

    recurse(root);
    return nodes;
  }

  figureGraph.on('click', function () {
    force.start();
  });

  figureGraph.on('mouseleave', function () {
    force.stop();
  });
})();
