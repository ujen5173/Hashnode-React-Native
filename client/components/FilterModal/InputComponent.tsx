import { LoaderIcon } from "lucide-react-native";
import React, { FC } from "react";
import { FlatList, Text, View } from "react-native";
import { Tag } from "../../app/(tabs)";
import tw from "../../lib/tailwind";
import TagComponent from "./Tag";

type Props = {
  selectTag: () => void;
  value: string;
  tags: Tag[];
  isLoading: boolean;
}

const InputComponent: FC<Props> = ({
  selectTag,
  value,
  tags,
  isLoading
}) => {
  return <View style={tw``}>
    {
      isLoading ? (
        <View style={tw`p-4 items-center justify-center`}>
          <LoaderIcon size={30} style={tw`text-slate-700 dark:text-slate-200`} />
        </View>
      ) : (
        value.length > 0 && !isLoading ? (
          <View>
            {
              tags.length > 0 ? (
                <FlatList
                  data={tags}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item, index }) => (
                    <TagComponent selectTag={selectTag} index={index} item={item} length={tags.length} />
                  )}
                />
              ) : (
                <View style={tw`py-6`}>
                  <Text style={tw`text-center text-xl mb-1 text-slate-700 dark:text-slate-200`}>Woops! No results found.</Text>
                  <Text style={tw`text-center text-xl text-slate-700 dark:text-slate-200`}>Try a new keyword</Text>
                </View>
              )
            }
          </View>
        ) : (
          <View style={tw`py-6`}>
            <Text style={tw`text-center text-xl text-slate-700 dark:text-slate-200`}>Start typing to search...</Text>
          </View>
        )
      )
    }
  </View>
}

export default InputComponent;