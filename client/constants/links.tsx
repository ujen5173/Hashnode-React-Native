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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/wrapper",
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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/profile",
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
      isLink: true,
      link: "settings/profile",
    },
  ],
};

export const socialmedia = [
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
