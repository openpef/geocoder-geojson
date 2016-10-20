import * as turf from '@turf/turf'
import { LngLat } from './utils'

export const MapboxOptions: MapboxOptions = {}
export interface MapboxOptions {
  access_token?: string
}

interface Geometry {
  coordinates: LngLat
  type: string
}

interface MapboxFeature extends GeoJSON.Feature<GeoJSON.Point> {
  address: string
  center: LngLat
  context: any[]
  id: string
  place_name: string
  properties: any
  relevance: number
  text: string
}

interface MapboxResults {
  attribution: string
  features: Array<MapboxFeature>
  query: string[]
  type: string
}

/**
 * Convert Mapbox results into GeoJSON
 */
export function MapboxToGeoJSON(json: MapboxResults, options: MapboxOptions): GeoJSON.FeatureCollection<GeoJSON.Point> {
  const collection: GeoJSON.FeatureCollection<GeoJSON.Point> = turf.featureCollection([])
  json.features.map(result => {
    collection.features.push(result)
  })
  return collection
}