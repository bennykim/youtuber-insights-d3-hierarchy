export class TreeMapData<T extends Youtubers> {
  private static readonly DEFAULT_DATUM = {
    url: "",
    subs: 0,
    likes: 0,
    views: 0,
  };

  private title: string;
  private data: T[];

  constructor(title: string, data: T[]) {
    this.title = title;
    this.data = data;
  }

  private normalizeData(): Array<HierarchyDatum> {
    return this.data.map(
      ({ Categories, Username, Suscribers, Likes, Visits, Links }) => ({
        category: Categories,
        name: Username,
        url: Links,
        subs: this.parseNumber(Suscribers),
        likes: this.parseNumber(Likes),
        views: this.parseNumber(Visits),
      })
    );
  }

  private parseNumber(value: string): number {
    const number = parseInt(value, 10);
    return isNaN(number) ? 0 : number;
  }

  private groupByCategory(
    data: Array<HierarchyDatum>
  ): Map<string, Array<HierarchyDatum>> {
    const categoryGroups = new Map<string, Array<HierarchyDatum>>();
    data.forEach((item) => {
      const category = item.category || "Others";
      if (!categoryGroups.has(category)) {
        categoryGroups.set(category, []);
      }
      categoryGroups.get(category)?.push(item);
    });
    return categoryGroups;
  }

  public formatToGroupedNodes(): HierarchyDatum {
    const normalizedData = this.normalizeData();
    const categoryGroups = this.groupByCategory(normalizedData);

    const groupedChildren = Array.from(categoryGroups, ([category, nodes]) => ({
      ...TreeMapData.DEFAULT_DATUM,
      category: category,
      name: category,
      children: nodes,
    }));

    return {
      ...TreeMapData.DEFAULT_DATUM,
      category: "root",
      name: this.title,
      children: groupedChildren,
    };
  }
}
