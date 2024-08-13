import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { PantryItem as PantryItemType } from "../types";
import { deletePantryItem, updatePantryItem } from "../lib/pantryService";

interface Props {
  item: PantryItemType;
  onUpdate: (updatedItem: PantryItemType) => void;
  isEditing: boolean;
  onEditToggle: () => void;
}

const PantryItem: React.FC<Props> = ({
  item,
  onUpdate,
  isEditing,
  onEditToggle,
}) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState<number | string>(item.quantity);

  const handleDelete = async () => {
    await deletePantryItem(item.id);
    // You might want to handle item removal in the parent component too
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      (typeof quantity === "string" ? Number(quantity) : quantity) <= 0
    ) {
      alert("Please enter a valid item name and quantity.");
      return;
    }

    const updatedItem = { ...item, name, quantity: Number(quantity) };
    await updatePantryItem(updatedItem);
    onUpdate(updatedItem);
    onEditToggle(); // Hide the edit form after saving
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <TextField
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      ) : (
        <>
          <Button
            onClick={onEditToggle}
            variant="contained"
            color="primary"
            size="small"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            size="small"
          >
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default PantryItem;
