import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Category } from "../components/category";

import { api } from "../services/api";
import { Categories, CategoriesProps } from "@/components/categories";

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([]);

    const [category, setCategory] = useState("");

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Categories", "Error to fetch categories");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Categories
                data={categories}
                onSelected={setCategory}
                selected={category}
            />
        </View>
    )
}
