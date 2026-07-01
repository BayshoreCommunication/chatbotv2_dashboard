import { Suspense } from "react";
import WidgetSettingView from "@/components/widgetSettings/WidgetSettingView";

const WidgetSettingsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <WidgetSettingView />
    </Suspense>
  );
};

export default WidgetSettingsPage;
