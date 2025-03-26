import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { router } from "expo-router";

import { Place, PlaceProps } from "../place";
import { s } from "./styles";

type Props = {
    data: PlaceProps[]
}

export function Places({ data }: Props) {
    const dimension = useWindowDimensions();
    const bootomsheetRef = useRef<BottomSheet>(null);

    //example
    //bottomSheetRef.current.collapse

    const snapPoints = {
        min: 200,
        max: dimension.height - 128//height of screen
    }

    return (
        <BottomSheet
            ref={bootomsheetRef}
            snapPoints={[snapPoints.min, snapPoints.max]}
            handleIndicatorStyle={s.indicador}
            backgroundStyle={s.container}
            enableOverDrag={false}
        >
            <BottomSheetFlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Place
                    data={item}
                    onPress={() => router.navigate(`/market/${item.id}` as `/market/[id]`)}
                />}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore locals near you</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </BottomSheet>
    );
}