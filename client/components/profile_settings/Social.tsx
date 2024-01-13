const socialmedia = [
  {
    name: "Github",
    label: "github",
    placeholder: "https://www.github.com/username",
  },
  {
    name: "Twitter",
    label: "twitter",
    placeholder: "https://www.twitter.com/username",
  },
  {
    name: "Youtube",
    label: "youtube",
    placeholder: "https://www.youtube.com/@username",
  },
  {
    name: "Website",
    label: "website",
    placeholder: "https://example.com",
  },
  {
    name: "Facebook",
    label: "facebook",
    placeholder: "https://www.facebook.com/username",
  },
  {
    name: "Instagram",
    label: "instagram",
    placeholder: "https://instagram.com/username",
  },
  {
    name: "Stackoverflow",
    label: "stackoverflow",
    placeholder: "https://stackoverflow.com/username",
  },
  {
    name: "Linkedin",
    label: "linkedin",
    placeholder: "https://linkedin.com/in/username",
  },
] as const;

import { View } from "lucide-react-native";
import { Pressable, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Props } from "../../app/(settings)/profile";
import { colors } from "../../constants/Colors";
import tw from "../../lib/tailwind";
import Icons from "../Icons";
const Social = ({
  setActive,
  socialInputHandles,
  userData,
  themeValue,
  active,
}: Props) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setActive((prev) => (prev === "SOCIAL" ? null : "SOCIAL"));
        }}
        style={tw`border-b border-slate-300 dark:border-slate-600 p-4 flex-row items-center justify-between`}
      >
        <Text style={tw`text-slate-800 font-bold text-xl dark:text-slate-200`}>
          Social
        </Text>
        {active !== "SOCIAL" ? (
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

      {active === "SOCIAL" && (
        <View style={tw`p-4`}>
          {socialmedia.map((social) => (
            <View key={social.label} style={tw`my-3`}>
              <Text
                style={tw`text-slate-800 dark:text-slate-200 text-sm font-bold`}
              >
                {social.name}
              </Text>
              <TextInput
                style={tw`border border-slate-300 dark:border-slate-600 rounded-lg text-base text-slate-900 dark:text-slate-100 px-4 py-2 mt-2`}
                value={userData?.social[social.label]}
                placeholder={social.placeholder}
                onChangeText={(content) => {
                  socialInputHandles!(social.label, content);
                }}
                placeholderTextColor={
                  themeValue === "dark"
                    ? colors.slate["400"]
                    : colors.slate["500"]
                }
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default Social;
