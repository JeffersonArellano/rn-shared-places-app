const variables = {
  development: {
    googleApiKey: "AIzaSyBAQ9HF2_k4aIVvlVmjLDFL2lgfV_9n1dQ",
  },
  production: {
    googleApiKey: "AIzaSyBAQ9HF2_k4aIVvlVmjLDFL2lgfV_9n1dQ",
  },
};

const getEnvVariables = () => {
  if (__DEV__) {
    return variables.development; // return this if in development mode
  }
  return variables.production; // otherwise, return this
};

export default getEnvVariables;
