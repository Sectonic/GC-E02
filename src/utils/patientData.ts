export interface HealthDataPoint {
    date: Date;
    heartRate: number;      
    heartRateVariability: number;
    respirationRate: number;    
    skinTemperature: number; 
    bloodOxygen: number;        
    activity: number;          
    galvanicSkinResponse: number; 
    steps: number;               
    motion: number;
    agitation: number;
    id?: string;
}

export interface FireStoreHealthDataPoint {
    date: { seconds: number, nanoseconds: number };
    heartRate: number;      
    heartRateVariability: number;
    respirationRate: number;    
    skinTemperature: number; 
    bloodOxygen: number;        
    activity: number;          
    galvanicSkinResponse: number; 
    steps: number;               
    motion: number;
    agitation: number;
    id?: string;
}

export const healthDataSeries: HealthDataPoint[] = [
    // Normal baseline
    {
        date: new Date('2023-11-10T08:00:00'),
        heartRate: 72,
        heartRateVariability: 45,
        respirationRate: 14,
        skinTemperature: 36.2,
        bloodOxygen: 98,
        activity: 1,
        galvanicSkinResponse: 2.1,
        steps: 0,
        motion: 1.2,
        agitation: 0.5
    },
    {
        date: new Date('2023-11-10T08:05:00'),
        heartRate: 74,
        heartRateVariability: 42,
        respirationRate: 14.5,
        skinTemperature: 36.3,
        bloodOxygen: 97,
        activity: 2,
        galvanicSkinResponse: 2.3,
        steps: 12,
        motion: 2.1,
        agitation: 1.3
    },
    {
        date: new Date('2023-11-10T08:10:00'),
        heartRate: 73,
        heartRateVariability: 44,
        respirationRate: 14.2,
        skinTemperature: 36.2,
        bloodOxygen: 98,
        activity: 1.5,
        galvanicSkinResponse: 2.0,
        steps: 8,
        motion: 1.8,
        agitation: 0.7
    },
    {
        date: new Date('2023-11-10T08:15:00'),
        heartRate: 75,
        heartRateVariability: 43,
        respirationRate: 15.1,
        skinTemperature: 36.3,
        bloodOxygen: 97,
        activity: 2.2,
        galvanicSkinResponse: 2.7,
        steps: 18,
        motion: 2.1,
        agitation: 2.1
    },
    {
        date: new Date('2023-11-10T08:20:00'),
        heartRate: 76,
        heartRateVariability: 41,
        respirationRate: 15.0,
        skinTemperature: 36.3,
        bloodOxygen: 97,
        activity: 2.5,
        galvanicSkinResponse: 2.8,
        steps: 22,
        motion: 2.3,
        agitation: 1.4
    },
    {
        date: new Date('2023-11-10T08:25:00'),
        heartRate: 78,
        heartRateVariability: 40,
        respirationRate: 15.6,
        skinTemperature: 36.4,
        bloodOxygen: 97,
        activity: 3.2,
        galvanicSkinResponse: 3.1,
        steps: 35,
        motion: 3.0,
        agitation: 2.8
    },
    {
        date: new Date('2023-11-10T08:30:00'),
        heartRate: 77,
        heartRateVariability: 41,
        respirationRate: 15.4,
        skinTemperature: 36.4,
        bloodOxygen: 97,
        activity: 2.8,
        galvanicSkinResponse: 2.9,
        steps: 30,
        motion: 2.7,
        agitation: 1.9
    },
    {
        date: new Date('2023-11-10T08:35:00'),
        heartRate: 76,
        heartRateVariability: 42,
        respirationRate: 15.0,
        skinTemperature: 36.3,
        bloodOxygen: 98,
        activity: 2.4,
        galvanicSkinResponse: 2.6,
        steps: 20,
        motion: 2.2,
        agitation: 3.2
    },
    {
        date: new Date('2023-11-10T08:40:00'),
        heartRate: 80,
        heartRateVariability: 38,
        respirationRate: 16.1,
        skinTemperature: 36.4,
        bloodOxygen: 97,
        activity: 3.5,
        galvanicSkinResponse: 3.4,
        steps: 42,
        motion: 3.3,
        agitation: 2.6
    },
    {
        date: new Date('2023-11-10T08:45:00'),
        heartRate: 83,
        heartRateVariability: 36,
        respirationRate: 16.8,
        skinTemperature: 36.5,
        bloodOxygen: 96,
        activity: 4.2,
        galvanicSkinResponse: 4.0,
        steps: 55,
        motion: 4.1,
        agitation: 3.9
    },
    // Beginning of more intense agitation
    {
        date: new Date('2023-11-10T08:50:00'),
        heartRate: 88,
        heartRateVariability: 32,
        respirationRate: 17.5,
        skinTemperature: 36.6,
        bloodOxygen: 96,
        activity: 5.0,
        galvanicSkinResponse: 5.2,
        steps: 68,
        motion: 5.1,
        agitation: 4.5
    },
    {
        date: new Date('2023-11-10T08:55:00'),
        heartRate: 95,
        heartRateVariability: 28,
        respirationRate: 19.4,
        skinTemperature: 36.7,
        bloodOxygen: 95,
        activity: 6.3,
        galvanicSkinResponse: 6.8,
        steps: 88,
        motion: 6.5,
        agitation: 5.8
    },
    // Rapid fluctuations with increasing trend
    {
        date: new Date('2023-11-10T09:00:00'),
        heartRate: 102,
        heartRateVariability: 24,
        respirationRate: 21.2,
        skinTemperature: 36.8,
        bloodOxygen: 94,
        activity: 7.5,
        galvanicSkinResponse: 7.9,
        steps: 110,
        motion: 7.6,
        agitation: 7.4
    },
    {
        date: new Date('2023-11-10T09:05:00'),
        heartRate: 110,
        heartRateVariability: 20,
        respirationRate: 23.0,
        skinTemperature: 36.9,
        bloodOxygen: 93,
        activity: 8.4,
        galvanicSkinResponse: 8.7,
        steps: 135,
        motion: 8.5,
        agitation: 6.7
    },
    // Sharp spike
    {
        date: new Date('2023-11-10T09:10:00'),
        heartRate: 118,
        heartRateVariability: 16,
        respirationRate: 24.8,
        skinTemperature: 37.0,
        bloodOxygen: 92,
        activity: 9.2,
        galvanicSkinResponse: 9.6,
        steps: 160,
        motion: 9.1,
        agitation: 8.9
    },
    // Peak of agitation
    {
        date: new Date('2023-11-10T09:15:00'),
        heartRate: 130,
        heartRateVariability: 10,
        respirationRate: 27.5,
        skinTemperature: 37.3,
        bloodOxygen: 91,
        activity: 10.0,
        galvanicSkinResponse: 11.2,
        steps: 210,
        motion: 10.0,
        agitation: 9.8
    },
    // Temporary dip before second peak
    {
        date: new Date('2023-11-10T09:20:00'),
        heartRate: 116,
        heartRateVariability: 18,
        respirationRate: 24.2,
        skinTemperature: 37.1,
        bloodOxygen: 93,
        activity: 8.6,
        galvanicSkinResponse: 9.2,
        steps: 145,
        motion: 8.8,
        agitation: 7.5
    },
    // Second peak
    {
        date: new Date('2023-11-10T09:25:00'),
        heartRate: 125,
        heartRateVariability: 14,
        respirationRate: 26.1,
        skinTemperature: 37.2,
        bloodOxygen: 92,
        activity: 9.5,
        galvanicSkinResponse: 10.3,
        steps: 180,
        motion: 9.4,
        agitation: 9.3
    },
    // Rapid calming with fluctuations
    {
        date: new Date('2023-11-10T09:30:00'),
        heartRate: 84,
        heartRateVariability: 35,
        respirationRate: 17.2,
        skinTemperature: 36.6,
        bloodOxygen: 96,
        activity: 4.3,
        galvanicSkinResponse: 4.4,
        steps: 50,
        motion: 4.2,
        agitation: 5.2
    },
    // Return to normal
    {
        date: new Date('2023-11-10T09:35:00'),
        heartRate: 76,
        heartRateVariability: 40,
        respirationRate: 15.4,
        skinTemperature: 36.4,
        bloodOxygen: 97,
        activity: 2.5,
        galvanicSkinResponse: 3.0,
        steps: 15,
        motion: 2.2,
        agitation: 2.0
    }
];

