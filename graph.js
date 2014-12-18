  var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");

  var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 700 - margin.left - margin.right,
    height = 370 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%d-%b-%y").parse,
      bisectDate = d3.bisector(function(d) { return d.date; }).left,
      formatValue = d3.format(",.2f"),
      formatCurrency = function(d) { return "$" + formatValue(d); };

  var x = d3.time.scale()
      .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.close); });

  var svg = d3.select(".graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.csv("data.csv", function(error, data) {
    console.log(data);

    data.forEach(function(d) {
      d.date = parseDate(d.Date);
      d.close = +d.Close;
    });

    data.sort(function(a, b) {
      return a.date - b.date;
    });

    x.domain([data[0].date, data[data.length - 1].date]);
    y.domain(d3.extent(data, function(d) { return d.close; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
          .attr("x", 45 + "%")
          .attr("y",30)
          .attr("dy", "0")
          .text("Runout Date");


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("# of Bags of Pellets (40lb Pags)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    var focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .attr("r", 6.5);

    focus.append("text")
        .attr("x", 9)
        .attr("dy", ".35em");

    focus.append("foreignObject")
      .attr("width", 200)
      .attr("height", 300)
      .attr("x", 9)
      .attr("dy", ".35em")
      .append("xhtml:body")
        .style("font", "12px 'Helvetica Neue'")
        .style("font-weight", "none")
        .style("border", "1px solid steelblue")
        .style("padding", "5px")
        .style("background-color", "white")
        .html("Pellets Bags Burneed Per Day: <text id='pellets_per_day' style='font-weight:bold'></text> <br/>\
              Bags of Pellets: <text id='pellets' style='font-weight:bold'></text> <br/>\
              Runout In: <text id='runout_days' style='font-weight:bold'></text> days</br>\
              Runout Date: <text id='runout_date' style='font-weight:bold'></text></br>")
      
    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0,
          y0 = y.invert(d3.mouse(this)[1]);

         var date1 = data[0].date;

         var timeDiff = Math.abs(x0.getTime() - date1.getTime());
         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        var curr_date = x0.getDate();
        var curr_month = x0.getMonth();
        var curr_year = x0.getFullYear();
        var runout_date = m_names[curr_month] + ", " + curr_date + " " + curr_year;

      focus.attr("transform", "translate(" + x(x0) + "," + y(y0) + ")");

      focus.select("#pellets_per_day").text((y0 / diffDays).toFixed(2));
      focus.select("#pellets").text(Math.round(y0));
      focus.select("#runout_days").text(diffDays);
      focus.select("#runout_date").text(runout_date);

    }
  });