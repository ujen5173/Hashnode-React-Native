import React, { FC, useContext } from "react";
import { Image, Text, View } from "react-native";
import { Notification } from "../../app/notifications";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";
import Icons from "../Icons";

type FollowCardProps = {
  card: Notification;
};

const FollowCard: FC<FollowCardProps> = ({ card }) => {
  const { themeValue } = useContext(C);
  return (
    <View
      style={tw`p-4 border-b border-slate-300 dark:border-slate-600 flex-row gap-4`}
    >
      <View style={tw`w-12 h-12 items-center justify-center`}>
        <Icons.userAdd
          size={16}
          fill="none"
          stroke={
            themeValue === "dark" ? colors.slate["100"] : colors.slate["600"]
          }
        />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`mb-1 text-lg text-slate-800 dark:text-slate-100`}>
          {card.body}
        </Text>
        <View>
          <Image
            source={{ uri: card?.from?.image! }}
            style={tw`w-11 h-11 rounded-full`}
          />
        </View>
        <Text
          style={tw`mb-1 text-base font-bold text-slate-600 dark:text-slate-400`}
        >
          6 months ago
        </Text>
      </View>
    </View>
  );
};

export default FollowCard;
