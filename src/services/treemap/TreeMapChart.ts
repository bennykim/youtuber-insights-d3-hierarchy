import * as d3 from "d3";
import * as DOM from "@/utils/dom";

export class TreeMapChart {
  id: string;
  data: HierarchyDatum;
  width: number;
  height: number;
  color: d3.ScaleSequential<string>;
  format: (n: number | { valueOf(): number }) => string;
  shadowId: DOM.Id;

  constructor(id: string, data: HierarchyDatum, width: number, height: number) {
    this.id = id;
    this.data = data;
    this.width = width;
    this.height = height;
    this.color = d3.scaleSequential([8, 0], d3.interpolateSpectral);
    this.format = d3.format(",d");
    this.shadowId = DOM.uid("shadow");
  }

  createTreemap() {
    const sortedHierarchy = d3
      .hierarchy(this.data)
      .sum((d) => d.subs)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const treemapLayout = d3
      .treemap<HierarchyDatum>()
      .size([this.width, this.height])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true);

    return treemapLayout(sortedHierarchy);
  }

  createSvg() {
    const svg = d3
      .select<SVGSVGElement, HierarchyDatum>(`#${this.id}`)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", [0, 0, this.width, this.height]);

    return svg;
  }

  addTreeMapCells(
    svg: d3.Selection<SVGSVGElement, HierarchyDatum, HTMLElement, any>,
    root: d3.HierarchyRectangularNode<HierarchyDatum>
  ) {
    const node = svg
      .selectAll("g")
      .data(d3.group(root, (d) => d.height))
      .join("g")
      .selectAll("g")
      .data((d) => d[1])
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    node.append("title").text(
      (d) =>
        `${d
          .ancestors()
          .reverse()
          .map((d) => d.data.name)
          .join(".")}\n${this.format(d.value ?? 0)}`
    );

    node
      .append("rect")
      .attr("id", DOM.uid("node").id)
      .attr("fill", (d) => this.color(d.height))
      .attr("fill-opacity", 0.6)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    node
      .append("text")
      .selectAll("tspan")
      .data((d) => {
        return d.data.name
          ? d.data.name
              .split(/(?=[A-Z][a-z])|\s+/g)
              .concat(this.format(d.value ?? 0))
          : [];
      })
      .join("tspan")
      .attr("fill-opacity", (d, i, nodes) =>
        i === nodes.length - 1 ? 0.7 : null
      )
      .attr("font-size", "10px")
      .attr("fill", "white")
      .text((d) => d);

    node
      .filter((d: any) => d.children)
      .selectAll("tspan")
      .attr("dx", 3)
      .attr("y", 13);

    node
      .filter((d: any) => !d.children)
      .selectAll("tspan")
      .attr("x", 3)
      .attr(
        "y",
        (d, i, nodes) =>
          `${(i === nodes.length - 1 ? 0.3 : 0) + 1.1 + i * 0.9}em`
      );

    return node;
  }

  render() {
    const root = this.createTreemap();
    const svg = this.createSvg();
    this.addTreeMapCells(svg, root);
    return svg.node();
  }
}
