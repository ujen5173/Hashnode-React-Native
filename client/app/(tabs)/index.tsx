import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Card from "../../components/Card";
import CardLoading from "../../components/CardLoading";
import BottomSheetBody from "../../components/FilterModal/BottomSheetBody";
import SemiHeader from "../../components/SemiHeader";
import { serverEndPoint } from "../../constants/url";
import useBookmark from "../../hooks/useBookmark";
import useFetch from "../../hooks/useFetch";
import tw from "../../lib/tailwind";

export type Article = {
  _id: string;
  title: string;
  subtitle: string;
  likes: { _id: string }[];
  tags: string[];
  content: string;
  cover_image: string;
  cover_image_key: string;
  slug: string;
  read_time: number;
  disabledComments: boolean;
  likesCount: number;
  commentsCount: number;
  readCount: number;
  createdAt: string;
  series: {
    title: string;
    slug: string;
  };
  user: {
    _id: string;
    name: string;
    username: string;
    image: string;
  };
};

export type Tag = {
  _id: string;
  name: string;
  slug: string;
};

export enum FeedType {
  MyFeed = "My Feed",
  Following = "Following",
  Recent = "Recent",
}

const HomePage = () => {
  const [feedType, setFeedType] = useState<FeedType>(FeedType.MyFeed);
  const [filters, setFilters] = useState<{
    tags: string[];
    readTime: number | null;
  }>({
    tags: [],
    readTime: null,
  });

  const url = `${serverEndPoint}/api/v1/articles?type=${feedType
    .toLowerCase()
    .replace(" ", "-")}`;

  const { data, isFetching, refetch } = useFetch<Article[]>({
    queryName: ["articles", feedType],
    url: url,
    requireAuth: true,
    enabled: false,
    options: {
      data: filters,
    },
  });

  useEffect(() => {
    console.log("useEffect called!");
    refetch();
  }, [feedType, filters]);

  const bookmarks = useBookmark();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["15%", "55%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
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
    <>
      <View style={tw`bg-white dark:bg-slate-900 flex-1`}>
        <SemiHeader
          handlePresentModalPress={handlePresentModalPress}
          feedType={feedType}
          setFeedType={setFeedType}
        />
        {isFetching ? (
          <View>
            {Array(7)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  style={tw`${
                    index === 2 ? "border-0" : "border-b"
                  } border-slate-300 dark:border-slate-600`}
                >
                  <CardLoading />
                </View>
              ))}
          </View>
        ) : (
          <FlatList
            data={data?.data}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={tw`${
                  index === (data?.data ?? []).length - 1
                    ? "border-0"
                    : "border-b"
                } border-slate-300 dark:border-slate-600`}
              >
                <Card bookmarks={bookmarks} article={item} />
              </View>
            )}
          />
        )}
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
        <BottomSheetBody ref={bottomSheetModalRef} />
      </BottomSheetModal>
    </>
  );
};

export default HomePage;
