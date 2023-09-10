import { createAuth0 } from "@auth0/auth0-vue";
import { authConfig } from "@/config";
const register = (app) => {
  const auth0 = createAuth0(authConfig);
  app.use(auth0);
};

export default {
  register,
};
