import { Text, View } from "react-native";
import {IconMapPin, IconQrcode, IconTicket} from "@tabler/icons-react-native";

import { s } from "./styles";
import { Step } from "../step";

export function Steps() {
    return (
        <View style={s.container}>
            <Text style={s.title}>How it works:</Text>
            <Step
                icon={IconMapPin}
                title="Find places around you"
                description="Find places that are companions of Nerby"
            />
            <Step
                icon={IconQrcode}
                title="Active the cupon with the QR code"
                description="Scan the QR code in the storeto have a discount"
            />
            <Step
                icon={IconTicket}
                title="Apply the cupon to your favorites stores"
                description="Apply the cupon in differents places"
            /> 
        </View>
    );
}