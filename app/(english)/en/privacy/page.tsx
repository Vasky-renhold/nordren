import { PrivacyPage } from "@/components/privacy/privacy-page";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("privacy", "en");

export default function Page() {
  return <PrivacyPage locale="en" />;
}
