import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  HeartRateZonesResponse,
  ImportFitResponse,
  StrokeAnalysisResponse,
  WorkoutDetailsResponse,
  WorkoutListItemResponse,
} from './contracts';

@Injectable({ providedIn: 'root' })
export class WorkoutAPI {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.api.baseUrl;

  getWorkouts(): Observable<WorkoutListItemResponse[]> {
    return this.http.get<WorkoutListItemResponse[]>(`${this.baseUrl}/workouts`);
  }

  getWorkout(id: number): Observable<WorkoutDetailsResponse> {
    return this.http.get<WorkoutDetailsResponse>(`${this.baseUrl}/workouts/${id}`);
  }

  getHeartRateZones(id: number): Observable<HeartRateZonesResponse> {
    return this.http.get<HeartRateZonesResponse>(`${this.baseUrl}/workouts/${id}/heart-rate-zones`);
  }

  getStrokeAnalysis(id: number): Observable<StrokeAnalysisResponse> {
    return this.http.get<StrokeAnalysisResponse>(`${this.baseUrl}/workouts/${id}/stroke-analysis`);
  }

  importFit(file: File): Observable<ImportFitResponse> {
    const body = new FormData();
    body.append('file', file);
    return this.http.post<ImportFitResponse>(`${this.baseUrl}/imports/fit`, body);
  }
}
