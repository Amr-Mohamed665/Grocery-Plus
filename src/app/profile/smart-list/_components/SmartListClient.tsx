"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import SmartListCard from "./SmartListCard";
import {
  useSmartLists,
  useDeleteSmartList,
} from "@/hooks/smartList/useSmartList";
import { List } from "lucide-react";
import AddList from "./AddList";
import Favorite from "./Favorite";
import Container from "@/components/common/Container";
import EditList from "./EditList";
import Head from "@/components/common/Head";

export default function SmartListClient() {
  const { data: smartLists, isLoading, error } = useSmartLists();
  const { mutateAsync: deleteSmartList } = useDeleteSmartList();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  function handleDelete(id: string) {
    try {
      deleteSmartList(id);
    } catch (error) {
      console.error("Failed to delete smart list:", error);
    }
  }

  function handleAddToCart(items: { id: string; name: string }[]) {
    const prev = JSON.parse(localStorage.getItem("cart") || "[]");
    localStorage.setItem("cart", JSON.stringify([...prev, ...items]));
    alert(`${items.length} item(s) added to cart`);
  }

  function handleEdit(list: any) {
    setEditing(list);
  }

  const closeEditList = () => {
    setEditing(null);
  };

  return (
    <div className="w-full min-h-screen">
      <Container className="py-6 px-4 md:px-0 flex flex-col gap-6">
        {/* Compact Sticky Header */}
        <div className="top-0 z-30 bg-white/90 backdrop-blur-md pb-4 pt-2 -mt-2 border-b border-gray-100 flex items-center justify-between gap-4 mb-10">
          <Head
            title="Smart Lists"
            description="Organize your shopping with custom lists"
          />

          <Button
            className="cursor-pointer bg-[#014162] hover:bg-[#013550] text-white rounded-xl px-4 h-9 font-bold shadow-sm active:scale-95 transition-all text-xs border-none shrink-0"
            onClick={() => setOpen(true)}
          >
            + Create New List
          </Button>
        </div>

        {/* Content Section */}
        {smartLists?.smartLists.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 backdrop-blur-sm">
            <div className="bg-white size-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <List className="size-10 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Your list collection is empty
            </h3>
            <p className="text-gray-500 mt-2">
              Start creating smart lists to simplify your grocery shopping.
            </p>
            <Button
              variant="outline"
              className="cursor-pointer mt-6 border-gray-200 hover:bg-white rounded-xl font-bold"
              onClick={() => setOpen(true)}
            >
              Add Smart List
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartLists?.smartLists.map((list: any) => (
              <SmartListCard
                key={list.id}
                list={list}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}

        <Favorite />

        {open && <AddList onClose={() => setOpen(false)} />}
        {editing && <EditList list={editing} onClose={closeEditList} />}
      </Container>
    </div>
  );
}
