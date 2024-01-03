import React, { FC } from "react";
import { Pressable, Text } from "react-native";
import { Tag } from "../../app/(tabs)";
import tw from "../../lib/tailwind";

type Props = {
  handler: () => void;
  index: number;
  item: Tag;
  length: number;
}

const TagComponent: FC<Props> = ({ handler, index, item, length }) => {
  return <Pressable onPress={handler} key={index} style={tw`bg-red-600 p-2 flex-row items-center ${length === index ? "border-b" : ""} border-slate-300 dark:border-slate-600`}>
    <Text style={tw`text-slate-800 text-base font-bold dark:text-slate-200`}>{item.name}</Text>
  </Pressable>
}

export default TagComponent;