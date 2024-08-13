"use client";

import React, { useState, useEffect } from "react";
import PantryList from "../components/PantryList";
import SearchBar from "../components/SearchBar";
import AddPantryItem from "../components/AddPantryItem";
import { Grid, Box } from "@mui/material";
import styles from "./page.module.css";
import { PantryItem } from "../types";
import { getPantryItems } from "../lib/pantryService";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<PantryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getPantryItems();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddItem = (newItem: PantryItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  return (
    <Box className={styles.main} sx={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <h1 className={styles.header}>Pantry Tracker</h1>
          <AddPantryItem onAdd={handleAddItem} />
          <SearchBar onSearch={handleSearch} />
        </Grid>
        <Grid item xs={12} md={8}>
          <PantryList
            searchQuery={searchQuery}
            items={items}
            setItems={setItems}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
