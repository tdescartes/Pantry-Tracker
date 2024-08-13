import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { addPantryItem } from "../lib/pantryService";
import { PantryItem } from "../types";

interface Props {
  onAdd: (item: PantryItem) => void;
}

const AddPantryItem: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.trim() ||
      (typeof quantity === "string" ? Number(quantity) : quantity) <= 0
    ) {
      alert("Please enter a valid item name and quantity.");
      return;
    }

    const newItem = await addPantryItem({ name, quantity: Number(quantity) });
    onAdd(newItem);
    setName("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddPantryItem;
