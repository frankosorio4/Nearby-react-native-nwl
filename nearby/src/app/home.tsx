import { useEffect } from "react";
import { View, Text, Alert } from "react-native";

import {api} from "../services/api";

export default function Home() {

    async function fetchCategories(){
        try{
            const {data} = await api.get("/categories");
            console.log(data);
        }
        catch(error){
            console.log(error);
            Alert.alert("Categories", "Error to fetch categories");
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return(
        <View style={{flex:1}}>
            <Text>Home</Text>
        </View> 
    )
}
