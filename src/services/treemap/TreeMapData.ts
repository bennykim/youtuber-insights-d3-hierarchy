export class TreeMapData {
  data: Youtubers;

  constructor(data: Youtubers) {
    this.data = data;
  }

  normalizeData(): NormalizedYoutubers {
    return this.data.map(
      ({ Categories, Username, Suscribers, Likes, Visits, Links }) => ({
        category: Categories,
        name: Username,
        url: Links,
        subs: parseInt(Suscribers),
        likes: parseInt(Likes),
        views: parseInt(Visits),
      })
    );
  }

  formatToGroupedNodes(): CategorizedData {
    const normalizedData = this.normalizeData();
    const groupedData = new Map<string, NormalizedYoutubers>();

    normalizedData.forEach((item) => {
      const category = item.category;
      if (category && !groupedData.has(category)) {
        groupedData.set(category, []);
      }
      groupedData.get(category)?.push(item);
    });

    return Array.from(groupedData, ([group, nodes]) => ({ group, nodes }));
  }
}
