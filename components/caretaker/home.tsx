import { useReceiver } from "@/src/hooks/useReceiver";
import { boundaryData, FireStoreHealthDataPoint, GeoLocation, isPointInPolygon } from "@/src/utils/carereceiverData";
import { orderBy } from "firebase/firestore";
import { ActivityIndicator, Dimensions, Platform, Text, TouchableOpacity, View } from "react-native";
import LoadingScreen from "../loadingScreen";
import { useFirestoreSnapshot } from "@/src/hooks/useFirestoreSnapshot";
import { useEffect, useMemo, useState } from "react";
import { CartesianChart, Line, PointsArray } from "victory-native";
import useActions from "@/src/hooks/useActions";
import MapView, { LatLng, Marker, Polygon, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';

export default function CaretakerHome() {
    const { resetAction, isProcessing } = useActions();
    const [windowDomain, setWindowDomain] = useState<[number, number] | null>(null);

    const { isLoading: receiverLoading, receiverUid } = useReceiver();
    const { data: graphData, isLoading: graphDataLoading } = useFirestoreSnapshot<FireStoreHealthDataPoint>(
        receiverUid ? ['agitation_data', receiverUid, 'records'] : [],
        [orderBy('date')],
        [receiverUid]
    );
    const { data: wanderingData, isLoading: wanderingDataLoading } = useFirestoreSnapshot<GeoLocation>(
        receiverUid ? ['wandering_data', receiverUid, 'records'] : [],
        [orderBy('date')],
        [receiverUid] 
    )

    const WINDOW_MINUTES = 45;
    const formattedData = useMemo(() => {
        if (!graphData || graphData.length === 0) return [];
        return graphData.map((point) => ({
            x: point.date.seconds * 1000,
            y: point.agitation,
        }));
    }, [graphData]);
    

    useEffect(() => {
        if (formattedData.length === 0) return;
        const latestPoint = formattedData.at(-1)?.x as number;
        const windowStart = latestPoint - (WINDOW_MINUTES * 60 * 1000);
        const extraSpace = (WINDOW_MINUTES * 60 * 1000);
        const windowEnd = latestPoint + extraSpace;
        setWindowDomain([windowStart, windowEnd]);
    }, [formattedData]);
    
    const isLoading = receiverLoading || !receiverUid;
    
    if (isLoading) {
        return <LoadingScreen />
    }

    const defaultDomain: [number, number] = [
        Date.now() - (WINDOW_MINUTES * 60 * 1000),
        Date.now() + ((WINDOW_MINUTES * 60 * 1000) / 4)
    ];

    const graphColor = (point: PointsArray) => {
        const pn = point.at(1);
        if (!pn?.yValue) return;
        if (pn?.yValue < 3) return "#16a34a"; // green
        if (pn?.yValue < 5) return "#4ade80"; // darker green
        if (pn?.yValue < 7) return "#facc15"; // yellow
        if (pn?.yValue < 9) return "#f97316"; // orange
        return "#ef4444"; // red
    }


    return (
        <View className="p-6">
            <TouchableOpacity
                disabled={isProcessing}
                className={`w-24 py-2 rounded-lg ${isProcessing ? 'bg-slate-700/65' : 'bg-slate-700'}`} 
                onPress={() => resetAction()}>
                <Text className="text-white text-center text-xl">Reset</Text>
            </TouchableOpacity>
            <Text className="mt-6 text-white text-xl font-bold mb-2">Agitation Level</Text>
            {!graphDataLoading && formattedData.length > 0 && <Text className="text-white text-4xl">{formattedData.at(-1)?.y}</Text>}
            <View className={`relative mt-2 w-full h-[250px]`} style={{width: Dimensions.get('window').width}}>
                { graphDataLoading ? (
                    <ActivityIndicator color="#4f46e5" />
                ) : formattedData.length === 0 ? (
                    <Text className="text-white">No data avaliable.</Text>
                ) : (
                    <>
                        <View className="absolute top-0 left-[51.5%] w-[2px] rounded-full bg-red-500/60 h-full" />
                        <View className="absolute bottom-0 left-[53%] bg-red-500/75 px-2 py-1 rounded-full">
                            <Text className="text-white text-xs">◉ LIVE</Text>
                        </View>
                        <CartesianChart
                            viewport={{ x: windowDomain || defaultDomain, y: [0, 10] }}
                            data={formattedData}
                            xKey="x"
                            yKeys={["y"]}
                            xAxis={{
                                lineColor: 'transparent',
                                labelColor: 'white',
                                formatXLabel: (value) => {
                                    const date = new Date(value);
                                    return `${String(date.getHours()).padStart(2)}:${String(date.getMinutes()).padStart(2, '0')}`;
                                },
                                axisSide: 'bottom'
                            }}
                            yAxis={[{
                                lineColor: 'transparent',
                                labelColor: 'white',
                                axisSide: 'left'
                            }]}
                        >
                            {({ points }) => (
                                <>
                                    {points.y.map((point, index) => {
                                        if (index === 0) return null;
                                        const segment = [points.y[index - 1], point];
                                        return (
                                            <Line
                                                key={index}
                                                points={segment}
                                                color={graphColor(segment)}
                                                strokeWidth={3}
                                                animate={{ type: "spring", duration: 300 }}
                                            />
                                        );
                                    })}
                                </>
                            )}
                        </CartesianChart>
                    </>
                )}
            </View>
            <Text className="mt-2 mb-2 text-white text-xl font-bold">Wandering Map</Text> 
            {Platform.OS == "ios" && !wanderingDataLoading ? 
                wanderingData.length === 0 ? (
                    <Text className="mt-1 text-white">No data avaliable.</Text>
                ) :
                (
                    <MapView 
                        provider={PROVIDER_DEFAULT} 
                        style={{
                            width: Dimensions.get('window').width - 80, 
                            height: 250, 
                            borderRadius: 20
                        }}
                        region={{
                            latitude: wanderingData.at(-1)?.latitude || 33.78105,
                            longitude: wanderingData.at(-1)?.longitude || -84.38595,
                            latitudeDelta: 0.018,
                            longitudeDelta: 0.027
                        }}
                        pitchEnabled={false}
                        rotateEnabled={false}
                        zoomEnabled={false}
                        scrollEnabled={false}
                    >
                        <Polygon 
                            coordinates={boundaryData as LatLng[]}
                            strokeColor="#4f46e5"
                            strokeWidth={3}
                            fillColor="rgba(79, 70, 229, 0.3)"
                        />
                        {wanderingData.slice(0, -1).map((point, index) => {
                            const nextPoint = wanderingData[index + 1];
                            const isInsideBoundary = isPointInPolygon(nextPoint, boundaryData);
                            
                            return (
                                <Polyline
                                    key={index}
                                    coordinates={[point, nextPoint] as LatLng[]}
                                    strokeColor={isInsideBoundary ? "#4ade80" : "#ef4444"}
                                    strokeWidth={3}
                                />
                            );
                        })}
                        <Marker 
                            coordinate={wanderingData.at(-1) as LatLng}
                            pinColor="#4f46e5"
                        />
                    </MapView>
                )
                : <ActivityIndicator color="#4f46e5" />
            }
        </View>
    )
}