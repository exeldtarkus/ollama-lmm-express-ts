export interface IGoogleMapsResponseModels {
  results: GooglePlace[];
  status: string;
  error_message?: string;
}

export interface GooglePlace {
  name: string;
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
  rating?: number;
  user_ratings_total?: number;
  types?: string[];
  opening_hours?: {
    open_now: boolean;
  };
  photos?: GooglePhoto[];
  icon?: string;
  business_status?: string;
}

export interface GooglePhoto {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}
