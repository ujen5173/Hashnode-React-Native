import { View } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Props } from "../../app/(settings)/profile";
import { colors } from "../../constants/Colors";
import tw from "../../lib/tailwind";
import Icons from "../Icons";
const AboutYou = ({
  setActive,
  userData,
  setUserData,
  themeValue,
  active,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "ABOUT_YOU" ? null : "ABOUT_YOU"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          About you
        </Text>
        {active !== "ABOUT_YOU" ? (
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

      {active === "ABOUT_YOU" && (
        <View style={tw`p-4`}>
          <View style={tw`my-3`}>
            <Text
              style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
            >
              Bio
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              placeholder="Tell us about yourself"
              value={userData?.bio}
              onChangeText={(content) => {
                setUserData({ ...userData, bio: content });
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
              Available for
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              multiline
              placeholder="I am available for..."
              value={userData?.available}
              onChangeText={(content) => {
                setUserData({ ...userData, available: content });
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
              Skills
            </Text>
            <TextInput
              style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
              placeholder="React, Node, TypeScript"
              value={userData?.skills}
              onChangeText={(content) => {
                setUserData({ ...userData, skills: content });
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

export default AboutYou;
