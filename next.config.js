/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "image.tmdb.org",
      "placehold.co",
      "cdn.countryflags.com",
      "secure.gravatar.com",
    ],
  },
};

module.exports = nextConfig;
