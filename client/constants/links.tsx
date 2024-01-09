import Icons from "../components/Icons";
import { colors } from "./Colors";

enum FeedType {
  MyFeed = "My Feed",
  Following = "Following",
  Recent = "Recent",
}

export const feedLinks = [
  {
    label: "My Feed",
    icon: (
      feedType: FeedType,
      themeValue: "light" | "dark" | null | undefined
    ) => (
      <Icons.newspaper
        size={18}
        stroke="none"
        fill={
          feedType === FeedType.MyFeed
            ? colors.blue["600"]
            : themeValue === "dark"
            ? colors.slate["400"]
            : colors.slate["600"]
        }
      />
    ),
    type: FeedType.MyFeed,
  },
  {
    label: "Following",
    icon: (
      feedType: FeedType,
      themeValue: "light" | "dark" | null | undefined
    ) => (
      <Icons.users
        size={18}
        fill="none"
        stroke={
          feedType === FeedType.Following
            ? colors.blue["600"]
            : themeValue === "dark"
            ? colors.slate["400"]
            : colors.slate["600"]
        }
      />
    ),
    type: FeedType.Following,
  },
  {
    label: "Recent",
    icon: (
      feedType: FeedType,
      themeValue: "light" | "dark" | null | undefined
    ) => (
      <Icons.clock
        size={18}
        stroke="none"
        fill={
          feedType === FeedType.Recent
            ? colors.blue["600"]
            : themeValue === "dark"
            ? colors.slate["400"]
            : colors.slate["600"]
        }
      />
    ),
    type: FeedType.Recent,
  },
];

export const profileLinks = {
  section1: [
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => {
        return (
          <Icons.tabChevonDown
            size={18}
            fill={
              themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
            }
          />
        );
      },
      label: "My blogs",
      isSwitch: false,
    },
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.paperWithPen
          stroke="none"
          fill={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
          size={18}
        />
      ),
      label: "My drafts",
      isSwitch: false,
    },
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.readingHistory
          fill="none"
          stroke={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
          size={18}
        />
      ),
      label: "My reading history",
      isSwitch: false,
    },
  ],
  section2: [
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.tab
          size={18}
          stroke="none"
          fill={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      ),
      label: "My profile",
      isSwitch: false,
    },
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.settings
          size={18}
          stroke="none"
          fill={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      ),
      label: "Settings",
      isSwitch: false,
    },
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.bell
          size={18}
          stroke="none"
          fill={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      ),
      label: "Notifications",
      isSwitch: false,
    },
  ],
  section3: [
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.tab
          size={18}
          stroke="none"
          fill={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
        />
      ),
      label: "Dark Mode",
      isSwitch: true,
    },
    {
      icon: (themeValue: "light" | "dark" | null | undefined) => (
        <Icons.help
          fill="none"
          stroke={
            themeValue === "dark" ? colors.slate["400"] : colors.slate["600"]
          }
          size={18}
        />
      ),
      label: "Support",
      isSwitch: false,
    },
  ],
};
