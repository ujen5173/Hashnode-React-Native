import { View } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Props } from "../../app/(settings)/profile";
import { colors } from "../../constants/Colors";
import tw from "../../lib/tailwind";
import Icons from "../Icons";
const BasicInfo = ({
  setActive,
  userData,
  setUserData,
  themeValue,
  active,
}: Props) => {
  return (
    <View style={tw`flex-1 w-full`}>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "BASIC_INFO" ? null : "BASIC_INFO"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          Basic Info
        </Text>
        {active !== "BASIC_INFO" ? (
          <Icons.chevonRight
            size={24}
            fill="none"
            stroke={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        ) : (
          <Icons.chevonDown
            size={18}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["100"] : colors.slate["700"]
            }
          />
        )}
      </Pressable>
      {active === "BASIC_INFO" && (
        <View style={tw`p-4`}>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Full name
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.name}
              placeholder="Enter your full name"
              onChangeText={(content) => {
                setUserData({ ...userData, name: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Profile Tagline
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.tagline}
              placeholder="Software Engineer @Google"
              onChangeText={(content) => {
                setUserData({ ...userData, tagline: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Location
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              value={userData?.location}
              placeholder="Paris, France"
              onChangeText={(content) => {
                setUserData({ ...userData, location: content });
              }}
              placeholderTextColor={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["500"]
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default BasicInfo;
