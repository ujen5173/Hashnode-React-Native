import { Filter } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { FeedType } from "../app/(tabs)";
import { feedLinks } from "../constants/links";
import tw from "../lib/tailwind";

const SemiHeader = ({
  feedType,
  setFeedType,
  handlePresentModalPress,
}: {
  feedType: FeedType;
  setFeedType: React.Dispatch<React.SetStateAction<FeedType>>;
  handlePresentModalPress: () => void;
}) => {
  return (
    <View
      style={tw`border-t border-b bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 flex-row`}
    >
      <ScrollView horizontal>
        {feedLinks.map((item, index) => (
          <Pressable
            key={index}
            style={tw`flex-row flex-1 gap-2 items-center px-2 mx-1 border-b-[3px] ${
              feedType === item.type ? "border-blue-600" : "border-transparent"
            } py-4`}
            onPress={() => {
              setFeedType(item.type);
            }}
          >
            {item.icon(feedType)}
            <Text
              style={tw`${
                feedType === item.type
                  ? "text-blue-600"
                  : "text-slate-500 dark:text-slate-400"
              } text-sm`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={handlePresentModalPress}
        style={tw`px-4 border-l flex-row items-center border-slate-300 dark:border-slate-600`}
      >
        <Filter size={20} style={tw`text-slate-500 dark:text-slate-200`} />
      </Pressable>
    </View>
  );
};

export default SemiHeader;
