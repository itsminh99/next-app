import { Stack } from "@mui/material";
import { Text } from "components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  openGraph: {
    title: "Home",
  },
  twitter: {
    title: "Home",
  },
};

export default function Home() {
  return (
    <Stack p={1} spacing={2}>
      <Text>CREATOR: @itsminh99</Text>
    </Stack>
  );
}
