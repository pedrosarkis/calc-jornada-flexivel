import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    paths: {
      base: dev ? '' : '/flexible-shift-calc',
    },
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null
    })
  }
};
