import { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Category } from "../components/category";

import { Places } from "@/components/places";
import { api } from "../services/api";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";

export default function Home() {

    type MarketsProps =PlaceProps

    const [categories, setCategories] = useState<CategoriesProps>([]);

    const [category, setCategory] = useState("");

    const [markets, setMarkets] = useState<MarketsProps[]>([])

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

    async function fetchMarkets() {
        try {
            if(!category) {
                return;
            }
            const { data } = await api.get("/markets/category/"+category);
            setMarkets(data);
            console.log(data);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Markets", "Error to find markets");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchMarkets();
    }, [category]);//we need to wait for the category to be fetched before fetching the markets

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE"}}>
            <Categories
                data={categories}
                onSelected={setCategory}
                selected={category}
            />
            <Places data={markets} />
        </View>
    )
}
