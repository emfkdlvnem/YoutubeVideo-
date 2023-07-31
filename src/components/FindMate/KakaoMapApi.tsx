// KakaoMapApi.ts
import axios from 'axios';

export interface LatLng {
    lat: number;
    lng: number;
}

export interface User {
    name: string;
    category: string;
    location: LatLng;
}
    
export const fetchUsers = async (category: string): Promise<User[]> => {
    // const response = await axios.get<User[]>('http://localhost:3001/users');
    return response.data.filter(user => user.category === category);
}