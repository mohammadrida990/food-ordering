"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { deleteCategory } from "../_actions/addCategory";

type StateType = {
  isLoading: boolean;
  message: string;
  status: number | null;
};

const DeleteCategory = ({ id }: { id: string }) => {
  const [state, setState] = useState<StateType>({
    isLoading: false,
    message: "",
    status: null,
  });

  const handleDelete = async () => {
    try {
      setState((prev) => {
        return { ...prev, isLoading: true };
      });

      const res = await deleteCategory(id);
      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setState((prev) => {
        return { ...prev, isLoading: false };
      });
    }
  };

  return (
    <Button
      variant="secondary"
      disabled={state.isLoading}
      onClick={handleDelete}
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteCategory;
