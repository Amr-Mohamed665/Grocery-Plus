// "use client";

import { Globe, Moon, Bell, Download, Trash2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import SectionTitle from "./_components/sectionTitle";
// import {
//   useNotifications,
//   useUpdateNotifications,
// } from "@/hooks/use-Notification";

const notifi = [
  { key: "orderUpdates", label: "Order Updates" },
  { key: "promotionalEmails", label: "Promotional Emails" },
  { key: "nutritionInsights", label: "Nutrition Insights" },
  { key: "priceAlerts", label: "Price Alerts" },
];

function Settings() {
  // const { data } = useNotifications();
  // const { mutate } = useUpdateNotifications();

  // const handleToggle = (key: string, value: boolean) => {
  //   mutate({
  //     ...data,
  //     [key]: value,
  //   });
  // };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-lg font-semibold">Settings</h2>
        <p className="text-sm text-gray-500">
          Manage app preferences and privacy settings
        </p>
      </div>
      {/*//// Title \\\\*/}

      {/* Language */}
      <Card>
        <SectionTitle icon={Globe} title="Language" />
        <p className="text-xs text-gray-500 mb-3">Preferred Language</p>

        <Select defaultValue="en">
          <SelectTrigger className="w-full bg-white sm:w-[200px]">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English (US)</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      {/*//// Language \\\\*/}

      {/* Appearance */}
      <Card>
        <SectionTitle icon={Moon} title="Appearance" />

        <div className="flex items-center  justify-between">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-gray-500">
              Switch between light and dark theme
            </p>
          </div>

          <Switch />
        </div>
      </Card>
      {/*//// Appearance \\\\*/}

      {/* Notifications */}
      <Card>
        <SectionTitle icon={Bell} title="Notification Preference" />

        <div className="space-y-4 rounded-md bg-white p-3">
          {notifi.map((n, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm">{n.label}</span>
              <Switch
              // checked={data?.[n.key]}
              // onCheckedChange={(value) => handleToggle(n.key, value)}
              />
            </div>
          ))}
        </div>
      </Card>
      {/*//// Notifications \\\\*/}

      {/* Data Management */}
      <Card>
        <SectionTitle icon={Download} title="Data Management" />

        <Button
          variant="secondary"
          className="w-full justify-start bg-gray-100"
        >
          Download Your Data
        </Button>

        <div className="mt-3 rounded-md bg-red-50 p-3">
          <Button
            variant="destructive"
            className="w-fit-content flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </Button>
          <p className="mt-1 text-xs text-red-600">
            Permanently delete your account and data
          </p>
        </div>
      </Card>
      {/*//// Data Management \\\\*/}
    </div>
  );
}

export default Settings;
