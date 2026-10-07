# SessionLab backend contract and analysis rules

The frontend is intentionally thin: Python owns workout calculations and analysis; Angular owns layout and presentation formatting.

Development base URL: `http://localhost:8003/api`.

## Contract rules

- JSON uses camelCase and matches the TypeScript response contracts.
- Dates are ISO-8601 strings. Angular formats them for display.
- Durations and pace stay numeric: seconds and seconds/100 m.
- Python calculates domain values such as average pace, stroke summaries, HR zones, distributions and insights.
- Do not add nullable/optional fields as defensive typing. A field is nullable only when absence is real in the supported domain.
- DB/FIT persistence does **not** mirror the UI response. Keep useful raw FIT data even if an endpoint does not expose it.

---

# 1. What to delete from the old workout response

The old frontend contract contained transport/file metadata and several fields that the current UI does not need.

## Delete from `GET /workouts/{id}` response

From the old top-level response remove:

- `provider`
- `source_format`
- `file_name`
- `sub_sport` for the current swimming UI

Replace old snake_case transport names with the current camelCase contract:

- `started_at` -> `startedAt`
- `distance_meters` -> `distanceMeters`
- `timer_time` -> `timing.durationSeconds`
- `elapsed_time` -> `timing.elapsedSeconds`
- `avg_hr` -> `heartRate.averageBpm`
- `max_hr` -> `heartRate.maxBpm`
- `pool_length_meters` -> `poolLengthMeters`

Do not expose `avg_speed` just so Angular can convert speed back into pace. Python should expose `averagePaceSecondsPer100m` directly.

## Delete from every lap response

Remove:

- `index` — array order already defines lap order
- `start_time` — current UI never renders it
- full lap `elapsed_time`/`swim_time`/`rest_time` objects if they are only there for completeness
- `max_hr` — current lap UI only uses average HR

The current lap shape needs only:

```json
{
  "distanceMeters": 400,
  "durationSeconds": 512,
  "averagePaceSecondsPer100m": 128,
  "averageHeartRateBpm": 136,
  "stroke": {
    "count": 188,
    "averageRatePerMinute": 24.5,
    "averageDistancePerStrokeMeters": 2.13
  },
  "lengths": {
    "total": 16,
    "active": 16
  },
  "segments": []
}
```

## Delete from every segment response

Remove:

- `index` — array order defines the displayed segment number
- `start_time`
- `elapsed_time` when it duplicates the only duration the UI needs
- `avg_speed`
- fake nullable fields on rest segments (`distance_meters: null`, `strokes: null`, `stroke_type: null`, `avg_speed: null`)

Use two real shapes instead:

```json
{
  "type": "active",
  "durationSeconds": 126,
  "distanceMeters": 100,
  "averagePaceSecondsPer100m": 126,
  "stroke": {
    "type": "freestyle",
    "count": 46
  }
}
```

```json
{
  "type": "rest",
  "durationSeconds": 20
}
```

**Important:** deleting a field from this response does not mean deleting it from the database. Raw FIT timestamps, source metadata, speed samples and other useful data can stay in persistence for future analysis.

---

# 2. Workout list

`GET /workouts`

```json
[
  {
    "id": 42,
    "name": "Pool Swimming",
    "startedAt": "2026-10-07T12:30:00+02:00",
    "distanceMeters": 2400,
    "durationSeconds": 3138,
    "poolLengthMeters": 25
  }
]
```

The list response stays intentionally small.

---

# 3. Workout details

`GET /workouts/{workoutId}`

```json
{
  "id": 42,
  "name": "Pool Swimming",
  "startedAt": "2026-10-07T12:30:00+02:00",
  "sport": "swimming",
  "calories": 521,
  "poolLengthMeters": 25,
  "distanceMeters": 2400,
  "averagePaceSecondsPer100m": 131.2,
  "timing": {
    "durationSeconds": 3138,
    "elapsedSeconds": 3410,
    "swimSeconds": 2860,
    "restSeconds": 278
  },
  "heartRate": {
    "averageBpm": 142,
    "maxBpm": 161
  },
  "stroke": {
    "count": 1120,
    "averageRatePerMinute": 25.8,
    "averageDistancePerStrokeMeters": 2.14
  },
  "laps": [
    {
      "distanceMeters": 400,
      "durationSeconds": 512,
      "averagePaceSecondsPer100m": 128,
      "averageHeartRateBpm": 136,
      "stroke": {
        "count": 188,
        "averageRatePerMinute": 24.5,
        "averageDistancePerStrokeMeters": 2.13
      },
      "lengths": {
        "total": 16,
        "active": 16
      },
      "segments": [
        {
          "type": "active",
          "durationSeconds": 126,
          "distanceMeters": 100,
          "averagePaceSecondsPer100m": 126,
          "stroke": {
            "type": "freestyle",
            "count": 46
          }
        },
        {
          "type": "rest",
          "durationSeconds": 20
        }
      ]
    }
  ]
}
```

Every top-level field above is currently used by the UI. Do not add extra fields to this DTO merely because the database has them.

---

# 4. Import FIT

`POST /imports/fit`

Multipart field: `file`

```json
{
  "workoutId": 42
}
```

This is a mutation. Angular calls it imperatively instead of modelling the POST as a Resource.

---

# 5. Heart-rate zones

`GET /workouts/{workoutId}/heart-rate-zones`

```json
{
  "zones": [
    {
      "zone": 1,
      "minBpm": 100,
      "maxBpm": 119,
      "durationSeconds": 320,
      "percent": 10.2
    }
  ]
}
```

Python owns the zone policy and calculations.

---

# 6. Stroke analysis

`GET /workouts/{workoutId}/stroke-analysis`

