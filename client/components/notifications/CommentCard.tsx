import React, { FC } from "react";
import { Image, Text, View } from "react-native";
import { Notification } from "../../app/notifications";
import tw from "../../lib/tailwind";

type CommentCardProps = {
  card: Notification;
};

const CommentCard: FC<CommentCardProps> = ({ card }) => {
  return (
    <View
      style={tw`p-4 border-b border-slate-300 dark:border-slate-600 flex-row gap-4`}
    >
      <View>
        <Image
          source={{ uri: card?.from?.image! }}
          style={tw`w-11 h-11 rounded-full`}
        />
      </View>

      <View style={tw`flex-1`}>
        <Text style={tw`mb-1 text-lg text-slate-800 dark:text-slate-100`}>
          {card.body}
        </Text>
        <View
          style={tw`mb-1 bg-slate-300 dark:bg-slate-800 px-3 py-2 rounded-md`}
        >
          <Text style={tw`text-base text-slate-800 dark:text-slate-200`}>
            {card.title}
          </Text>
        </View>
        <Text style={tw`mb-1 text-xl font-bold text-blue-600`}>
          {card.title}
        </Text>
        <Text
          style={tw`text-base font-bold text-slate-600 dark:text-slate-400`}
        >
          6 months ago
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;
