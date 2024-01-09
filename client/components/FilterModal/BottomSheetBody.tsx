import {
  BottomSheetModal,
  BottomSheetTextInput,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useQuery } from "@tanstack/react-query";
import React, { forwardRef, useContext, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";
import { Tag } from "../../app/(tabs)";
import { colors } from "../../constants/Colors";
import { serverEndPoint } from "../../constants/url";
import { C } from "../../contexts/RootContext";
import fetchData from "../../helpers/fetchData";
import tw from "../../lib/tailwind";
import Icons from "../Icons";
import InputComponent from "./InputComponent";
import ReadingComponent from "./ReadingComponent";

const BottomSheetBody = forwardRef<BottomSheetModal>((props, ref) => {
  const [searchState, setSearchState] = useState(false);
  const { themeValue } = useContext(C);
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const { dismiss } = useBottomSheetModal();

  const [options, setOptions] = useState([
    {
      label: "< 5 mins",
      value: "LESS_THAN_5",
      checked: false,
    },
    {
      label: "5 - 10 mins",
      value: "5_TO_10",
      checked: false,
    },
    {
      label: "> 10 mins",
      value: "MORE_THAN_10",
      checked: false,
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useQuery({
    queryKey: ["tags_search"],
    queryFn: async () =>
      await fetchData<Tag[]>(`${serverEndPoint}/api/v1/tags?q=${value}`),
    enabled: true,
  });

  async function search(criteria: string): Promise<Tag[]> {
    let response;
    if (criteria.trim().length > 0) {
      setIsLoading(true);
      response = await refetch();
      const newData = (response.data as Tag[] | undefined)?.filter(
        (tag) => !tags.includes(tag)
      );
      setIsLoading(false);
      return newData ?? [];
    }

    setIsLoading(false);
    return [];
  }

  const debounced = useDebouncedCallback(async (value: string) => {
    const debounceResponse = await search(value);
    setTags(debounceResponse);
  }, 250);

  const readingChange = (index: number) => {
    const newOptions = options.map((val, i) => ({
      ...val,
      checked: i === index,
    }));
    setOptions(newOptions);
  };
  const selectTag = () => {
    setSearchState(false);

    //? 👇 so that the animation will start after the mobile keyboard has been dismissed!
    setTimeout(() => {
      // @ts-ignore
      ref?.current?.snapToPosition("55%");
    }, 200);
    // @ts-ignore
    inputRef?.current?.blur();
    setValue("");
  };

  const onClose = () => {
    setValue("");
    if (searchState) {
      setSearchState(false);

      //? 👇 so that the animation will start after the mobile keyboard has been dismissed!
      setTimeout(() => {
        // @ts-ignore
        ref?.current?.snapToPosition("55%");
      }, 200);
      // @ts-ignore
      inputRef?.current?.blur();
    } else {
      void dismiss();
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-slate-100 dark:bg-slate-800`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-slate-900 dark:text-white text-xl font-bold`}>
          Filters
        </Text>
        <Pressable onPress={onClose}>
          <Icons.times
            size={20}
            stroke="none"
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        </Pressable>
      </View>

      <View style={tw`py-2`}>
        <View>
          <Text
            style={tw`text-slate-900 dark:text-white text-base mb-2 font-bold`}
          >
            Tags
          </Text>
          <View style={tw`rounded-input flex-row gap-2 items-center w-full`}>
            <Icons.search
              size={20}
              stroke="none"
              fill={
                themeValue === "dark"
                  ? colors.slate["400"]
                  : colors.slate["600"]
              }
            />
            <BottomSheetTextInput
              ref={inputRef}
              onChangeText={(text) => setValue(text)}
              value={value}
              onFocus={() => setSearchState(true)}
              placeholderTextColor={tw.color("slate-500 dark:slate-400")}
              style={tw`bg-transparent w-full text-slate-900 dark:text-white text-base`}
              placeholder="Search tags"
              onChange={(e) => {
                if (e.nativeEvent.text.length > 0) {
                  debounced(e.nativeEvent.text as string);
                  setIsLoading(true);
                }
              }}
            />
          </View>
        </View>

        {searchState ? (
          <InputComponent
            isLoading={isLoading}
            selectTag={selectTag}
            value={value}
            tags={tags}
          />
        ) : (
          <ReadingComponent options={options} readingChange={readingChange} />
        )}
      </View>
    </View>
  );
});

export default BottomSheetBody;
