export default () => ({
  jwt: {
    public_key_path: process.env.JWT_PUBLIC_KEY_PATH,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
  },
});
