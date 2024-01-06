import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Send, X } from "lucide-react-native";
import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../constants/Colors";
import { C } from "../../../contexts/RootContext";
import tw from "../../../lib/tailwind";

const AddComment = () => {
  const { themeValue } = useContext(C);
  const { title } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const textareaRef = useRef<TextInput>(null);

  useEffect(() => {
    const tmout = setTimeout(() => {
      textareaRef.current?.focus();
    }, 500);

    return () => {
      tmout && clearTimeout(tmout);
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
      headerTitleStyle: tw`text-slate-900 dark:text-slate-100`,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={tw`mr-2`}
        >
          <X style={tw`text-slate-900 dark:text-slate-100`} size={22} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={tw`p-4 flex-1 bg-slate-100 dark:bg-slate-900`}>
      <Text style={tw`text-xl mb-2 text-slate-600 dark:text-slate-100`}>
        {title}
      </Text>

      <TextInput
        numberOfLines={10}
        multiline
        ref={textareaRef}
        placeholder="Share your thoughts..."
        onChange={(e) => {}}
        placeholderTextColor={
          themeValue === "dark" ? colors.slate["300"] : colors.slate["600"]
        }
        style={[
          tw`border border-slate-300 text-lg mb-4 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg`,
          { textAlignVertical: "top" },
        ]}
      />

      <View style={tw``}>
        <TouchableOpacity
          activeOpacity={0.9}
          style={tw`w-full flex-row items-center gap-2 justify-center border border-blue-600 px-4 py-2 rounded-full`}
        >
          <Text style={tw`text-lg font-bold text-blue-600`}>Post</Text>
          <Send style={tw`text-blue-600`} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddComment;
