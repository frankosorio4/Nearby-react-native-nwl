import { useEffect, useState, useRef } from "react";
import { View, Text, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { useCameraPermissions, CameraView } from "expo-camera";

import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover/index";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";

import { api } from "@/services/api";

type DataProps = PropsDetails & {
    cover: string
}

export default function Market() {

    const [data, setData] = useState<DataProps>();
    const [coupon, setCoupon] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [couponIsFetching, setCouponIsFetching] = useState(false);
    const [isVisbleCameraModal, setIsVisibleCameraModal] = useState(false);

    const [_, requestPermission] = useCameraPermissions();

    const params = useLocalSearchParams<{ id: string }>();

    const qrLock = useRef(false);
    console.log("Market ID:", params.id);//borrar

    async function fetchMarket() {
        try {
            const { data } = await api.get("/markets/" + params.id);
            setData(data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            Alert.alert("Market", "Error to find market", [
                { text: "OK", onPress: () => router.back() }
            ]);
        }
    }

    async function handleOplenCamera() {
        try {
            const { granted } = await requestPermission();
            if (!granted) {
                Alert.alert("Camera", "Permission denied");
                return;
            }
            qrLock.current = false;
            setIsVisibleCameraModal(true);
        } catch (error) {
            console.log(error);
            Alert.alert("Camera", "Error to open camera");
        }
    }

    async function getCoupon(id: string) {
        try {
            setCouponIsFetching(true);
            console.log("Requesting coupon for Market ID:", id);//borrar
            const { data } = await api.patch("/coupons/" + id)
            Alert.alert("Coupon", `Your coupon: ${data.coupon}`);
            setCoupon(data.coupon);
        } catch (error) {
            //console.error("Error fetching coupon:", error.response?.data || error);
            console.log(error);
            Alert.alert("Coupon", "Error to find coupon");
        }
        finally {
            setCouponIsFetching(false);
        }
    }

    function handleUseCoupon(id: string) {
        setIsVisibleCameraModal(false);

        Alert.alert("Coupon", "Do you want to use this coupon?",
            [
                { style: "cancel", text: "Cancel" },
                {
                    text: "Yes", onPress: () => getCoupon(id)
                }
            ]
        );
    }

    useEffect(() => {
        fetchMarket();
    }, [params.id, coupon]
    );

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <Redirect href="/home" />
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" hidden={isVisbleCameraModal} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <Cover uri={data.cover} />
                <Details data={data} />
                {coupon && <Coupon code={coupon} />}
            </ScrollView>

            <View style={{ padding: 32 }}>
                <Button onPress={handleOplenCamera}>
                    <Button.Title>Read QR Code</Button.Title>
                </Button>
            </View>

            <Modal style={{ flex: 1 }} visible={isVisbleCameraModal}>
                <CameraView
                    style={{ flex: 1 }}
                    facing="back"
                    onBarcodeScanned={({ data }) => {
                        if (data && !qrLock.current) {
                            qrLock.current = true;
                            setTimeout(() => handleUseCoupon(data), 500)
                        }
                    }
                    } />
                <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                    <Button
                        onPress={() => setIsVisibleCameraModal(false)}
                        isLoading={couponIsFetching}>
                        <Button.Title>Back</Button.Title>
                    </Button>
                </View>
            </Modal>
        </View>
    )
}