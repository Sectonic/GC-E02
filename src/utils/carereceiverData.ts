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
        agitation: 1.2
    },
    // Minor elevation
    {
        date: new Date('2023-11-10T08:10:00'),
        heartRate: 81,
        heartRateVariability: 38,
        respirationRate: 16.2,
        skinTemperature: 36.4,
        bloodOxygen: 97,
        activity: 3.5,
        galvanicSkinResponse: 3.2,
        steps: 45,
        motion: 3.8,
        agitation: 3.1
    },
    // Return to normal
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
        agitation: 1.8
    },
    // Beginning of intense agitation
    {
        date: new Date('2023-11-10T08:20:00'),
        heartRate: 95,
        heartRateVariability: 28,
        respirationRate: 19.4,
        skinTemperature: 36.6,
        bloodOxygen: 96,
        activity: 5.8,
        galvanicSkinResponse: 6.2,
        steps: 80,
        motion: 6.3,
        agitation: 5.7
    },
    // Peak of agitation
    {
        date: new Date('2023-11-10T08:25:00'),
        heartRate: 124,
        heartRateVariability: 12,
        respirationRate: 26.1,
        skinTemperature: 37.2,
        bloodOxygen: 93,
        activity: 9.4,
        galvanicSkinResponse: 10.8,
        steps: 195,
        motion: 9.8,
        agitation: 9.6
    },
    // Beginning to calm down
    {
        date: new Date('2023-11-10T08:30:00'),
        heartRate: 104,
        heartRateVariability: 22,
        respirationRate: 21.8,
        skinTemperature: 36.9,
        bloodOxygen: 94,
        activity: 7.1,
        galvanicSkinResponse: 8.2,
        steps: 112,
        motion: 7.5,
        agitation: 7.3
    },
    // Further calming
    {
        date: new Date('2023-11-10T08:35:00'),
        heartRate: 88,
        heartRateVariability: 32,
        respirationRate: 18.2,
        skinTemperature: 36.7,
        bloodOxygen: 95,
        activity: 4.8,
        galvanicSkinResponse: 5.1,
        steps: 42,
        motion: 5.2,
        agitation: 4.5
    },
    // Return to normal
    {
        date: new Date('2023-11-10T08:40:00'),
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
    },
    // Staying normal
    {
        date: new Date('2023-11-10T08:45:00'),
        heartRate: 72,
        heartRateVariability: 44,
        respirationRate: 14.2,
        skinTemperature: 36.3,
        bloodOxygen: 98,
        activity: 1.8,
        galvanicSkinResponse: 2.2,
        steps: 8,
        motion: 1.5,
        agitation: 0.8
    }
];

export interface GeoLocation {
    latitude: number;
    longitude: number;
    date: Date;
}

export const walkingPathData: GeoLocation[] = [
    // Georgia Tech Campus - Starting at Tech Green
    {
        latitude: 33.7756,
        longitude: -84.3963,
        date: new Date('2023-11-10T08:00:00')
    },
    // Klaus Advanced Computing Building
    {
        latitude: 33.7771,
        longitude: -84.3963,
        date: new Date('2023-11-10T08:05:00')
    },
    // Clough Undergraduate Learning Commons
    {
        latitude: 33.7747,
        longitude: -84.3964,
        date: new Date('2023-11-10T08:10:00')
    },
    // Tech Square
    {
        latitude: 33.7771,
        longitude: -84.3892,
        date: new Date('2023-11-10T08:15:00')
    },
    // Bobby Dodd Stadium
    {
        latitude: 33.7724,
        longitude: -84.3924,
        date: new Date('2023-11-10T08:20:00')
    },
    // Heading into Midtown - 5th Street Bridge
    {
        latitude: 33.7785,
        longitude: -84.3879,
        date: new Date('2023-11-10T08:25:00')
    },
    // Midtown - Colony Square
    {
        latitude: 33.7860,
        longitude: -84.3841,
        date: new Date('2023-11-10T08:30:00')
    },
    // Piedmont Park
    {
        latitude: 33.7863,
        longitude: -84.3733,
        date: new Date('2023-11-10T08:35:00')
    },
    // Atlanta Botanical Garden
    {
        latitude: 33.7905,
        longitude: -84.3736,
        date: new Date('2023-11-10T08:40:00')
    },
    // Heading back to campus - North Ave
    {
        latitude: 33.7718,
        longitude: -84.3898,
        date: new Date('2023-11-10T08:45:00')
    }
];
