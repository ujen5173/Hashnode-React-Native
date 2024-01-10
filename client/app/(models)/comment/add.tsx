import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Pressable, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { serverEndPoint } from "../../../constants/url";
import { C } from "../../../contexts/RootContext";
import fetchData from "../../../helpers/fetchData";
import tw from "../../../lib/tailwind";

const AddComment = () => {
  const { user, themeValue } = useContext(C);
  const { title, slug } = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [commentContent, setCommentContent] = useState("");
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
      headerStyle: tw`bg-white dark:bg-slate-900`,
      headerTitleStyle: tw`text-slate-900 dark:text-slate-100`,
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            router.back();
          }}
          style={tw`mr-2`}
        >
          <Icons.times
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleComment = async () => {
    try {
      if (!commentContent) return;

      const url = `${serverEndPoint}/api/v1/comment/${slug}?userId=${user?._id}`;

      const res = await fetchData(url, {
        method: "POST",
        data: {
          content: commentContent,
          type: "COMMENT",
          parent: null,
        },
      });

      if (res.success) {
        // TODO: show data immediately without refreshing in comments page
        router.back();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={tw`p-4 flex-1 bg-white dark:bg-slate-900`}>
      <Text
        style={tw`text-xl font-bold mb-2 text-slate-600 dark:text-slate-100`}
      >
        {title}
      </Text>

      <TextInput
        numberOfLines={10}
        multiline
        value={commentContent}
        onChangeText={setCommentContent}
        maxLength={255}
        ref={textareaRef}
        placeholder="Share your thoughts..."
        placeholderTextColor={
          themeValue === "dark" ? colors.slate["300"] : colors.slate["600"]
        }
        style={[
          tw`border border-slate-300 text-lg mb-4 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg text-slate-900 dark:text-slate-100`,
          { textAlignVertical: "top" },
        ]}
      />

      <View style={tw``}>
        <Pressable
          onPress={handleComment}
          style={tw`w-full flex-row items-center gap-2 justify-center border border-blue-600 px-4 py-2 rounded-full`}
        >
          <Text style={tw`text-lg font-bold text-blue-600`}>Post</Text>
          <Icons.send stroke={colors.blue["600"]} fill="none" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default AddComment;
