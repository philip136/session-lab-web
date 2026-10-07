export type StrokeType = 'freestyle' | 'backstroke' | 'breaststroke' | 'butterfly';

export interface WorkoutTiming {
  durationSeconds: number;
  elapsedSeconds: number;
  swimSeconds: number;
  restSeconds: number;
}

export interface HeartRateSummary {
  averageBpm: number;
  maxBpm: number;
}

export interface StrokeSummary {
  count: number;
  averageRatePerMinute: number;
  averageDistancePerStrokeMeters: number;
}

export interface WorkoutListItemResponse {
  id: number;
  name: string;
  startedAt: string;
  distanceMeters: number;
  durationSeconds: number;
  poolLengthMeters: number;
}

export interface WorkoutDetailsResponse {
  id: number;
  name: string;
  startedAt: string;
  sport: string;
  calories: number;
  poolLengthMeters: number;
  distanceMeters: number;
  averagePaceSecondsPer100m: number;
  timing: WorkoutTiming;
  heartRate: HeartRateSummary;
  stroke: StrokeSummary;
  laps: WorkoutLap[];
}

export interface WorkoutLap {
  distanceMeters: number;
  durationSeconds: number;
  averagePaceSecondsPer100m: number;
  averageHeartRateBpm: number;
  stroke: StrokeSummary;
  lengths: {
    total: number;
    active: number;
  };
  segments: WorkoutSegment[];
}

interface BaseSegment {
  durationSeconds: number;
}

export interface ActiveSegment extends BaseSegment {
  type: 'active';
  distanceMeters: number;
  averagePaceSecondsPer100m: number;
  stroke: {
    type: StrokeType;
    count: number;
  };
}

export interface RestSegment extends BaseSegment {
  type: 'rest';
}

export type WorkoutSegment = ActiveSegment | RestSegment;

export interface ImportFitResponse {
  workoutId: number;
}

export interface HeartRateZone {
  zone: 1 | 2 | 3 | 4 | 5;
  minBpm: number;
  maxBpm: number;
  durationSeconds: number;
  percent: number;
}

export interface HeartRateZonesResponse {
  zones: HeartRateZone[];
}

export interface StrokeDistributionItem {
  stroke: StrokeType;
  distanceMeters: number;
  strokeCount: number;
  percent: number;
}

export interface StrokeAnalysisResponse {
  distribution: StrokeDistributionItem[];
}
