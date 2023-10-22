import { v5 as uuidv5 } from "uuid";

const UUIDGenerator = (customString = "14b90817") => {
  return uuidv5(customString, process.env.MY_NAMESPACE);
};
export default UUIDGenerator;
