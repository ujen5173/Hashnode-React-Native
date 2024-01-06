import { Search } from "lucide-react-native";
import React, { useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "../../constants/Colors";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";

enum Type {
  Top = "Top",
  Latest = "Latest",
  Tags = "Tags",
  People = "People",
  Blogs = "Blogs",
}

const SearchPage = () => {
  const { themeValue } = useContext(C);
  const [type, setType] = React.useState<Type>(Type.Top);

  return (
    <View style={tw`bg-slate-100 px-2 dark:bg-slate-900 flex-1`}>
      <View style={tw`py-4`}>
        <View
          style={tw`px-3 rounded-full border border-slate-200 dark:border-slate-500 mb-2 bg-slate-200 dark:bg-slate-900 flex-row items-center gap-2`}
        >
          <Search style={tw`text-slate-500 dark:text-slate-400`} size={20} />
          <TextInput
            placeholderTextColor={
              themeValue === "dark" ? colors.slate["500"] : colors.slate["500"]
            }
            style={tw`flex-1 py-3 font-semibold text-base`}
            placeholder="Search for tags, people, and article"
          />
        </View>

        <ScrollView>
          <ScrollView
            horizontal
            style={tw`border-b border-slate-200 dark:border-slate-500`}
          >
            {["Top", "Latest", "Tags", "People", "Blogs"].map((item, index) => (
              <Pressable
                onPress={() => setType(item as Type)}
                key={index}
                style={tw`mx-1 border-b-2 ${
                  type === item ? "border-blue-600" : "border-transparent"
                } px-3 py-3`}
              >
                <Text
                  style={tw`text-lg font-semibold ${
                    type === item
                      ? "text-blue-600"
                      : "text-slate-500 dark:text-slate-200"
                  } font-semibold`}
                >
                  {item}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
          <StartTyping />
        </ScrollView>
      </View>
    </View>
  );
};

export default SearchPage;

export const StartTyping = () => {
  return (
    <View style={tw`flex-1 py-10`}>
      <Text
        style={tw`text-center text-slate-500 dark:text-slate-400 font-semibold text-xl`}
      >
        Start typing to search...
      </Text>

      <Image source={require("../../assets/illustrations/search.png")} />
    </View>
  );
};