export interface GeoLocation {
    latitude: number;
    longitude: number;
    date?: Date;
}

export const walkingPathData: GeoLocation[] = [
    // Georgia Tech Campus - Starting at Tech Green
    {
        latitude: 33.7756,
        longitude: -84.3963,
        date: new Date('2023-11-10T08:00:00')
    },
    // Walking north on Atlantic Drive
    {
        latitude: 33.7759,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:01:00')
    },
    {
        latitude: 33.7762,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:02:00')
    },
    {
        latitude: 33.7765,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:03:00')
    },
    {
        latitude: 33.7768,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:04:00')
    },
    // Klaus Advanced Computing Building
    {
        latitude: 33.7771,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:05:00')
    },
    // Turning around, heading south on Atlantic Drive
    {
        latitude: 33.7768,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:06:00')
    },
    {
        latitude: 33.7764,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:07:00')
    },
    {
        latitude: 33.7758,
        longitude: -84.3962,
        date: new Date('2023-11-10T08:08:00')
    },
    // Turning onto Ferst Drive
    {
        latitude: 33.7752,
        longitude: -84.3963,
        date: new Date('2023-11-10T08:09:00')
    },
    // Approaching Clough Undergraduate Learning Commons
    {
        latitude: 33.7747,
        longitude: -84.3964,
        date: new Date('2023-11-10T08:10:00')
    },
    // Heading east on Tech Walkway
    {
        latitude: 33.7747,
        longitude: -84.3958,
        date: new Date('2023-11-10T08:11:00')
    },
    {
        latitude: 33.7747,
        longitude: -84.3950,
        date: new Date('2023-11-10T08:12:00')
    },
    // Continuing east toward Tech Square
    {
        latitude: 33.7747,
        longitude: -84.3942,
        date: new Date('2023-11-10T08:13:00')
    },
    {
        latitude: 33.7747,
        longitude: -84.3933,
        date: new Date('2023-11-10T08:14:00')
    },
    // Crossing the 5th Street Bridge
    {
        latitude: 33.7747,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:15:00')
    },
    {
        latitude: 33.7747,
        longitude: -84.3916,
        date: new Date('2023-11-10T08:16:00')
    },
    // Arriving at Tech Square
    {
        latitude: 33.7747,
        longitude: -84.3905,
        date: new Date('2023-11-10T08:17:00')
    },
    // Heading south on Spring Street
    {
        latitude: 33.7740,
        longitude: -84.3905,
        date: new Date('2023-11-10T08:18:00')
    },
    {
        latitude: 33.7732,
        longitude: -84.3905,
        date: new Date('2023-11-10T08:19:00')
    },
    // Near Bobby Dodd Stadium, heading west on North Ave
    {
        latitude: 33.7724,
        longitude: -84.3905,
        date: new Date('2023-11-10T08:20:00')
    },
    {
        latitude: 33.7724,
        longitude: -84.3915,
        date: new Date('2023-11-10T08:21:00')
    },
    {
        latitude: 33.7724,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:22:00')
    },
    // Turning north on Techwood Drive
    {
        latitude: 33.7731,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:23:00')
    },
    {
        latitude: 33.7738,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:24:00')
    },
    // Continuing north on Techwood Drive
    {
        latitude: 33.7745,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:25:00')
    },
    {
        latitude: 33.7752,
        longitude: -84.3925,
        date: new Date('2023-11-10T08:26:00')
    },
    // Turning east onto 5th Street
    {
        latitude: 33.7752,
        longitude: -84.3915,
        date: new Date('2023-11-10T08:27:00')
    },
    {
        latitude: 33.7752,
        longitude: -84.3905,
        date: new Date('2023-11-10T08:28:00')
    },
    // Continuing east on 5th Street into Midtown
    {
        latitude: 33.7752,
        longitude: -84.3895,
        date: new Date('2023-11-10T08:29:00')
    },
    {
        latitude: 33.7752,
        longitude: -84.3885,
        date: new Date('2023-11-10T08:30:00')
    },
    // Turning north on West Peachtree Street
    {
        latitude: 33.7760,
        longitude: -84.3854,
        date: new Date('2023-11-10T08:31:00')
    },
    {
        latitude: 33.7768,
        longitude: -84.3854,
        date: new Date('2023-11-10T08:32:00')
    },
    {
        latitude: 33.7776,
        longitude: -84.3854,
        date: new Date('2023-11-10T08:33:00')
    },
    // Approaching 10th Street
    {
        latitude: 33.7784,
        longitude: -84.3854,
        date: new Date('2023-11-10T08:34:00')
    },
    // Turning east on 10th Street toward Piedmont Park
    {
        latitude: 33.7784,
        longitude: -84.3845,
        date: new Date('2023-11-10T08:35:00')
    },
    {
        latitude: 33.7784,
        longitude: -84.3835,
        date: new Date('2023-11-10T08:36:00')
    },
    {
        latitude: 33.7784,
        longitude: -84.3825,
        date: new Date('2023-11-10T08:37:00')
    },
    // Continuing east on 10th Street
    {
        latitude: 33.7784,
        longitude: -84.3815,
        date: new Date('2023-11-10T08:38:00')
    },
    {
        latitude: 33.7784,
        longitude: -84.3805,
        date: new Date('2023-11-10T08:39:00')
    },
    // Approaching Piedmont Park
    {
        latitude: 33.7784,
        longitude: -84.3795,
        date: new Date('2023-11-10T08:40:00')
    },
    // Turning south on Piedmont Avenue
    {
        latitude: 33.7776,
        longitude: -84.3795,
        date: new Date('2023-11-10T08:41:00')
    },
    {
        latitude: 33.7768,
        longitude: -84.3795,
        date: new Date('2023-11-10T08:42:00')
    },
    // Heading back toward campus on Piedmont Avenue
    {
        latitude: 33.7760,
        longitude: -84.3795,
        date: new Date('2023-11-10T08:43:00')
    },
    {
        latitude: 33.7752,
        longitude: -84.3795,
        date: new Date('2023-11-10T08:44:00')
    }
];

