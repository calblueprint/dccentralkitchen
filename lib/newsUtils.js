import BASE from './common';

function createNewsItemData(newsItem) {
  return {
    date: new Date(newsItem.get('Created')),
    description: newsItem.get('Description'),
    title: newsItem.get('Title'),
    id: newsItem.get('ID')
  };
}

const getNewsItems = function async() {
  return BASE('News')
    .select({
      view: 'Grid view',
      sort: [{ field: 'Created', direction: 'desc' }]
    })
    .all()
    .then(newsItems => {
      const newsItemObjs = newsItems.map(newsItem =>
        createNewsItemData(newsItem)
      );
      return newsItemObjs;
    });
};

export default getNewsItems;
