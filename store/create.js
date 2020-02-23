export const state = () => {
  return {
    posts: []
  }
}

export const mutations = {
  postSave (state, data) {
    state.posts.unshift(data);
    if (state.posts.length > 5) {
      state.posts.length = 5;
    }
  }
}