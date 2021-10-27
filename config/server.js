module.exports = ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a86dbe98aafa729841abf6e1810f4e80'),
    },
  },
});
