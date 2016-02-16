class UI {

  static singlePost(post) {
    return [
      '<li>',
      '<a href="' + post.url + '" target="_blank">',
      post.title,
      '</a>',
      '</li>'
    ].join('');
  }

  static posts(posts) {
    return posts.reduce((previous, post) => {
      return previous + this.singlePost(post);
    }, '');
  }

};

export default UI;
