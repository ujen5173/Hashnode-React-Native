import Checkbox from "expo-checkbox";
import React, { FC } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../constants/Colors";
import tw from "../../lib/tailwind";

type Props = {
  options: {
    label: string;
    value: string;
    checked: boolean;
  }[];
  readingChange: (index: number) => void;
}

const ReadingComponent: FC<Props> = ({
  options,
  readingChange
}) => {
  return <View>
    <View style={tw`mb-6`}>
      <Text style={tw`text-slate-900 dark:text-white text-base mb-2 font-bold`}>
        Reading Time
      </Text>

      <View style={tw``}>
        {options.map((value, index) => (
          <Pressable onPress={() => readingChange(index)} key={index} style={tw`flex-row items-center`}>
            <Checkbox
              style={tw`mr-2 my-2`}
              value={value.checked}
              color={value.checked ? colors.blue["600"] : undefined}
            />
            <Text style={tw`text-slate-800 text-base font-bold dark:text-slate-200`}>{value.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>

    <View style={tw`flex-row gap-2 items-center`}>
      <View style={tw`flex-1`}>
        <TouchableOpacity activeOpacity={.9} style={tw`border-blue-600 px-4 py-2 rounded-full border border-blue-600`}>
          <Text style={tw`text-blue-600 text-base text-center`}>Clear Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1`}>
        <TouchableOpacity activeOpacity={.9} style={tw`text-center bg-blue-600 px-4 py-2 rounded-full border border-blue-600`}>
          <Text style={tw`text-white text-base text-center`}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
}
export default ReadingComponent;