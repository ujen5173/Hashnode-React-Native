import { router, useNavigation } from "expo-router";
import React, { useContext, useLayoutEffect, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Icons from "../../../components/Icons";
import { colors } from "../../../constants/Colors";
import { serverEndPoint } from "../../../constants/url";
import { C } from "../../../contexts/RootContext";
import fetchData from "../../../helpers/fetchData";
import tw from "../../../lib/tailwind";

const Account = () => {
  const navigation = useNavigation();

  const { themeValue, user } = useContext(C);
  const [modalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile Settings",
      headerTitleStyle: tw`text-slate-800 dark:text-slate-200 font-bold text-xl`,
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
    });
  }, []);

  const [loading, setLoading] = useState(false);

  return (
    <View style={tw`flex-1 p-4 bg-white dark:bg-slate-900`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-red-500 mb-4 text-2xl font-bold`}>
          Delete Account
        </Text>
        <Text style={tw`text-slate-700 text-base dark:text-slate-200`}>
          This will permanently delete your account and all of your data on
          Hashnode Clone. This action cannot be undone.
        </Text>
      </View>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={tw`bg-red-500 rounded-full p-4`}
      >
        <Text style={tw`text-white text-center font-bold text-base`}>
          Delete Account
        </Text>
      </Pressable>
      <ModelBody
        title="Are you sure you want to delete your account?"
        loading={loading}
        accept={async () => {
          if (!user) {
            return;
          }

          setLoading(true);

          await new Promise((resolve) => setTimeout(resolve, 1000));

          const url = `${serverEndPoint}/api/v1/users/delete?userId=${user._id}`;
          const res = await fetchData(url, {
            method: "DELETE",
          });

          setLoading(false);

          if (res.success) {
            router.push({
              pathname: "/onboard",
            });
          }
        }}
        modelAcceptText="Delete Account"
        modelAcceptingText="Deleting..."
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default Account;

const ModelBody = ({
  setModalVisible,
  modalVisible,
  accept,
  loading,
  title,
  modelAcceptText,
  modelAcceptingText,
}: {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  accept: () => Promise<void>;
  loading: boolean;
  title: string;
  modelAcceptText: string;
  modelAcceptingText: string;
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View
        style={tw`bg-white dark:bg-slate-900 bg-opacity-60 flex-1 items-center justify-center`}
      >
        <View
          style={tw`bg-white w-11/12 dark:bg-slate-800 px-4 py-6 rounded-lg shadow-xl`}
        >
          <Text
            style={tw`text-xl text-center font-bold text-slate-900 dark:text-slate-100 mb-6`}
          >
            {title}
          </Text>

          <View style={tw` `}>
            <Pressable
              style={tw`${
                loading ? "bg-red-400" : "bg-red-500"
              } rounded-full mb-4 p-3 w-full`}
              onPress={async () => {
                await accept();
                setModalVisible(!modalVisible);
              }}
            >
              <Text
                style={tw`${
                  loading ? "text-slate-200" : "text-white"
                } text-center font-bold text-base`}
              >
                {loading ? modelAcceptingText : modelAcceptText}
              </Text>
            </Pressable>
            <Pressable
              style={tw`border border-slate-300 dark:border-slate-600 rounded-full p-3 w-full`}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text
                style={tw`text-center text-black dark:text-white font-bold text-base`}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
