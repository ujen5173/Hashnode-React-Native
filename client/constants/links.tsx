import {
  Bell,
  Clock,
  FileEdit,
  HelpCircle,
  History,
  Newspaper,
  PanelsTopLeft,
  Settings,
  UsersRound,
} from "lucide-react-native";
import tw from "../lib/tailwind";

enum FeedType {
  MyFeed = "My Feed",
  Following = "Following",
  Recent = "Recent",
}

export const feedLinks = [
  {
    label: "My Feed",
    icon: (feedType: FeedType) => (
      <Newspaper
        size={20}
        style={tw`${feedType === FeedType.MyFeed
          ? "text-blue-600"
          : "text-slate-500 dark:text-slate-400"
          }`}
      />
    ),
    type: FeedType.MyFeed,
  },
  {
    label: "Following",
    icon: (feedType: FeedType) => (
      <UsersRound
        size={20}
        style={tw`${feedType === FeedType.Following
          ? "text-blue-600"
          : "text-slate-500 dark:text-slate-400"
          }`}
      />
    ),
    type: FeedType.Following,
  },
  {
    label: "Recent",
    icon: (feedType: FeedType) => (
      <Clock
        size={20}
        style={tw`${feedType === FeedType.Recent
          ? "text-blue-600"
          : "text-slate-500 dark:text-slate-400"
          }`}
      />
    ),
    type: FeedType.Recent,
  },
];

export const profileLinks = {
  section1: [
    {
      icon: (
        <PanelsTopLeft style={tw`text-gray-600 dark:text-gray-300`} size={20} />
      ),
      label: "My blogs",
      isSwitch: false,
    },
    {
      icon: <FileEdit style={tw`text-gray-600 dark:text-gray-300`} size={20} />,
      label: "My drafts",
      isSwitch: false,
    },
    {
      icon: <History style={tw`text-gray-600 dark:text-gray-300`} size={20} />,
      label: "My reading history",
      isSwitch: false,
    },
  ],
  section2: [
    {
      icon: (
        <PanelsTopLeft style={tw`text-gray-600 dark:text-gray-300`} size={20} />
      ),
      label: "My profile",
      isSwitch: false,
    },
    {
      icon: <Settings style={tw`text-gray-600 dark:text-gray-300`} size={20} />,
      label: "Settings",
      isSwitch: false,
    },
    {
      icon: <Bell style={tw`text-gray-600 dark:text-gray-300`} size={20} />,
      label: "Notifications",
      isSwitch: false,
    },
  ],
  section3: [
    {
      icon: (
        <PanelsTopLeft style={tw`text-gray-600 dark:text-gray-300`} size={20} />
      ),
      label: "Dark Mode",
      isSwitch: true,
    },
    {
      icon: (
        <HelpCircle style={tw`text-gray-600 dark:text-gray-300`} size={20} />
      ),
      label: "Support",
      isSwitch: false,
    },
  ],
};
