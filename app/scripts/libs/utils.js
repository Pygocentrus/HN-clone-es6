import conf from './conf';
import UI from './ui';

export default {

  get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.status === 200) {
            response
              .json()
              .then(resolve);
          }
        })
        .catch(reject);
    });
  },

  take(elements, length) {
    return elements.slice(0, length);
  },

  render(data) {
    const posts = UI.posts(data);

    document.querySelector('#posts').innerHTML = posts;
  },

};
