/**
 * Created by kucingmint on 4/19/17.
 */

module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.eot',
    'dist/**.ttf',
    'dist/**.woff',
    'dist/**.woff2',
    'dist/**.svg',
    'dist/**.jpg',
    'dist/**.png',
    'dist/**.ico',
    'dist/**.json',
    'dist/assets/**.svg',
    'dist/assets/**.png',
    'dist/assets/**.jpg',
    "dist/assets/images/**.svg",
    "dist/assets/images/**.png",
    "dist/assets/images/**.jpg",
    "dist/assets/images/**.json"
  ]
};
