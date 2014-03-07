$(document).ready(function() {

  var width = 960,
      height = 500;

  var projection = d3.geo.mercator()
    .scale((width + 1) / 2 / Math.PI)
    .translate([width / 2, height / 2 + 50])
    .precision(0.1);

  var svg = d3.select("#meetupmap").append("svg")
      .attr("width", width)
      .attr("height", height);

  var path = d3.geo.path()
      .projection(projection);

  var g = svg.append("g");
  

  // load and display the World
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
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 5])
    .on("zoom",function() {
        g.attr("transform","translate(" + d3.event.translate.join(",") + ")scale(" + d3.event.scale + ")");
        g.selectAll("path")  
          .attr("d", path.projection(projection));
        g.selectAll("circle")
          .attr("r", 5 / d3.event.scale )
          .style("stroke-width", 1 / d3.event.scale);
  });

  svg.call(zoom);

});