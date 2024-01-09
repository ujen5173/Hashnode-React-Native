import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Article } from "../(tabs)";
import ArticlePageLoading from "../../components/ArticlePageLoading";
import Icons from "../../components/Icons";
import { colors } from "../../constants/Colors";
import { clientEndPoint, serverEndPoint } from "../../constants/url";
import { C } from "../../contexts/RootContext";
import formatDate from "../../helpers/date";
import fetchData from "../../helpers/fetchData";
import useBookmark from "../../hooks/useBookmark";
import tw from "../../lib/tailwind";

const SingleArticle = () => {
  const { themeValue, user } = useContext(C);
  const bookmarks = useBookmark();
  const scrollY = new Animated.Value(0);
  const scrollYClamped = Animated.diffClamp(scrollY, 0, 60);
  const traslateY = scrollYClamped.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 60],
    extrapolate: "clamp",
  });

  const { slug } = useLocalSearchParams();
  const url = `${serverEndPoint}/api/v1/articles/${slug}`;

  const { data, isFetching, error } = useQuery({
    queryKey: ["single_article"],
    queryFn: async () => await fetchData<Article>(url),
  });

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "44%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalClose = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const navigation = useNavigation();

  const shareListing = async (title: string | undefined) => {
    if (!title) return;

    try {
      await Share.share({
        title,
        url: `${clientEndPoint}/articles/${slug}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-white dark:bg-slate-900`,
      headerLeft: () => (
        <View style={tw`flex-row gap-2`}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`rounded-full p-2`}
          >
            <Icons.arrowLeft
              size={20}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View style={tw`gap-2 flex-row`}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`p-2 rounded-full`}
            onPress={() => shareListing(data?.data?.title)}
          >
            <Icons.share
              size={20}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`p-2 rounded-full`}
            onPress={() => {
              handlePresentModalPress();
            }}
          >
            <Icons.moreVertical
              size={20}
              fill="none"
              stroke={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [slug]);

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

  if (isFetching) {
    return <ArticlePageLoading />;
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        onScroll={(event) => {
          scrollY.setValue(event.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}
        style={tw`bg-white dark:bg-slate-900`}
      >
        <Image
          source={{ uri: data?.data?.cover_image }}
          style={tw`w-full h-54`}
          resizeMode="cover"
        />

        <View style={tw`p-3`}>
          <Text
            style={tw`text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100 text-center`}
          >
            {data?.data?.title}
          </Text>
          <Text
            style={tw`text-xl mb-8 text-slate-600 dark:text-slate-100 text-center`}
          >
            {data?.data?.subtitle}
          </Text>

          <View
            style={tw`flex-1 flex-row mb-4 gap-8 items-center justify-center`}
          >
            <View style={tw`flex-row gap-3 items-center`}>
              <Link href={`/dev/${data?.data?.user._id}`}>
                <View>
                  <Image
                    source={{ uri: data?.data?.user?.image }}
                    style={tw`w-10 h-10 rounded-full`}
                    resizeMode="cover"
                  />
                </View>
              </Link>
              <Link href={`/dev/${data?.data?.user._id}`}>
                <Text
                  style={tw`text-lg font-bold text-slate-800 dark:text-slate-100`}
                >
                  {data?.data?.user.name}
                </Text>
              </Link>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              style={tw`bg-blue-600 py-2 px-4 rounded-full`}
            >
              <Text style={tw`text-base text-slate-100`}>Follow</Text>
            </TouchableOpacity>
          </View>

          <View style={tw`flex-row gap-2 items-center mb-12 justify-center`}>
            <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
              {formatDate(data?.data?.createdAt || new Date().toISOString())}
            </Text>
            <Text style={tw`text-sm text-slate-600 dark:text-slate-400`}>
              •
            </Text>
            <View style={tw`flex-row gap-2 items-center`}>
              <Icons.bookOpen
                size={18}
                stroke="none"
                fill={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />

              <Text style={tw`text-base text-slate-600 dark:text-slate-400`}>
                {data?.data?.read_time} min read
              </Text>
            </View>
          </View>
          <Text style={tw`text-lg text-slate-800 dark:text-slate-100 mb-8`}>
            {data?.data?.content}
          </Text>

          <View style={tw`flex-1 flex-row gap-2 flex-wrap`}>
            {data?.data?.tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.9}
                style={tw`bg-slate-300 dark:bg-slate-800 py-1 px-3 rounded-lg mb-2`}
              >
                <Text
                  style={[
                    tw`text-sm text-slate-900 dark:text-white font-medium`,
                  ]}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <Animated.View
        style={[
          tw`absolute bottom-0 left-0 bg-white border-t border-slate-300 dark:border-slate-600 dark:bg-slate-800 w-full px-4 pt-1 pb-4`,
          {
            transform: [{ translateY: traslateY }],
          },
        ]}
      >
        <View style={tw`flex-row gap-2`}>
          <Pressable style={tw`px-4 py-2 flex-1`}>
            <Icons.bulletList
              size={22}
              stroke="none"
              fill={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </Pressable>
          <Pressable
            style={tw`px-4 py-2 flex-1`}
            onPress={async () => {
              try {
                const url = `${serverEndPoint}/api/v1/articles/like/${data?.data?.slug}`;
                await fetchData(url, {
                  method: "PUT",
                  data: {
                    sessionUser: user?._id,
                  },
                });
              } catch (error) {
                console.log({ error });
              }
            }}
          >
            <Icons.heart
              size={20}
              fill={
                (data?.data?.likes ?? []).length > 0
                  ? colors.red["500"]
                  : "none"
              }
              stroke={
                (data?.data?.likes ?? []).length > 0
                  ? colors.red["500"]
                  : themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
          </Pressable>
          <Link
            href={{
              pathname: `/(models)/comment/`,
              params: {
                title: data?.data?.title || "",
                slug: data?.data?.slug || "",
              },
            }}
            asChild
          >
            <Pressable style={tw`px-4 py-2 flex-1`}>
              <Icons.singleComment
                size={22}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
            </Pressable>
          </Link>
          <Pressable style={tw`px-4 py-2 flex-1`}>
            {bookmarks.includes(data?.data?._id ?? "") ? (
              <Icons.bookmarkAdded
                size={22}
                fill={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
            ) : (
              <Icons.bookmarkAdd
                size={22}
                fill="none"
                stroke={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["600"]
                }
              />
            )}
          </Pressable>
        </View>
      </Animated.View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        style={tw`border border-slate-300 dark:border-slate-600 rounded-t-xl shadow-lg`}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={tw`bg-white dark:bg-slate-800`}
        handleIndicatorStyle={tw`bg-slate-600 dark:bg-slate-400`}
      >
        <BottomSheet
          name={data?.data?.user.name}
          handlePresentModalClose={handlePresentModalClose}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default SingleArticle;

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
