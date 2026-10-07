import { PrivacyPage } from "@/components/privacy/privacy-page";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("privacy", "nb");

export default function Page() {
  return <PrivacyPage locale="nb" />;
}
