import { LinksSkeleton } from "@/components/dash/links-skeleton";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/dash/page-header";

export default function Loading() {
  return (
    <>
      <PageHeader className="container mx-auto">
        <PageHeaderTitle>Your Links</PageHeaderTitle>
        <PageHeaderDescription>
          Create, manage, and track your short links
        </PageHeaderDescription>
      </PageHeader>
      <LinksSkeleton />
    </>
  );
}
