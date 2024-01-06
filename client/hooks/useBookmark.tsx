import { useState } from "react";
import storage from "../helpers/storage";

const useBookmark = () => {
  const [_, setBookmarks] = useState<string[]>([]);
  storage
    .load({
      key: "bookmarks",
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((res) => {
      setBookmarks(res || []);
      return res;
    })
    .catch((err) => {
      if (err.name === "NotFoundError") {
        storage.save({
          key: "bookmarks",
          data: [],
          expires: null,
        });
      }
    });

  return _;
};

export default useBookmark;
