import { useReceiver } from "@/src/hooks/useReceiver";
import { FireStoreHealthDataPoint, GeoLocation, HealthDataPoint, healthDataSeries } from "@/src/utils/carereceiverData";
import { orderBy } from "firebase/firestore";
import { Dimensions, Text, View } from "react-native";
import LoadingScreen from "../loadingScreen";
import { useFirestoreSnapshot } from "@/src/hooks/useFirestoreSnapshot";
import { useEffect, useMemo, useState } from "react";
import { CartesianChart, Line } from "victory-native";

export default function CaretakerHome() {
    const [windowDomain, setWindowDomain] = useState<[number, number] | null>(null);

    const { isLoading: receiverLoading, receiverUid } = useReceiver();
    const { data: graphData } = useFirestoreSnapshot<FireStoreHealthDataPoint>(
        receiverUid ? ['agitation_data', receiverUid, 'records'] : [],
        [orderBy('date')],
        [receiverUid]
    );
    const { data: wonderingData } = useFirestoreSnapshot<GeoLocation>(
        receiverUid ? ['wondering_data', receiverUid, 'records'] : [],
        [orderBy('date')],
        [receiverUid] 
    )

    const WINDOW_MINUTES = 45;
    const formattedData = useMemo(() => {
        if (!graphData || graphData.length === 0) return [];
        return graphData.map((point) => ({
            x: point.date.seconds,
            y: point.agitation,
        }));
    }, [graphData]);
    

    useEffect(() => {
        if (formattedData.length === 0) return;
        const latestPoint = formattedData.at(-1)?.x as number;
        const windowStart = latestPoint - (WINDOW_MINUTES * 60);
        const extraSpace = (WINDOW_MINUTES * 60) / 4;
        const windowEnd = latestPoint + extraSpace;
        console.log([windowStart, windowEnd], formattedData);
        setWindowDomain([windowStart, windowEnd]);
    }, [formattedData]);
    
    const isLoading = receiverLoading || !receiverUid;
    
    if (isLoading) {
        return <LoadingScreen />
    }

    const defaultDomain: [number, number] = [
        Date.now() - (WINDOW_MINUTES * 60),
        Date.now() + ((WINDOW_MINUTES * 60) / 4)
    ];

    return (
        <View className="p-6">
            <Text className="text-xl font-bold mb-4">Agitation Level</Text>
            <View className="w-full h-[250px]" style={{width: Dimensions.get('window').width}}>
                <CartesianChart
                    viewport={{ x: windowDomain || defaultDomain, y: [0, 10] }}
                    data={formattedData}
                    xKey="x"
                    yKeys={["y"]}
                    xAxis={{
                        tickCount: 5,
                        formatXLabel: (value) => {
                            const date = new Date(value);
                            return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
                        },
                        axisSide: 'bottom'
                    }}
                >
                    {({ points }) => (
                        <Line
                            points={points.y}
                            color="#4f46e5"
                            strokeWidth={3}
                            animate={{ type: "timing", duration: 300 }}
                        />
                    )}
                </CartesianChart>
            </View>
        </View>
    )
}