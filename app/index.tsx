import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View, TouchableWithoutFeedback, Animated } from 'react-native';
import AuthorizedRoute from '@/components/authorizedRoute';
import { auth } from '@/src/firebase/config';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import useAuth from '@/src/hooks/useAuth';
import { useRouter } from 'expo-router';
import CaregiverHome from '@/components/caregiver/home';
import PatientHome from '@/components/patient/home';
import React from 'react';

export default function HomeScreen() {
  const { logout, isCaregiver } = useAuth();
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownOpacity = useState(new Animated.Value(0))[0];

  const toggleDropdown = () => {
    if (dropdownVisible) {
      Animated.timing(dropdownOpacity, {
        toValue: 0,
        duration: 125,
        useNativeDriver: true,
      }).start(() => setDropdownVisible(false));
    } else {
      setDropdownVisible(true);
      Animated.timing(dropdownOpacity, {
        toValue: 1,
        duration: 125,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      toggleDropdown();
    }
  };

  return (
    <AuthorizedRoute>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <SafeAreaView className="flex-1 px-5 h-full bg-slate-900">
          {auth.currentUser && (
            <>
              <View className="flex flex-row justify-between items-center">
                <Text className="text-3xl font-semibold text-white">
                  Welcome, {auth.currentUser.displayName?.split(" ")[0]}
                </Text>
                <View className="relative">
                  <TouchableOpacity onPress={toggleDropdown}>
                    <MaterialIcons name="menu" size={48} color="white" />
                  </TouchableOpacity>
                  {dropdownVisible && (
                    <Animated.View
                      style={{
                        opacity: dropdownOpacity,
                        transform: [{ scale: dropdownOpacity }],
                      }}
                      className="z-10 absolute w-40 -bottom-[90px] right-0 rounded-lg bg-slate-800 shadow-lg"
                    >
                      <TouchableOpacity 
                        className="p-4 flex flex-row justify-start items-center gap-2"
                        onPress={() => {
                          toggleDropdown();
                          router.push('/settings');
                        }}
                      >
                        <MaterialIcons name="settings" size={16} color="white" />
                        <Text className="text-white">Settings</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        className="-mt-2 p-4 flex flex-row justify-start items-center gap-2"
                        onPress={() => {
                          toggleDropdown();
                          logout();
                        }}
                      >
                        <MaterialIcons name="logout" size={16} color="white" />
                        <Text className="text-white">Logout</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  )}
                </View>
              </View>
              {isCaregiver() ? <CaregiverHome /> : <PatientHome />}
            </>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </AuthorizedRoute>
  );
}