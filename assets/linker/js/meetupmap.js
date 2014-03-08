$(document).ready(function() {

  var margin = {left: 10, right: 10},
     width = parseInt(d3.select('#meetupmap').style('width')) - margin.left - margin.right,
     height = width *  0.5;

  var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2 + 50])
    .precision(0.1);

  var path = d3.geo.path()
      .projection(projection);

  var svg = d3.select("#meetupmap").append("svg")
      .attr("width", width + 'px')
      .attr("height", height + 'px');

  var g = svg.append("g");
  

  // load and display the world
  d3.json("./static/world.json", function(error, topology) {

    // load and display the cities
    d3.csv("./static/meetup-cities.csv", function(error, data) {
        g.selectAll(".point")
          .data(data)
          .enter()
          .append("a")
            .attr("xlink:href", function(d) { return d.url; })
            .attr("xlink:show", "new")
          .append("circle")
            .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
            .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; })
            .attr("r", 5)
            .style("stroke", "black")
            .style("stroke-width", 1)
            .style("fill", "#aab5de")
            .call(
              d3.helper.tooltip()
                .attr({'class': 'meetup-tooltip'})
                .text(function(d) { return d.city; })
            );
    });

    g.selectAll("path")
          .data(topojson.feature(topology, topology.objects.countries).features)
        .enter()
          .append("path")
          .attr("d", path);

  });

    // zoom and pan
    // var zoom = d3.behavior.zoom()
    //   .scaleExtent([1, 5])
    //   .on("zoom",function() {
    //       g.attr("transform","translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
    //       g.selectAll("path")  
    //         .attr("d", path.projection(projection));
    //       g.selectAll("circle")
    //         .attr("r", 5 / d3.event.scale )
    //         .style("stroke-width", 1 / d3.event.scale);
    // });

   // svg.call(zoom);

  // responsive 
  d3.select(window).on('resize', resize);

  function resize() {
    width = parseInt(d3.select('#meetupmap').style('width')) - margin.left - margin.right;
    height = width *  0.5;

    // update projection
    projection = d3.geo.mercator()
      .scale((width + 1) / 2 / Math.PI)
      .translate([width / 2, height / 2 + 50])
      .precision(0.1);

    // resize the map container
    svg
      .style('width', width + 'px')
      .style('height', height + 'px');

    // resize the map
    g.selectAll("path").attr("d", path.projection(projection));
    g.selectAll("circle")
      .attr("cx", function(d) { return projection([d.lon, d.lat])[0]; })
      .attr("cy", function(d) { return projection([d.lon, d.lat])[1]; });
  }


});