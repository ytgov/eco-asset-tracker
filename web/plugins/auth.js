import { createAuth0 } from "@auth0/auth0-vue";
import { authConfig } from "@/config";
export const auth0 = createAuth0(authConfig);

const register = (app) => {
  app.use(auth0);
};

export default {
  register,
};