```json
{
  "distribution": [
    {
      "stroke": "freestyle",
      "distanceMeters": 2000,
      "strokeCount": 930,
      "percent": 83.3
    }
  ]
}
```

Grouping segments and calculating percentages is backend/domain work.

---

# 7. Compare

No dedicated comparison endpoint is required for the current deterministic comparison table.

The page uses:

1. `GET /workouts` to choose a baseline.
2. `GET /workouts/{baselineId}` to load it.
3. Existing deterministic fields from both detail responses.

When comparison needs normalized curves or generated conclusions, create a dedicated backend use case instead of moving those calculations into Angular.

---

# 8. Insights / tips — business rules

Tips should not be hard-coded motivational text. They should be deterministic observations backed by workout data. Keep the first implementation small: return only high-confidence insights and cap the UI at roughly 3–5 useful items per workout.

Recommended endpoint:

`GET /workouts/{workoutId}/insights`

Suggested response:

```json
{
  "insights": [
    {
      "code": "pace_consistency",
      "level": "positive",
      "title": "Consistent pace",
      "message": "Your active pace stayed within a narrow range across the workout.",
      "evidence": {
        "paceVariationPercent": 2.8
      }
    }
  ]
}
```

`level` can be `positive | neutral | warning`. These are training observations, not medical conclusions.

## 8.1 Pace consistency

Use active swimming segments only. Normalize them to pace per 100 m and ignore rest segments.

Calculate a weighted mean pace and variation (standard deviation or coefficient of variation).

Initial heuristic thresholds:

- variation <= 3% -> positive: very consistent pace
- 3–7% -> no tip / neutral
- > 7% -> warning: pacing was uneven

Do not compare raw segment durations when segment distances differ.

## 8.2 First half vs second half

Split active distance, not wall-clock time, into first and second halves.

Compare weighted average pace:

- second half >= 3% faster -> positive: negative split / stronger second half
- second half >= 5% slower -> warning: pace faded
- otherwise -> no strong conclusion

This gives a useful pacing insight without inventing a training goal.

## 8.3 Finish quality

Compare the final ~20% of active distance with the middle 40–60% section.

Possible positive signal:

- final section pace is >= 3% faster
- and average HR is not dramatically higher (for example < 8% increase)

Possible warning:

- final pace is >= 5% slower
- together with higher HR and/or worsening stroke efficiency

This prevents calling a desperate high-HR sprint a universally "strong finish".

## 8.4 Heart-rate drift / aerobic cost

Only generate this when enough HR data exists and the compared portions have similar pace.

Compare first vs second half at approximately similar pace (for example pace difference <= 5%).

Initial heuristic:

- HR rises > 5% at similar/slower pace -> warning: cardiovascular drift / rising effort
- HR stays within ~3% while pace improves -> positive: efficient progression

Do not generate medical claims from this metric.

## 8.5 Stroke efficiency / technique fade

Use distance per stroke (DPS) and stroke rate together. One number alone is easy to misread.

Compare early vs late active swimming, ideally for the same stroke type.

Useful patterns:

- DPS stable/improves while pace improves -> positive efficiency signal
- DPS drops > 8% while stroke rate rises -> warning: likely technique deterioration / shorter strokes
- stroke rate falls and pace also slows -> warning: loss of tempo / fatigue

Do not compare freestyle DPS directly with backstroke/breaststroke/butterfly.

## 8.6 Rest behaviour

Useful values:

- `restRatio = restSeconds / elapsedSeconds`
- number of rest segments
- longest rest
- average rest duration

Potential observations:

- very fragmented session: many short rests relative to active distance
- one unusually long rest compared with the workout median
- low rest ratio with stable pace -> positive continuity/endurance signal

Avoid saying "too much rest" unless a workout goal is known. Report the pattern, not a judgement.

## 8.7 HR zone distribution

Use this mainly as description until SessionLab knows the workout intent.

Good observations:

- dominant zone(s)
- unusually broad/intense distribution
- time above a configured high-intensity threshold

Do **not** claim "too much Zone 4" or "not enough Zone 2" without knowing the athlete's plan, HR model and workout goal.

## 8.8 Personal-baseline improvement

This is the most valuable future insight because it compares the user with themself.

Choose a comparable baseline using at least:

- same sport
- same pool length
- broadly similar distance/session type
- reasonably recent workout

Possible positive rule:

- pace improves >= 2–3%
- while average HR is similar/lower (roughly within +2%)
- and DPS does not materially worsen

That is much more meaningful than "fast pace" based on a universal threshold.

## 8.9 Insight priority

When several rules fire, prioritize roughly:

1. major technique/efficiency deterioration
2. large pace fade or strong negative split
3. HR drift at comparable pace
4. strong personal-baseline improvement
5. pace consistency
6. rest/zone descriptive observations

Do not return ten cards just because ten formulas fired. Deduplicate related findings and return the few observations that explain the workout best.

## 8.10 What data should stay in the DB for future insights

Even if the details response does not expose them, keep when available:

- original timestamps
- per-length/per-segment duration
- HR samples or sufficiently granular HR aggregates
- stroke type and stroke counts
- raw/derived speed
- rest boundaries
- pool length
- source/provider metadata

Those values are useful for future analysis, but they do not need to pollute `WorkoutDetailsResponse`.

---

# 9. Future gym support

Do not force swimming and gym into one giant details DTO.

Keep shared concepts only where they are genuinely shared: workout id, start time, import flow, notifications, navigation and generic UI primitives.

When gym support is added, prefer a gym-specific details contract and route/shell. The frontend already uses semantic theme tokens (`--workout-accent`, `--workout-accent-strong`, `--workout-accent-soft`) so a gym shell can provide a completely different visual identity without rewriting shared UI components.
