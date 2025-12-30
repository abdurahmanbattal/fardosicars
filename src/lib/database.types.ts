export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car;
        Insert: Omit<Car, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage: number;
  condition: string;
  engine_type: string | null;
  engine_size: string | null;
  transmission: string | null;
  fuel_type: string | null;
  drive_type: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  description: string | null;
  images: string[];
  status: 'متوفرة' | 'محجوزة' | 'مباعة';
  is_featured: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}
