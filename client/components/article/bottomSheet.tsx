import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";

const BottomSheet = ({
  name,
  handlePresentModalClose,
}: {
  name?: string;
  handlePresentModalClose: () => void;
}) => {
  const { themeValue } = useContext(C);
  return (
    <View style={tw`flex-1 bg-white dark:bg-slate-800 p-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-slate-900 dark:text-white text-xl font-bold`}>
          More Options
        </Text>
        <Pressable onPress={handlePresentModalClose}>
          <Icons.times
            size={20}
            stroke={"none"}
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </Pressable>
      </View>

      <View style={tw`py-2`}>
        <View
          style={tw`px-3 py-5 border-b border-slate-300 dark:border-slate-600 flex-row gap-4 items-center`}
        >
          <Icons.plus
            size={20}
            stroke={"none"}
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
          <View style={tw`flex-row items-center gap-1`}>
            <Text style={tw`text-slate-700 dark:text-slate-200 text-lg`}>
              Follow
            </Text>
            <Text
              style={tw`text-slate-700 dark:text-slate-200 text-lg font-extrabold`}
            >
              {name}
            </Text>
          </View>
        </View>

        <View
          style={tw`px-3 py-5 border-b border-slate-300 dark:border-slate-600 flex-row gap-4 items-center`}
        >
          <Icons.heart
            size={20}
            fill={"none"}
            stroke={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
          <Text style={tw`text-slate-700 dark:text-slate-200 text-lg`}>
            Show Likes
          </Text>
        </View>
        <View style={tw`px-3 py-5 flex-row gap-4 items-center`}>
          <Icons.report
            size={20}
            stroke={"none"}
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
          <Text style={tw`text-slate-700 dark:text-slate-200 text-lg`}>
            Report
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BottomSheet;
