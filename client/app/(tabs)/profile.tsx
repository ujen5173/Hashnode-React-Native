import { ChevronRight } from "lucide-react-native";
import React, { useContext, useState } from "react";
import { Image, Switch, Text, View } from "react-native";
import { colors } from "../../constants/Colors";
import { profileLinks } from "../../constants/links";
import { C } from "../../contexts/RootContext";
import tw from "../../lib/tailwind";

const defaultUser = {
  _id: "5f9b2a3b9d3e4a0017b6d5a0",
  username: "ujenbasi",
  name: "ujenbasi",
  email: "test@example.com",
  createdAt: "2020-10-30T16:55:31.000Z",
  updatedAt: "2020-10-30T16:55:31.000Z",
  image:
    "https://yt3.ggpht.com/yti/AGOGRCoQIypIJe7Vc0UZ34foTsWUDuYU9gdg2TPVYA=s88-c-k-c0x00ffffff-no-rj",
} as const;

const Profile = () => {
  const { themeValue, user, setTheme } = useContext(C);

  const [isEnabled, setIsEnabled] = useState(
    themeValue === "dark" ? true : false
  );
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setTheme(isEnabled ? "light" : "dark");
  };

  return (
    <View style={tw`bg-slate-200 dark:bg-slate-800 flex-1 p-4`}>
      <View style={tw`items-center flex-row gap-4 mb-2`}>
        <Image
          source={{ uri: user?.image }}
          style={tw`w-16 h-16 rounded-full`}
        />
        <View>
          <Text
            style={tw`text-xl text-slate-800 dark:text-slate-200 font-bold`}
          >
            {user?.name}
          </Text>
          <Text style={tw`text-base text-slate-500 dark:text-slate-400`}>
            @{user?.username}
          </Text>
        </View>
      </View>

      {Object.entries(profileLinks).map(([key, value], index) => (
        <View
          key={index}
          style={tw`p-2 bg-slate-100 dark:bg-slate-900 rounded-lg my-3`}
        >
          {value.map((link, index) => (
            <View
              key={index}
              style={tw`flex-row justify-between items-center px-2 ${
                link.isSwitch ? "pb-1" : "py-3"
              } ${
                index === value.length - 1 ? "border-0" : "border-b"
              } border-slate-300 dark:border-slate-600`}
            >
              <View style={tw`flex-row gap-2 items-center`}>
                {link.icon}
                <Text style={tw`text-base text-slate-600 dark:text-slate-300`}>
                  {link.label}
                </Text>
              </View>

              <View>
                {link.isSwitch ? (
                  <Switch
                    trackColor={{ false: "#767577", true: colors.blue["600"] }}
                    thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                ) : (
                  <ChevronRight
                    style={tw`text-gray-600 dark:text-gray-300`}
                    size={22}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Profile;
