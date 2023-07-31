// Map.tsx
// import { css } from '@emotion/react';
import styled from '@emotion/styled';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from './KakaoMapApi';

declare const kakao: any;

interface UserInfoPopupProps {
    open: boolean;
}

const Map: React.FC = () => {
    const [category, setCategory] = useState('러닝');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

    useEffect(() => {
        const loadKakaoMapScript = () => {
            const script = document.createElement('script');
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=a74b8e2521c55444d91bae5a259406fd'; 
            script.onload = initializeMap;
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            if (typeof kakao === 'undefined') {
                console.error('Kakao map API script failed to load.');
                return;
            }

            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
            const map = new kakao.maps.Map(container, options);

            markers.forEach(marker => {
                marker.setMap(null);
            });

            fetchUsers(category)
                .then(users => {
                    const newMarkers: kakao.maps.Marker[] = [];
                    users.forEach(user => {
                        const markerPosition = new kakao.maps.LatLng(user.location.lat, user.location.lng);
                        const marker = new kakao.maps.Marker({
                            position: markerPosition
                        });
                        marker.setMap(map);
                        newMarkers.push(marker); 
                        kakao.maps.event.addListener(marker, 'click', function() {
                            setSelectedUser(user);
                        });
                    });

                    setMarkers(newMarkers); 
                });
        };

        loadKakaoMapScript();
    }, [category, markers]); 

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
    }


    return (
        <MapInn>
            <PageTitle>운동 메이트 찾기</PageTitle>
            <BtnTab>
                <button 
                    className={`category01 ${category === '러닝' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('러닝')}
                >
                    러닝
                </button>
                <button 
                    className={`category02 ${category === '등산' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('등산')}
                >
                    등산
                </button>
                <button 
                    className={`category03 ${category === '헬스' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('헬스')}
                >
                    헬스
                </button>
            </BtnTab>
            <MapSection>
                <MapContainer id="map"></MapContainer>
                <UserInfoPopup open={!!selectedUser}>
                    {selectedUser && (
                        <>
                            <p>{selectedUser.name}</p>
                            <p>{selectedUser.category}</p>
                        </>
                    )}
                    <button onClick={() => setSelectedUser(null)}>닫기</button>
                </UserInfoPopup>
            </MapSection>
        </MapInn>
    );
};

const MapInn = styled.div`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    height: 100%;
    margin: 120px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const MapSection = styled.section`
    position: relative;
`;

const MapContainer = styled.div`
    width:1000px;
    height:500px;
    margin: 150px auto 0;
`;
const UserInfoPopup = styled.div<UserInfoPopupProps>`
    position: absolute;
    right: 0;
    width: 200px;
    height: 100%;
    background: white;
    transform: translateX(${props => props.open ? '0%' : '100%'});
    transition: transform 0.3s ease-out;
`;
const PageTitle = styled.h2`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        color: #000;
        background-color: #000;
    }
`;
const BtnTab = styled.div`
    position: relative;
    top: 60px;
    
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #000;
        border-radius: 20px;
        padding: 4px 20px;
        background-color: #fff;     
        
        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;

export default Map;
