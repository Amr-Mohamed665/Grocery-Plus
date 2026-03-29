import { Button } from "@/components/ui/Button";
import { useDeleteAddress } from "@/hooks/addresses/useAddresses";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  address: any;
}

export default function DeleteAddress({
  open,
  setOpen,
  address,
}: DeleteDialogProps) {
  const { mutateAsync: deleteAddress } = useDeleteAddress();

  const handleDelete = async () => {
    try {
      await deleteAddress(address.id);
      setOpen(false);
    } catch (error) {}
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 space-y-4 w-[350px]">
        <h3 className="text-lg font-semibold">Delete address?</h3>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this address?
        </p>

        <div className="flex justify-end gap-2 cursor-pointer">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            className="cursor-pointer"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
