import React, { useContext } from 'react';
import { View } from 'react-native';
import { C } from '../../contexts/RootContext';
import tw from '../../lib/tailwind';

const Profile = () => {
  const { user } = useContext(C);
  console.log({ user });
  return (
    <View style={tw`bg-slate-200 dark:bg-slate-800 flex-1 p-6`}>
    </View>
  )
}

export default Profile;