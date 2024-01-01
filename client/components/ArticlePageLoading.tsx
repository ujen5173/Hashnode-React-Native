import React from "react";
import { View } from "react-native";
import tw from "../lib/tailwind";

const ArticlePageLoading = () => {
  return (
    <View style={tw`flex-1`}>
      <View style={tw`w-full h-54 bg-slate-300 dark:bg-slate-800`} />
      <View style={tw`flex-1 p-4 bg-slate-100 py-6 dark:bg-slate-900`}>
        <View style={tw`mb-6`}>
          <View
            style={tw`w-11/12 mb-2 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`w-8/12 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
        </View>

        <View style={tw`flex-row mb-6 items-center gap-4`}>
          <View
            style={tw`w-12 mx-auto h-12 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`flex-1 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`w-20 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
        </View>

        <View style={tw`flex-row mb-6 w-9/12 mx-auto items-center gap-2`}>
          <View
            style={tw`flex-1 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`w-6 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`flex-1 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
        </View>

        <View style={tw`flex-row mb-6 w-6/12 mx-auto items-center gap-2`}>
          <View
            style={tw`w-6 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
          <View
            style={tw`flex-1 mx-auto h-6 rounded-full bg-slate-300 dark:bg-slate-800`}
          />
        </View>

        <View style={tw`py-8`}>
          <View style={tw`mb-6`}>
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
            <View
              style={tw`w-9/12 h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
          </View>
          <View style={tw`mb-6`}>
            <View
              style={tw`w-9/12 h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
          </View>
          <View style={tw`mb-6`}>
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
            <View
              style={tw`w-9/12 h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
          </View>
          <View style={tw`mb-6`}>
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
            <View
              style={tw`w-full h-6 mb-2 rounded-full bg-slate-300 dark:bg-slate-800`}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArticlePageLoading;