export const boundaryData: GeoLocation[] = [
    // North-west corner (Near Marietta St & Howell St)
    { latitude: 33.7808, longitude: -84.4045 },
    // North side (Near Atlantic Drive & 10th St)
    { latitude: 33.7820, longitude: -84.3980 },
    // North-east corner (Near Tech Square)
    { latitude: 33.7785, longitude: -84.3880 },
    // East side (Tech Square)
    { latitude: 33.7760, longitude: -84.3865 },
    // South-east corner (Near North Ave & I-75/85)
    { latitude: 33.7710, longitude: -84.3875 },
    // South side (Near North Ave)
    { latitude: 33.7700, longitude: -84.3920 },
    // South-west corner (Near Bobby Dodd Stadium)
    { latitude: 33.7705, longitude: -84.3990 },
    // West side (Near Marietta St)
    { latitude: 33.7740, longitude: -84.4040 },
    // Closing the polygon by returning to the first point
    { latitude: 33.7808, longitude: -84.4045 }
];

/**
 * Determines if a point is inside a polygon using the ray-casting algorithm
 * @param point The point to check
 * @param polygon Array of points forming the polygon boundary
 * @returns boolean indicating whether the point is inside the polygon
 */
export function isPointInPolygon(point: GeoLocation, polygon: GeoLocation[]): boolean {
    if (!point || !polygon || polygon.length < 3) {
        return false;
    }

    const x = point.latitude;
    const y = point.longitude;
    
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;
        
        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            
        if (intersect) {
            inside = !inside;
        }
    }
    
    return inside;
}
