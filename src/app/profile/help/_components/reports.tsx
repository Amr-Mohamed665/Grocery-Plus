import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

function Report() {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      {/* Title */}
      <h3 className="mb-4 text-sm font-semibold text-[#0f3d3e]">
        Report an Issue
      </h3>

      <form className="space-y-4">
        {/* Issue Type */}
        <div className="space-y-1">
          <Label htmlFor="issueType">Issue Type</Label>
          <Input id="issueType" placeholder="Delivery issue" />
        </div>

        {/* Order Number */}
        <div className="space-y-1">
          <Label htmlFor="orderNumber">
            Order Number <span className="text-gray-400">(Optional)</span>
          </Label>
          <Input id="orderNumber" placeholder="GP20251128001" />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please describe your issue..."
            className="min-h-[90px]"
          />
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="cursor-pointer mt-2 w-fit-content bg-[#0A4868] hover:bg-[#0e557a]/90"
        >
          Report
        </Button>
      </form>
    </div>
  );
}

export default Report;
