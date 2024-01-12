import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Pressable, Text, View } from "react-native";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CommentCard from "../../../components/CommentCard";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { serverEndPoint } from "../../../constants/url";
import { C } from "../../../contexts/RootContext";
import useFetch from "../../../hooks/useFetch";
import tw from "../../../lib/tailwind";

type Comment = {
  _id: string;
  user: {
    name: string;
    username: string;
    tagline: string;
    image: string;
  };
  content: string;
  createdAt: string;
  likes: string[];
  type: "COMMENT" | "REPLY";
  children: Comment[];
  parent: string;
  likesCount: number;
};

const Comment = () => {
  const { title, slug } = useLocalSearchParams();
  const router = useRouter();
  const { themeValue } = useContext(C);

  const { data, refetch, isRefetching, error } = useFetch<Comment[]>({
    queryName: "comment",
    url: `${serverEndPoint}/api/v1/comment/${slug}`,
    requireAuth: true,
    enabled: true,
  });

  const navigation = useNavigation();

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
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "55%"], []);

  // callbacks
  const handlePresentModalPress = useCallback((commentId: string) => {
    console.log({ commentId });
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <View style={tw`flex-1 p-4 bg-white dark:bg-slate-900`}>
        <Text
          style={tw`text-xl font-bold mb-2 text-slate-600 dark:text-slate-100`}
        >
          {title}
        </Text>

        <FlatList
          data={data?.data}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <CommentCard
              handlePresentModalPress={handlePresentModalPress}
              comment={item}
              parentId={item._id}
              slug={slug}
            />
          )}
          keyExtractor={(item) => item._id}
        />

        {/* Footer */}
        <View style={tw`border-t border-slate-300 dark:border-slate-600 pt-4`}>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/(models)/comment/add",
                params: { title, slug, type: "COMMENT" },
              });
            }}
          >
            <View
              style={tw`border border-slate-300 dark:border-slate-600 rounded-full flex-row gap-2 items-center bg-slate-100 dark:bg-slate-800 px-4 py-3`}
            >
              <Icons.singleComment
                size={20}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
              <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
                Write a comment
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        style={tw`border border-slate-300 dark:border-slate-600 rounded-t-xl shadow-lg`}
        snapPoints={snapPoints}
        keyboardBehavior="fillParent"
        topInset={50}
        backdropComponent={renderBackdrop}
        backgroundStyle={tw`bg-slate-100 dark:bg-slate-800`}
        handleIndicatorStyle={tw`bg-slate-600 dark:bg-slate-400`}
      >
        <View style={tw`flex-1 bg-slate-100 dark:bg-slate-800 p-4`}>
          <View style={tw`flex-row justify-between items-center`}>
            <Text
              style={tw`text-slate-900 dark:text-slate-700 dark:text-slate-100 text-xl font-bold`}
            >
              More Options
            </Text>
            <Pressable onPress={handlePresentModalClose}>
              <Icons.times
                size={16}
                stroke="none"
                fill={
                  themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
            </Pressable>
          </View>

          <View style={tw`py-2`}>
            <View style={tw`px-3 py-5 flex-row gap-4 items-center`}>
              <Icons.report
                size={16}
                stroke="none"
                fill={
                  themeValue === "dark"
                    ? colors.slate["100"]
                    : colors.slate["600"]
                }
              />
              <Text style={tw`text-slate-700 dark:text-slate-200 text-lg`}>
                Report this comment
              </Text>
            </View>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default Comment;
