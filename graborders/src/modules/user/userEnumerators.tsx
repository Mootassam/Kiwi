import Roles from "src/security/roles";

const userEnumerators = {
  status: ["active", "empty-permissions"],
  genre: ["male", "female"],
  wallet: ["Erc20", "Trc20","ETH"],
  roles: Object.keys(Roles.values),
};

export default userEnumerators;
