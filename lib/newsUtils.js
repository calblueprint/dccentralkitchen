import { getAllNews } from './airtable/request';

// Transform postDate to Date object
function updateNewsItemData(record) {
  return { ...record, postDate: new Date(record.postDate) };
}

// Gets news items, sorted by 'post date'
export async function getNewsItems() {
  const records = await getAllNews('', [
    { field: 'Post Date', direction: 'desc' }
  ]);
  const newsItems = records.map(updateNewsItemData);
  return newsItems;
}

export default getNewsItems;
