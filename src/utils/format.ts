export function normalizeYoutubersData(data: Youtubers): NormalizedYoutubers {
  const normalizedData = data.map(
    ({ Categories, Username, Suscribers, Likes, Visits, Links }) => ({
      category: Categories,
      name: Username,
      url: Links,
      subs: parseInt(Suscribers),
      likes: parseInt(Likes),
      views: parseInt(Visits),
    })
  );

  return normalizedData;
}

export function formatToGroupedNodes(
  data: NormalizedYoutubers
): CategorizedData {
  const groupedData = new Map<string, NormalizedYoutubers>();

  data.forEach((item) => {
    const category = item.category;
    if (category && !groupedData.has(category)) {
      groupedData.set(category, []);
    }
    groupedData.get(category)?.push(item);
  });

  const groupedNodes = Array.from(groupedData, ([group, nodes]) => ({
    group,
    nodes,
  }));

  return groupedNodes;
}
