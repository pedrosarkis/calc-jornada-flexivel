import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter({
      strict: false
    }),
    paths: {
      base: dev ? '' : '/flexible-shift-calc',
    }
  }
};
