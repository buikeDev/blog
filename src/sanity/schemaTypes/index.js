import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import userType from "./userType";
import { commentType } from "./commentType";

export const schema = {
  types: [blockContentType, categoryType, postType, authorType, userType, commentType],
};
