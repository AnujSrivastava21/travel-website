export const destinationThemes = {
  jodhpur: {
    primary: "#2563EB",
    background: "#EFF6FF",
    surface: "#FFFFFF",
    accent: "#DBEAFE",
    text: "#1E3A8A",
  },
  jaipur: {
    primary: "#DB2777",
    background: "#FFF1F5",
    surface: "#FFFFFF",
    accent: "#FCE7F3",
    text: "#831843",
  },
  udaipur: {
    primary: "#0D9488",
    background: "#F0FDFA",
    surface: "#FFFFFF",
    accent: "#CCFBF1",
    text: "#134E4A",
  },
  bikaner: {
    primary: "#EA580C",
    background: "#FFF7ED",
    surface: "#FFFFFF",
    accent: "#FFEDD5",
    text: "#7C2D12",
  },
} as const;

export type DestinationSlug = keyof typeof destinationThemes;

export function getDestinationTheme(city?: string) {
  const slug = city?.toLowerCase().trim() ?? "";

  return (
    destinationThemes[slug as DestinationSlug] ?? {
      primary: "#1E4F8F",
      background: "#F4EFE4",
      surface: "#FFFFFF",
      accent: "#E8EEF7",
      text: "#14213D",
    }
  );
}