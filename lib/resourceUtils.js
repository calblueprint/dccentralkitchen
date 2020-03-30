import BASE from './common';

function createResourceData(resource) {
  return {
    url: resource.get('URL'),
    description: resource.get('Description'),
    title: resource.get('Title'),
    category: resource.get('Category'),
    id: resource.id,
  };
}

const getResources = function async() {
  return BASE('Resources')
    .select()
    .all()
    .then(resources => {
      const resourceObjs = resources.map(resource =>
        createResourceData(resource)
      );
      return resourceObjs;
    });
};

export default getResources;
