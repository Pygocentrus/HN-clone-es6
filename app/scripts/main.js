import conf from './libs/conf';
import utils from './libs/utils';
import HN from './libs/hn';

HN.getLatestPosts()
.then((data) => {
  const latestPosts = utils.take(data, conf.displayOffset);

  const promises = latestPosts.map((post) => {
    return HN.getPost(post);
  });

  Promise.all(promises)
    .then((data) => {
      console.log(data);
      utils.render(data);
    });
})
.catch(console.error);
