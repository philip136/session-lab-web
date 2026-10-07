# SessionLab Web — clean rewrite v2

This pass is based on the live architecture review of the first clean rewrite.

## Main rules

- Pages/features own data loading and composition.
- Small components own one visual responsibility and their own styles.
- `WorkoutMetric`, `WorkoutCard`, `LapCard`, segment rows, zone rows and comparison rows receive only the data they render.
- Repeated page headers, panels and resource states are shared UI components.
- `format.ts` is gone. Built-in Angular pipes handle dates/title case; one `DurationPipe` handles seconds/pace display.
- `calculations.ts` is gone. Domain analysis belongs to Python/backend endpoints.
- No mapper layer and no UI config arrays for fixed content.
- `@for` is used for real collections (workouts, laps, segments, zones, distributions).
- `ROUTER_OUTLET_DATA` is used only at routed tab roots so switching tabs does not re-fetch workout details.
- FIT import remains an imperative mutation with one explicit `idle | uploading | error` status rather than pretending a POST is a read resource.

## Resource states

Read resources use one shared `ResourceView`. Loading/error/success branching lives there instead of being copied into every feature template.

The small `resourceData` template directive exists only to keep the success template typed while `ResourceView` passes the resolved value into it.

## Structure

```text
src/app/
  shared/
    pipes/
      duration.pipe.ts
    ui/
      content-panel/
      error-state/
      loading-state/
      page-header/
      resource-view/
      stat/
      summary-panel/

  workouts/
    api.ts
    contracts.ts
    routes.ts

    list/
      workout-card/

    import/

    details/
      header/
      overview/
        metric/
      laps-sets/
        lap-card/
        active-segment/
        rest-segment/
      stroke-analysis/
        stroke-row/
      heart-rate/
        zone-row/
      compare/
        comparison-row/
```

## Backend work required

See `BACKEND_API.md`. The important new endpoint in v2 is:

`GET /workouts/{id}/stroke-analysis`

It replaces frontend stroke aggregation/calculation.

## Routes

- `/workouts`
- `/import`
- `/workouts/:id/overview`
- `/workouts/:id/laps-sets`
- `/workouts/:id/stroke-analysis`
- `/workouts/:id/hr-zones`
- `/workouts/:id/compare`

## v3 notes

- Shared UI components use separate `.html` / `.css` files; no inline component styles remain.
- Loading uses a wave-style animation rather than a generic spinner.
- HTTP errors are recorded in a global notification center and still render locally through resource/error states.
- Swimming details define semantic workout theme tokens; future gym details can provide a different theme without changing shared primitives.
- `BACKEND_API.md` now contains an exact response-cleanup checklist and concrete insight/tip rules.
