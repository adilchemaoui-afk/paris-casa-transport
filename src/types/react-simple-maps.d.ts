declare module 'react-simple-maps' {
  import * as React from 'react'

  interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      scale?: number
      center?: [number, number]
      rotate?: [number, number, number]
    }
    width?: number
    height?: number
    style?: React.CSSProperties
    children?: React.ReactNode
  }

  interface GeographiesProps {
    geography: string | object
    children: (props: { geographies: any[] }) => React.ReactNode
  }

  interface GeographyProps {
    geography: any
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
  }

  interface MarkerProps {
    coordinates: [number, number]
    children?: React.ReactNode
  }

  interface ZoomableGroupProps {
    zoom?: number
    center?: [number, number]
    children?: React.ReactNode
  }

  export const ComposableMap: React.FC<ComposableMapProps>
  export const Geographies: React.FC<GeographiesProps>
  export const Geography: React.FC<GeographyProps>
  export const Marker: React.FC<MarkerProps>
  export const ZoomableGroup: React.FC<ZoomableGroupProps>
}
