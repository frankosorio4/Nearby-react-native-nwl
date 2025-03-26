import { useEffect, useRef, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Category } from "../components/category";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from 'expo-location';

import { api } from "../services/api";
import { fontFamily, colors } from "@/styles/theme";

import { Places } from "@/components/places";
import { Categories, CategoriesProps } from "@/components/categories";
import { PlaceProps } from "@/components/place";
import { router } from "expo-router";

export default function Home() {

    type MarketsProps = PlaceProps & {
        latitude: number
        longitude: number
    }

    const currentLocation = {
        latitude: -23.561187293883442,
        longitude: -46.656451388116494
    }

    const [categories, setCategories] = useState<CategoriesProps>([]);

    const [category, setCategory] = useState("");

    const [markets, setMarkets] = useState<MarketsProps[]>([])

    async function fetchCategories() {
        try {
            const { data } = await api.get("/categories");
            setCategories(data);
            setCategory(data[0].id);
            // console.log(!(!data),"CATEGORIES setted in fetchCategories-home");
        }
        catch (error) {
            console.log(error);
            Alert.alert("Categories", "Error to fetch categories");
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) {
                // console.log(!category, "category not selected in fetchMarkets-home");
                return;
            }
            const { data } = await api.get("/markets/category/" + category);
            setMarkets(data);
            // console.log("market data",markets);
            // console.log(!(!data),"MARKETS setted in fetchMarkets-home");
        }
        catch (error) {
            console.log(error);
            Alert.alert("Markets", "Error to find markets");
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();

            if (granted) {
                const location = await Location.getCurrentPositionAsync({});
                console.log(location);
            }
        }
        catch (error) {
            console.log(error);
            Alert.alert("Location", "Error to fetch location");
        }
    }

    useEffect(() => {
        fetchCategories();
        // if we need to get the current device location
        //getCurrentLocation();
    }, []);

    useEffect(() => {
        console.log(category);
        fetchMarkets();
        // console.log(markets);
    }, [category]);//Dependence, we need to wait for the category to be fetched before fetching the markets

    //TO FOCUS ON THE CURRENT LOCATION--
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (mapRef.current && currentLocation) {
            mapRef.current.animateToRegion({
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    }, [currentLocation]);

    return (
        <View style={{ flex: 1, backgroundColor: "#CECECE" }}>
            <Categories
                data={categories}
                onSelected={setCategory}
                selected={category}
            />
            <MapView
                ref={mapRef}
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}>
                <Marker
                    identifier="current"
                    coordinate={{
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    }}
                    image={require("@/assets/location.png")}
                />
                {markets.map(item => (
                    <Marker
                        key={item.id}
                        identifier={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude
                        }}
                        image={require("@/assets/pin.png")}
                    >
                        <Callout
                            onPress={() => router.navigate(`/market/${item.id}` as `/market/[id]`)}>
                            <View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: fontFamily.medium,
                                        color: colors.gray[600]
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontFamily: fontFamily.regular,
                                        color: colors.gray[600]
                                    }}
                                >
                                    {item.address}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))
                }
            </MapView>

            <Places data={markets} />
        </View>
    )
}
