import * as d3 from "d3";
import * as DOM from "@/utils/dom";
import { TileType, tileFunctions } from "@/utils/d3";

export class TreeMapChart {
  private id: string;
  private data: HierarchyDatum;
  private width: number;
  private height: number;
  private tile: TileType;
  private color: d3.ScaleSequential<string>;
  private format: (n: number | { valueOf(): number }) => string;

  constructor(
    id: string,
    data: HierarchyDatum,
    width: number,
    height: number,
    tile: TileType
  ) {
    this.id = id;
    this.data = data;
    this.width = width;
    this.height = height;
    this.tile = tile;
    this.color = d3.scaleSequential([8, 0], d3.interpolateSpectral);
    this.format = d3.format(",d");
  }

  private createTreemap() {
    const sortedHierarchy = d3
      .hierarchy(this.data)
      .sum((d) => d.subs)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const treemapLayout = d3
      .treemap<HierarchyDatum>()
      .tile(tileFunctions[this.tile])
      .size([this.width, this.height])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true);

    return treemapLayout(sortedHierarchy);
  }

  private createSvg() {
    const svg = d3
      .select<SVGSVGElement, HierarchyDatum>(`#${this.id}`)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", [0, 0, this.width, this.height]);

    return svg;
  }

  private createContainer(
    svg: d3.Selection<SVGSVGElement, HierarchyDatum, HTMLElement, any>
  ) {
    const container = svg.append("g");
    container.attr("width", this.width).attr("height", this.height);

    return container;
  }

  private addTreeMapCells(
    container: d3.Selection<SVGGElement, HierarchyDatum, HTMLElement, any>,
    root: d3.HierarchyRectangularNode<HierarchyDatum>
  ) {
    const groupNodes = container
      .selectAll("g")
      .data(d3.group(root, (d) => d.height))
      .join("g");

    const node = groupNodes
      .selectAll("g")
      .data((d) => d[1])
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    node
      .append("rect")
      .attr("id", (d: any) => (d.nodeUid = DOM.uid("node")).id)
      .attr("fill", (d) => this.color(d.height))
      .attr("fill-opacity", 0.6)
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0);

    node
      .append("clipPath")
      .attr("id", (d: any) => (d.clipUid = DOM.uid("clip")).id)
      .append("use")
      .attr("xlink:href", (d: any) => d.nodeUid.href);

    node
      .append("text")
      .attr("clip-path", (d: any) => d.clipUid)
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
      .filter((d) => !d.children)
      .selectAll("tspan")
      .attr("x", 3)
      .attr(
        "y",
        (d, i, nodes) =>
          `${(i === nodes.length - 1 ? 0.3 : 0) + 1.1 + i * 0.9}em`
      );

    return node;
  }

  private initializeZoom(
    container: d3.Selection<SVGGElement, HierarchyDatum, HTMLElement, any>
  ) {
    const zoom = d3
      .zoom<SVGSVGElement, any>()
      .scaleExtent([1, 10])
      .translateExtent([
        [0, 0],
        [this.width, this.height],
      ])
      .on("zoom", ({ transform }) => container.attr("transform", transform));

    return zoom;
  }

  public clear() {
    d3.select(`#${this.id}`).selectAll("*").remove();
  }

  public render() {
    this.clear();
    const treemapRoot = this.createTreemap();
    const treemapSvg = this.createSvg();
    const treemapContainer = this.createContainer(treemapSvg);
    const treemapZoom = this.initializeZoom(treemapContainer);
    const treemapCells = this.addTreeMapCells(treemapContainer, treemapRoot);
    treemapSvg.call(treemapZoom);
    return treemapCells.node();
  }
}
