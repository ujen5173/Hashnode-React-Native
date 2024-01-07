import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Facebook,
  Flag,
  Github,
  Globe,
  Instagram,
  Layers,
  Linkedin,
  MapPin,
  MoreVertical,
  Pencil,
  Twitter,
  X,
  Youtube,
} from "lucide-react-native";
import React, {
  FC,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import UserProfileLoading from "../../components/UserProfileLoading";
import BasicInfo from "../../components/userProfile/BasicInfo";
import { colors } from "../../constants/Colors";
import { serverEndPoint } from "../../constants/url";
import { C } from "../../contexts/RootContext";
import fetchData from "../../helpers/fetch";
import tw from "../../lib/tailwind";

type User = {
  _id: string;
  name: string;
  username: string;
  location: string;
  available: string;
  email: string;
  image: string;
  bio: string;
  tagline: string;
  followerCount: number;
  followingCount: number;
  createdAt: string;
  skills: string[];
  social: {
    twitter: string;
    github: string;
    website: string;
    linkedin: string;
    stackoverflow: string;
    youtube: string;
    facebook: string;
    instagram: string;
  };
};
export interface Activity {
  _id: string;
  title: string;
  slug: string;
  activity_type: "ARTICLE" | "JOINED";
  createdAt: Date | undefined;
}

const UserProfile = () => {
  const { username } = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useContext(C);

  const url = `${serverEndPoint}/api/v1/users/username/${username}`;
  const recent_activities_url = `${serverEndPoint}/api/v1/users/articles/recent_activities/${username}`;

  const { data, isFetching, error } = useQuery({
    queryKey: ["single_user"],
    queryFn: async () => await fetchData<User>(url),
  });
  const { data: recent_data } = useQuery({
    queryKey: ["user_recent_activities"],
    queryFn: async () =>
      await fetchData<[string, Activity[]][]>(recent_activities_url),
  });

  console.log({ recent_data: JSON.stringify(recent_data, null, 2) });

  if (!user) {
    router.push("/(models)/onboard");
    return null;
  }

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: tw`bg-slate-100 dark:bg-slate-900`,
      headerLeft: () => (
        <View style={tw`flex-row gap-2`}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`rounded-full p-2`}
          >
            <ArrowLeft
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <View style={tw``}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={tw`p-2 rounded-full`}
            onPress={() => {
              handlePresentModalPress();
            }}
          >
            <MoreVertical
              size={20}
              style={tw`text-slate-700 dark:text-slate-200`}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [username]);

  const socials: { [key: string]: JSX.Element } = {
    twitter: <Twitter size={18} style={tw`text-black dark:text-white`} />,
    github: <Github size={18} style={tw`text-black dark:text-white`} />,
    website: <Globe size={18} style={tw`text-black dark:text-white`} />,
    linkedin: <Linkedin size={18} style={tw`text-black dark:text-white`} />,
    stackoverflow: <Layers size={18} style={tw`text-black dark:text-white`} />,
    youtube: <Youtube size={18} style={tw`text-black dark:text-white`} />,
    facebook: <Facebook size={18} style={tw`text-black dark:text-white`} />,
    instagram: <Instagram size={18} style={tw`text-black dark:text-white`} />,
  };

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
    return <UserProfileLoading />;
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView style={tw`flex-1 p-4 bg-slate-100 dark:bg-slate-900`}>
        <BasicInfo
          data={{
            name: data?.data?.name,
            tagline: data?.data?.tagline,
            image: data?.data?.image,
            followerCount: data?.data?.followerCount,
            followingCount: data?.data?.followingCount,
          }}
        />
        <View
          style={tw`border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg my-4`}
        >
          <View style={tw`flex-row items-center gap-2 mb-3`}>
            <MapPin size={18} style={tw`text-slate-700 dark:text-slate-400`} />
            <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
              {data?.data?.location}
            </Text>
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <Calendar
              size={18}
              style={tw`text-slate-700 dark:text-slate-400`}
            />
            <Text style={tw`text-base text-slate-700 dark:text-slate-400`}>
              Member since{" "}
              {data?.data?.createdAt &&
                format(new Date(data?.data?.createdAt!), "MM, yyyy")}
            </Text>
          </View>
        </View>

        <View style={tw`my-4`}>
          {/* socials */}
          <Text
            style={tw`text-slate-800 dark:text-slate-200 text-xl mb-4 font-bold`}
          >
            My socials
          </Text>
          <View style={tw`flex-row gap-2 justify-center flex-wrap`}>
            {data?.data?.social &&
              Object.entries(data?.data?.social).map(([key, value]) => {
                if (!value) return null;
                return (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      Linking.openURL(value);
                    }}
                    key={key}
                    style={tw`rounded-full p-3 border border-slate-300 dark:border-slate-600`}
                  >
                    {socials[key]}
                  </TouchableOpacity>
                );
              })}
          </View>

          {/* blogging area */}
          <View style={tw`my-4`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-xl mb-4 font-bold`}
            >
              Writes at
            </Text>

            <Pressable
              onPress={() => {
                router.push(`/dev/${data?.data?._id}`);
              }}
              style={tw`border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 p-3 rounded-lg`}
            >
              <View style={tw`flex-row gap-4 items-center`}>
                <Image
                  style={tw`w-12 h-12 rounded-lg`}
                  source={{
                    uri: "https://unsplash.it/200/200",
                  }}
                  resizeMode="cover"
                />
                <View style={tw`flex-1 items-start`}>
                  <Text
                    style={tw`text-slate-800 dark:text-slate-100 mb-1 text-base`}
                  >
                    Hack, Stack and Roll
                  </Text>
                  <View style={tw`flex-row gap-2`}>
                    <Text style={tw`text-slate-700 flex-1 dark:text-slate-400`}>
                      hashnode-t3.vercel.app
                    </Text>
                    <ChevronRight
                      size={18}
                      style={tw`text-slate-500 dark:text-slate-400`}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          </View>

          {/* about me */}
          <View style={tw`my-4`}>
            <Text
              style={tw`text-lg font-bold text-slate-800 dark:text-slate-100 mb-4`}
            >
              About me
            </Text>
            <Text style={tw`text-base text-slate-700 dark:text-slate-300`}>
              {data?.data?.bio} {data?.data?.bio} {data?.data?.bio}{" "}
              {data?.data?.bio}{" "}
            </Text>
          </View>

          {/* tech stack */}
          <View style={tw`my-4`}>
            <Text
              style={tw`text-lg font-bold text-slate-800 dark:text-slate-100 mb-4`}
            >
              My tech stack
            </Text>
            <View style={tw`flex-row gap-2 flex-wrap`}>
              {data?.data?.skills.map((lang) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  key={lang}
                  style={tw`border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-800 py-2 px-4 rounded-full`}
                >
                  <Text
                    style={tw`text-sm text-slate-900 dark:text-white font-medium`}
                  >
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        {/* Recent activities: */}
        <View style={tw`my-4`}>
          <Text
            style={tw`text-lg font-bold text-slate-800 dark:text-slate-100 mb-4`}
          >
            Recent Activities
          </Text>
          {recent_data?.data?.map(([date, activitiesArray], index) => (
            <View style={tw`flex-row gap-2`} key={index}>
              <View style={styles.activity_date}>
                <Text style={tw`text-center text-xs text-white`}>{date}</Text>
                {activitiesArray[0]?.activity_type !== "JOINED" && (
                  <View style={styles.activity_date_dots}></View>
                )}
              </View>

              <View style={tw`flex flex-1 flex-col justify-center`}>
                {activitiesArray.map((item) => {
                  return (
                    <ActivityCard
                      index={index}
                      item={item}
                      key={item._id}
                      activityLength={(recent_data?.data ?? []).length}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        backgroundStyle={tw`bg-slate-100 dark:bg-slate-800`}
        handleIndicatorStyle={tw`bg-slate-600 dark:bg-slate-400`}
      >
        <BottomSheet handlePresentModalClose={handlePresentModalClose} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default UserProfile;

const BottomSheet = ({
  handlePresentModalClose,
}: {
  handlePresentModalClose: () => void;
}) => {
  return (
    <View style={tw`flex-1 bg-slate-100 dark:bg-slate-800 p-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-slate-900 dark:text-white text-xl font-bold`}>
          More Options
        </Text>
        <Pressable onPress={handlePresentModalClose}>
          <X size={30} style={tw`text-slate-700 dark:text-slate-200`} />
        </Pressable>
      </View>

      <View style={tw`py-2`}>
        <View style={tw`px-3 py-5 flex-row gap-4 items-center`}>
          <Flag size={22} style={tw`text-slate-700 dark:text-slate-200`} />
          <Text style={tw`text-slate-700 dark:text-slate-200 text-lg`}>
            Report this profile
          </Text>
        </View>
      </View>
    </View>
  );
};

interface Props {
  index: number;
  item: Activity;
  activityLength: number;
}
const ActivityCard: FC<Props> = ({ index, item, activityLength }) => {
  return (
    <View
      style={tw`${
        index === activityLength - 1 ? "" : "border-b"
      } border-slate-300 dark:border-slate-600 py-4 px-2`}
    >
      <View style={tw`mb-2 flex-row items-center gap-2`}>
        {item.activity_type === "JOINED" ? (
          // <LogonoText style="h-4 w-4 fill-secondary" />
          <Text>H</Text>
        ) : (
          <Pencil style={tw`text-slate-600 dark:text-slate-300`} size={16} />
        )}
        <Text style={tw` text-white`}>
          {item.activity_type === "JOINED"
            ? "Joined Hashnode"
            : "Wrote an article"}
        </Text>
      </View>

      {item.activity_type !== "JOINED" && (
        <Link
          href={{
            pathname: `/articles/[slug]`,
            params: {
              slug: item.slug,
            },
          }}
          style={tw`mb-2`}
        >
          <Text
            style={tw`text-base font-bold text-slate-800 dark:text-slate-100`}
          >
            {item.title}
          </Text>
        </Link>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activity_date: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 14,
    lineHeight: 20,
    flexDirection: "column",
    display: "flex",
    width: 58,
    color: "rgb(226 232 240 / 1)",
  },
  activity_date_dots: {
    marginTop: 8,
    width: 1,
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.blue["600"],
  },
});
