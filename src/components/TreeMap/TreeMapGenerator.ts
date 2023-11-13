import * as d3 from "d3";
import * as DOM from "../../utils/dom";

interface Datum {}

export class TreeMapChart {
  id: string;
  data: Datum;
  width: number;
  height: number;
  color: d3.ScaleSequential<string>;
  format: (n: number | { valueOf(): number }) => string;
  shadowId: DOM.Id;

  constructor(id: string, data: Datum, width: number, height: number) {
    this.id = id;
    this.data = data;
    this.width = width;
    this.height = height;
    this.color = d3.scaleSequential([8, 0], d3.interpolateMagma);
    this.format = d3.format(",d");
    this.shadowId = DOM.uid("shadow");
  }

  createTreemap() {
    return d3
      .treemap()
      .size([this.width, this.height])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true);
  }

  createSvg() {
    const svg = d3
      .select(`#${this.id}`)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", [0, 0, this.width, this.height])
      .attr(
        "style",
        "max-width: 100%; height: auto; overflow: visible; font: 10px sans-serif;"
      );

    return svg;
  }

  render() {
    const root = this.createTreemap();
    const svg = this.createSvg();
    return svg.node();
  }
}
