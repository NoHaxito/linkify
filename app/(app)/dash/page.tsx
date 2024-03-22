import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/dash/page-header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Welcome NoHaxito</PageHeaderTitle>
        <PageHeaderDescription>
          Manage all your links form here.
        </PageHeaderDescription>
        <PageHeaderActions>
          <Button>Subscribe to midudev</Button>
        </PageHeaderActions>
      </PageHeader>
    </>
  );
}
