import BASE from '../lib/common';

function createAnnouncementData(announcement) {
  return {
    date: new Date(announcement.get('Created')),
    description: announcement.get('Description'),
    title: announcement.get('Title'),
    id: announcement.get('ID')
  };
}

const getAnnouncements = function async() {
  return BASE('Announcements')
    .select({
      view: 'Grid view',
      sort: [{ field: 'Created', direction: 'desc' }]
    })
    .all()
    .then(announcements => {
      const announcementObjs = announcements.map(announcement =>
        createAnnouncementData(announcement)
      );
      return announcementObjs;
    });
};

export default getAnnouncements;
