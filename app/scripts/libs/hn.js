import conf from './conf';
import utils from './utils';

export default {

  getLatestPosts() {
    return utils.get(conf.api.base + conf.api.latest);
  },

  getPost(id) {
    return utils.get(conf.api.base + conf.api.post + id + '.json');
  },

  getUser(id) {
    return utils.get(conf.api.base + conf.api.user + id + '.json');
  },

}
